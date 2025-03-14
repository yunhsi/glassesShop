import { api } from '@/api/axios';

const productApi = {
  // ✅ 取得商品列表
  getProducts(page) {
    return api.get(`/products?page=${page}`).then((res) => res.data);
  },

  // ✅ 取得所有商品列表
  getAllProducts() {
    return api.get('/products/all').then((res) => res.data.products);
  },

  // ✅ 取得商品資料
  getProduct(productId) {
    return api.get(`/product/${productId}`).then((res) => res.data);
  }
};

export default productApi;
