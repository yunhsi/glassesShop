<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/pinia/useCartStore';
import Price from '@/components/Price.vue';

const cartStore = useCartStore();
const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  },
  rootClass: {
    type: String,
    default: ''
  }
});

const saleRatio = computed(() => {
  const discount = (props.product.price / props.product.origin_price - 1) * 100;
  return Math.round(discount); // 四捨五入
});

// 加入購物車
const addToCart = async (product_id, qty = 1) => {
  const cart = {
    product_id,
    qty
  };
  await cartStore.postCart(cart);
};
</script>

<template>
  <router-link :to="`/product/${product.id}`">
    <VCard class="hvr-float product-card m-4" :class="rootClass">
      <template #header>
        <div class="d-flex gap-1 p-1 justify-content-end position-absolute start-0 end-0">
          <VTag v-if="product.unit" severity="danger" value="HOT" />
          <VTag
            v-if="product.price != product.origin_price"
            severity="warn"
            :value="`SALE ${saleRatio}%`"
          />
        </div>
        <img :src="product.image" alt="" />
      </template>
      <template #title>
        {{ product.title }}
      </template>
      <template #subtitle>
        <Price :product="product" />
      </template>
      <template #footer>
        <div class="mt-1">
          <VButton
            label="加入購物車"
            severity="danger"
            outlined
            size="small"
            class="w-100"
            @click.stop.prevent="addToCart(product.id)"
          />
        </div>
      </template>
    </VCard>
  </router-link>
</template>

<style lang="scss">
.product-card {
  overflow: hidden;
  border: 1px solid #fff;
  position: relative;
  border-radius: 4px !important;
  transition: all 0.3s;
  box-shadow: var(--shadow-light) !important;
  &:hover {
    box-shadow: var(--shadow-hover-light) !important;
  }
  .p-card-header {
    .p-tag {
      font-size: 12px;
      padding: 5px;
      box-shadow: var(--shadow-hover-light);
    }
    img {
      width: 100%;
      height: 230px;
      object-fit: cover;
      object-position: center;
    }
  }
  .p-card-body {
    padding: 15px;
    padding-bottom: 10px;
    .p-card-caption {
      .p-card-title {
        font-size: 16px;
        letter-spacing: 1px;
        text-transform: capitalize;
        max-height: 35px;
        height: 35px;
        line-height: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
      }
      .p-card-subtitle {
        font-size: 15px;
      }
    }
    .p-card-content {
      display: none;
    }
  }
}
</style>
