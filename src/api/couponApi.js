import { api } from '@/api/axios';

const couponApi = {
  // ✅ 套用優惠券
  useCoupon(data) {
    return api.post('/coupon', { data }).then((res) => res.data);
  }
};

export default couponApi;
