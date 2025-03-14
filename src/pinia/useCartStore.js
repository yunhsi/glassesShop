import { defineStore } from 'pinia';
import { ref } from 'vue';
import cartApi from '@/api/cartApi';
import { useCommonStore } from '@/pinia/useCommonStore';
import Swal from 'sweetalert2';

export const useCartStore = defineStore('useCart', () => {
  const commonStore = useCommonStore();
  const carsData = ref();

  // ✅ 取得購物車列表
  const getCarts = async () => {
    commonStore.isLoading = true;
    try {
      carsData.value = await cartApi.getCarts();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.message}`
      });
    } finally {
      commonStore.isLoading = false;
    }
  };

  // ✅ 新增/更新購物車
  const postCart = async (data) => {
    // apiData = {
    //   product_id: data.id,
    //   qty: data.qty
    // };
    commonStore.isLoading = true;
    try {
      const res = await cartApi.postCart(data);
      commonStore.showMsg('success', res.message);
      await getCarts();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.message}`
      });
    } finally {
      commonStore.isLoading = false;
    }
  };

  // ✅ 刪除購物車內商品
  const deleteCart = async (id) => {
    commonStore.isLoading = true;
    try {
      const res = await cartApi.deleteCart(id);
      commonStore.showMsg('success', res.message);
      await getCarts();
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
    carsData,
    getCarts,
    postCart,
    deleteCart
  };
});
