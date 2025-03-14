<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  cart: { type: Object, default: () => ({}) },
  order: { type: Object, default: () => ({}) }
});

const orders = ref([]);
const total = ref(0);

watch(
  () => props.cart,
  (newCart) => {
    orders.value = newCart.carts;
    total.value = newCart.final_total;
  },
  { deep: true }
);

watch(
  () => props.order,
  (newOrder) => {
    orders.value = newOrder?.products || [];
    total.value = newOrder?.total || 0;
  },
  { deep: true }
);
</script>

<template>
  <div class="border border-danger p-4 rounded custom-shadow">
    <div class="mb-4">
      <h4 class="mb-1">
        {{ title }}
      </h4>
      <small v-show="title == '訂單明細'" style="font-size: 12px; display: block">
        訂單編號：{{ order.id }}
      </small>
    </div>
    <div v-for="item in orders" :key="item.id" class="d-flex align-items-center my-2">
      <img :src="item.product.image" alt="" class="me-3 rounded" />
      <div class="w-100 d-flex justify-content-between align-items-center small">
        <p class="mb-0 pe-4">
          <span class="h6 fw-normal">{{ item.product.title }}</span>
          <br />
          <span class="pt-1 d-block small">數量：{{ item.qty }}</span>
        </p>
        <p class="mb-0">${{ item.final_total.toLocaleString() }}</p>
      </div>
    </div>
    <div class="d-flex justify-content-between mt-4 pt-4 border-top">
      <p class="h5">總金額</p>
      <p class="h5 fw-normal">${{ total.toLocaleString() }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 75px;
  object-fit: cover;
  object-position: center;
}
small {
  color: var(--text-second-color-light);
}
</style>
