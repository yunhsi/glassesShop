<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '@/plugins/utils';
import { useThemeStore } from '@/pinia/useThemeStore';
import { usePayStore } from '@/pinia/usePayStore';
import Swal from 'sweetalert2';

const router = useRouter();
const themeStore = useThemeStore();
const payStore = usePayStore();

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  order: {
    type: Object,
    default: () => ({})
  },
  isPaid: {
    type: Boolean,
    default: false
  }
});

// 訂單的用戶資料
const userData = computed(() => props.order.user);

// 是否確認結帳
const checkoutConfirm = () => {
  Swal.fire({
    title: '是否確定結帳?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#dc3534',
    cancelButtonText: '取消',
    confirmButtonText: '是的！'
  }).then((result) => {
    if (result.isConfirmed) {
      checkout();
    }
  });
};

// 結帳
const checkout = async () => {
  await payStore.postPay(props.id);
  router.push(`/checkout/${props.id}`);
};
</script>

<template>
  <div class="border border-danger p-4 rounded custom-shadow mt-4 mt-md-0">
    <h4 class="mb-1">訂購資訊</h4>
    <small class="pb-2" style="font-size: 12px; display: block">
      建立時間：{{ formatDate(order.create_at) }}
    </small>
    <table class="table mb-4 small" :class="{ 'table-dark': themeStore.isDarkMode }">
      <tbody>
        <tr class="border-bottom">
          <th class="border-0 px-0 fw-normal">收件人姓名</th>
          <td class="text-end border-0 px-0">
            {{ userData.name }}
          </td>
        </tr>
        <tr class="border-bottom">
          <th class="border-0 px-0 fw-normal">收件人電話</th>
          <td class="text-end border-0 px-0">
            {{ userData.tel }}
          </td>
        </tr>
        <tr class="border-bottom">
          <th class="border-0 px-0 fw-normal">收件人地址</th>
          <td class="text-end border-0 px-0">
            {{ userData.address }}
          </td>
        </tr>
        <tr class="border-bottom">
          <th class="border-0 px-0 fw-normal">付款方式</th>
          <td class="text-end border-0 px-0">
            {{ userData.payment }}
          </td>
        </tr>
        <tr class="border-bottom">
          <th class="border-0 px-0 fw-normal">付款狀態</th>
          <td class="text-end border-0 px-0">
            <span v-if="order.is_paid" class="badge rounded-pill bg-success">付款完成</span>
            <span v-else class="badge rounded-pill bg-secondary">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="!isPaid">
      <div v-if="!order.is_paid" class="d-grid gap-2">
        <button type="button" class="btn btn-danger" @click="checkoutConfirm">結帳去</button>
      </div>
      <div v-else class="d-grid gap-2">
        <router-link to="/products" class="btn btn-danger" prefetch>回到商品頁</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
small {
  color: var(--text-second-color-light);
}
</style>
