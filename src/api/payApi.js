import { api } from '@/api/axios';

const payApi = {
  // ✅ 結帳
  postPay(orderId) {
    return api.post(`/pay/${orderId}`).then((res) => res.data);
  }
};

export default payApi;
