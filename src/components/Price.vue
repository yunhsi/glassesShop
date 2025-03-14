<script setup>
defineProps({
  product: { type: Object, default: () => {} }
});
</script>

<template>
  <span class="originPrice" :class="{ onsale: product.origin_price != product.price }">
    NTD {{ product.origin_price.toLocaleString() }}
  </span>
  <span v-if="product.origin_price != product.price" class="price">
    &nbsp;
    <i class="pi pi-arrow-right" />
    &nbsp; NTD {{ product.price.toLocaleString() }}
  </span>
</template>

<style lang="scss" scoped>
.onsale {
  text-decoration: line-through;
}
.price {
  color: var(--danger);
  font-weight: bold;
  .pi {
    font-size: 14px;
  }
}
</style>
