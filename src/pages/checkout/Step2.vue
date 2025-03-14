<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import CheckoutSteps from '@/components/CheckoutSteps.vue';
import OrderInfo from '@/components/OrderInfo.vue';
import { useCartStore } from '@/pinia/useCartStore';
import { useOrderStore } from '@/pinia/useOrderStore';

const cartStore = useCartStore();
const orderStore = useOrderStore();
const cartsData = ref();
const router = useRouter();
const formData = ref({
  user: {
    name: '',
    tel: '',
    address: '',
    email: '',
    payment: ''
  }
});

// 建立訂單
const createOrder = async () => {
  await orderStore.createOrder(formData.value);
  router.push(`/order/${orderStore.orderId}`);
  localStorage.setItem('isGetCoupon', false);
  cartStore.getCarts();
};

watch(cartsData, () => {
  if (!cartsData.value.carts.length) {
    router.push('/cart');
  }
});

watch(cartStore, () => {
  cartsData.value = cartStore.carsData;
});

onMounted(() => {
  cartsData.value = cartStore.carsData;
});

useHead({
  title: '建立訂單｜!WEAR'
});
</script>

<template>
  <main style="padding-top: 70px; min-height: calc(100vh - 104px)">
    <div class="container pt-4 pb-5">
      <!-- 結帳進度 -->
      <CheckoutSteps step="2" />
      <!-- 2. 建立訂單 -->
      <div class="row flex-row-reverse justify-content-center pt-4">
        <!-- 訂單資訊 -->
        <div class="col-lg-5 col-md-6">
          <OrderInfo title="訂單資訊" :cart="cartsData" />
          {{ cartStore.cartsData }}
        </div>
        <!-- 資料填寫 -->
        <div class="col-lg-7 col-md-6">
          <VForm v-slot="{ errors }" class="row g-3 pt-4 pt-md-0 small" @submit="createOrder">
            <div class="col-md-6">
              <label for="name" class="form-label">
                收件人姓名
                <span class="text-danger">*</span>
              </label>
              <VField
                id="name"
                v-model="formData.user.name"
                type="text"
                name="姓名"
                placeholder="請輸入收件人姓名"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                rules="required|onlyChinese"
              />
              <ErrorMessage name="姓名" class="invalid-feedback" />
            </div>
            <div class="col-md-6">
              <label for="tel" class="form-label">
                收件人電話
                <span class="text-danger">*</span>
              </label>
              <VField
                id="tel"
                v-model="formData.user.tel"
                type="tel"
                name="電話"
                placeholder="請輸入收件人電話"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                rules="required|numeric|min:10|max:10"
              />
              <ErrorMessage name="電話" class="invalid-feedback" />
            </div>
            <div class="col-12">
              <label for="address" class="form-label">
                收件人地址
                <span class="text-danger">*</span>
              </label>
              <VField
                id="address"
                v-model="formData.user.address"
                type="text"
                name="地址"
                placeholder="請輸入收件人地址"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                rules="required"
              />
              <ErrorMessage name="地址" class="invalid-feedback" />
            </div>
            <div class="col-12">
              <label for="Email" class="form-label">
                Email (請填寫常用信箱以追蹤出貨狀態)
                <span class="text-danger">*</span>
              </label>
              <VField
                id="Email"
                v-model="formData.user.email"
                type="email"
                name="Email"
                placeholder="請輸入 Email"
                class="form-control"
                :class="{ 'is-invalid': errors['Email'] }"
                rules="required|email"
              />
              <ErrorMessage name="Email" class="invalid-feedback" />
            </div>
            <div class="col-12">
              <label for="payment" class="form-label">
                付款方式
                <span class="text-danger">*</span>
              </label>
              <VField
                id="payment"
                v-model="formData.user.payment"
                as="select"
                name="付款方式"
                placeholder="請輸入付款方式"
                class="form-select"
                :class="{ 'is-invalid': errors['付款方式'] }"
                rules="required"
              >
                <option value="" selected disabled>選擇付款方式</option>
                <option value="信用卡">信用卡</option>
                <option value="貨到付款">貨到付款</option>
                <option value="ATM 匯款">ATM 匯款</option>
              </VField>
              <ErrorMessage name="付款方式" class="invalid-feedback" />
            </div>
            <div class="col-12 d-flex justify-content-between align-items-center">
              <router-link to="/cart" prefetch>
                <VIcon :icon="['fas', 'chevron-left']" />
                返回購物車
              </router-link>
              <button type="submit" class="btn btn-danger px-3">建立訂單</button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
