import axios from 'axios';

const baseURLs = {
  default: 'https://vue-course-api.hexschool.io/api/yunhsi',
};

// ✅ 建立 API 實例函式
const createApiInstance = (baseType = 'default') => {
  const api = axios.create({
    baseURL: baseURLs[baseType] || baseURLs.default,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });

  // ✅ 請求攔截器（自動加上 token）
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // 讀取 token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ 回應攔截器（統一錯誤處理）
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response.status;
      const message = error.response?.data?.message || '請求失敗';

      console.log(error);

      console.error(`API 錯誤 (狀態碼: ${status}):`, message);

      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApiInstance();
