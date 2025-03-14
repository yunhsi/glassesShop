import { api } from '@/api/axios';

const cartApi = {
  // ✅ 取得購物車列表
  async getCarts() {
    return api.get('/cart').then((res) => res.data.data);
  },

  // ✅ 新增/更新購物車
  async postCart(data) {
    return api.post('/cart', { data }).then((res) => res.data);
  },

  // ✅ 刪除購物車內商品
  async deleteCart(id) {
    return api.delete(`/cart/${id}`).then((res) => res.data);
  }
};

export default cartApi;
