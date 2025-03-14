import { defineStore } from 'pinia';
import { ref } from 'vue';
import productApi from '@/api/productApi';
import { useCommonStore } from '@/pinia/useCommonStore';
import Swal from 'sweetalert2';

export const useProductStore = defineStore('useProduct', () => {
  const commonStore = useCommonStore();
  const productsData = ref([]);
  const allProductsData = ref([]);
  const productData = ref({});
  const recommendationProducts = ref();
  const saleProducts = ref();
  const glassesProducts = ref();
  const sunGlassesProducts = ref();

  // ✅ 取得商品列表
  const getProducts = async (page) => {
    commonStore.isLoading = true;
    try {
      productsData.value = await productApi.getProducts(page);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.message}`
      });
    } finally {
      commonStore.isLoading = false;
    }
  };

  // ✅ 取得所有商品列表
  const getAllProducts = async () => {
    commonStore.isLoading = true;
    try {
      const res = await productApi.getAllProducts();
      allProductsData.value = res.filter((item) => item.is_enabled === true);
      recommendationProducts.value = allProductsData.value.filter((item) => item.unit === true);
      saleProducts.value = allProductsData.value.filter((item) => item.price != item.origin_price);
      glassesProducts.value = allProductsData.value.filter((item) => item.category === '光學眼鏡');
      sunGlassesProducts.value = allProductsData.value.filter(
        (item) => item.category === '太陽眼鏡'
      );
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.message}`
      });
    } finally {
      commonStore.isLoading = false;
    }
  };

  // ✅ 取得商品資料
  const getProduct = async (productId) => {
    commonStore.isLoading = true;
    try {
      const res = await productApi.getProduct(productId);
      productData.value = res.product;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.message}`
      });
    } finally {
      commonStore.isLoading = false;
    }
  };

  return {
    productsData,
    allProductsData,
    recommendationProducts,
    saleProducts,
    glassesProducts,
    sunGlassesProducts,
    productData,
    getProducts,
    getAllProducts,
    getProduct
  };
});
