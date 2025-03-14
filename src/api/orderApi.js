import { api } from '@/api/axios';

const orderApi = {
  // ✅ 取得訂單列表
  getOrders(page) {
    return api.get(`/orders?page=${page}`).then((res) => res.data);
  },

  // ✅ 取得單一訂單資料
  getOrder(orderId) {
    return api.get(`/order/${orderId}`).then((res) => res.data);
  },

  // ✅ 建立訂單
  createOrder(data) {
    return api.post('/order', { data }).then((res) => res.data);
  }
};

export default orderApi;
