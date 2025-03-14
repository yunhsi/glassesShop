<script setup>
import { ref, onMounted, watch } from 'vue';
import { useHead } from '@vueuse/head';
import CheckoutSteps from '@/components/CheckoutSteps.vue';
import { useCartStore } from '@/pinia/useCartStore';
import { useCouponStore } from '@/pinia/useCouponStore';
import { useThemeStore } from '@/pinia/useThemeStore';
import { useCommonStore } from '@/pinia/useCommonStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();
const couponStore = useCouponStore();
const themeStore = useThemeStore();
const commonStore = useCommonStore();

const cartsData = ref();
const coupon_code = ref('');
const isGetCoupon = ref(localStorage.getItem('isGetCoupon'));

onMounted(() => {
  if (isGetCoupon.value === 'true') {
    coupon_code.value = 'happy99';
    useCoupon();
  }
  cartsData.value = cartStore.carsData;
});

watch(cartStore, () => {
  if (!cartStore.carsData.carts.length) {
    localStorage.setItem('isGetCoupon', false);
    coupon_code.value = '';
  }
  cartsData.value = cartStore.carsData;
});

// 刪除某一購物車資料
const deleteCartData = async (id) => {
  await cartStore.deleteCart(id);
};

const useCoupon = async () => {
  if (coupon_code.value === 'happy99') {
    // 套用優惠碼
    await couponStore.useCoupon(coupon_code.value);
    localStorage.setItem('isGetCoupon', true);
  } else {
    commonStore.showMsg('error', '找不到優惠券');
  }
};

// 前往結帳
const toNextStep = () => {
  if (cartsData.value.carts.length) {
    router.push('/order');
  } else {
    commonStore.showMsg('warn', '購物車內沒有商品');
  }
};

useHead({
  title: '購物車｜!WEAR'
});
</script>

<template>
  <main style="padding-top: 70px; min-height: calc(100vh - 104px)">
    <div class="container pt-4 pb-5">
      <CheckoutSteps step="1" />
      <!-- 1. 確認品項 -->
      <div class="row pt-2">
        <div class="col-12">
          <table
            v-if="cartsData && cartsData.carts.length"
            class="table table-hover"
            :class="{ 'table-dark': themeStore.isDarkMode }"
          >
            <tbody>
              <!-- 標題 -->
              <tr class="border-bottom fw-bold small">
                <td scope="col" class="border-0">品名</td>
                <td scope="col" class="border-0 mobile-hide" />
                <td scope="col" class="border-0 text-center mobile-width">數量</td>
                <td scope="col" class="border-0 text-center">單價</td>
                <td scope="col" class="border-0 text-center">小計</td>
                <td scope="col" class="border-0" />
              </tr>
              <!-- 列表 -->
              <tr v-for="item in cartsData.carts" :key="item.id" class="list-hover border-bottom">
                <td scope="row" class="border-0 fw-normal py-3 mobile-hide">
                  <router-link :to="`/product/${item.product_id}`" prefetch>
                    <img :src="item.product.image" alt="" class="rounded" />
                  </router-link>
                </td>
                <td class="border-0 align-middle">
                  <router-link
                    :to="`/product/${item.product_id}`"
                    style="text-transform: capitalize"
                    prefetch
                  >
                    {{ item.product.title }}
                  </router-link>
                </td>
                <td class="border-0 align-middle text-center">
                  {{ item.qty }}
                </td>
                <td class="border-0 align-middle">
                  <p
                    class="mb-0 text-end"
                    :class="{ onsale: item.final_total != item.product.price }"
                  >
                    ${{ item.product.price.toLocaleString() }}
                  </p>
                </td>
                <td class="border-0 align-middle">
                  <p
                    class="mb-0 text-end"
                    :class="{ 'text-danger': item.final_total != item.product.price }"
                  >
                    ${{ item.final_total.toLocaleString() }}
                  </p>
                </td>
                <td class="border-0 align-middle text-center">
                  <a href="javascript:;" class="close" @click="deleteCartData(item.id)">
                    <i class="pi pi-times-circle" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- no data -->
          <div v-else class="py-5">
            <p class="text-center" style="letter-spacing: 2px">購物車內沒有商品</p>
          </div>
          <div class="row py-3">
            <!-- 輸入優惠碼 -->
            <div class="col-md-6">
              <p class="h6 mb-2 small">➤ 開店慶輸入優惠碼 happy99 即可享九折優惠</p>
              <div class="input-group input-group">
                <VInputText
                  v-model="coupon_code"
                  type="text"
                  placeholder="請輸入優惠碼"
                  class="form-control text-danger"
                  style="letter-spacing: 1px"
                />
                <VButton label="套用優惠碼" severity="contrast" @click="useCoupon" />
              </div>
            </div>
            <!-- 總計 -->
            <div v-if="cartsData" class="col-md-6 text-end h5 m-0 mt-4 mt-md-0">
              <p>
                總金額：
                <span
                  :class="{
                    'text-danger': cartsData.final_total != cartsData.total
                  }"
                >
                  ${{ cartsData.final_total.toLocaleString() }}
                </span>
                元
              </p>
            </div>
          </div>
          <hr />
          <!-- 按鈕 -->
          <div class="text-end">
            <router-link to="/products" class="btn btn-outline-secondary me-3 px-4" prefetch>
              繼續購物
            </router-link>
            <button type="button" class="btn btn-danger px-4" @click="toNextStep">前往結帳</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/scss/grid' as *;
table {
  a {
    color: var(--text-color-light);
  }
  img {
    max-width: 90px;
    object-fit: cover;
    object-position: center;
  }
  .mobile-hide {
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .mobile-width {
    @include phone {
      width: 100%;
    }
  }
}
</style>
