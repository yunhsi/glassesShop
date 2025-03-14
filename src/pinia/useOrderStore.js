import { defineStore } from 'pinia';
import { ref } from 'vue';
import orderApi from '@/api/orderApi';
import { useCommonStore } from '@/pinia/useCommonStore';
import Swal from 'sweetalert2';

export const useOrderStore = defineStore('useOrder', () => {
  const commonStore = useCommonStore();
  const ordersData = ref();
  const orderData = ref();
  const orderId = ref();

  // ✅ 取得訂單列表
  const getOrders = async (page) => {
    commonStore.isLoading = true;
    try {
      ordersData.value = await orderApi.getOrders(page);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.message}`
      });
    } finally {
      commonStore.isLoading = false;
    }
  };

  // ✅ 取得單一訂單資料
  const getOrder = async (orderId) => {
    commonStore.isLoading = true;
    try {
      const res = await orderApi.getOrder(orderId);
      orderData.value = res.order;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.message}`
      });
    } finally {
      commonStore.isLoading = false;
    }
  };

  // ✅ 建立訂單
  const createOrder = async (data) => {
    // apiData = {
    //   user: {
    //     name,
    //     tel,
    //     address,
    //     email,
    //     payment
    //   }
    // };
    commonStore.isLoading = true;
    try {
      const res = await orderApi.createOrder(data);
      orderId.value = res.orderId;
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
    ordersData,
    orderData,
    orderId,
    getOrders,
    getOrder,
    createOrder
  };
});
