<script setup>
import { useHead } from '@vueuse/head';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/pinia/useProductStore';
import { useCartStore } from '@/pinia/useCartStore';
import Counter from '@/components/Counter.vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Price from '@/components/Price.vue';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

// 商品 id
const id = computed(() => route.params.productId);

const items = ref([{ label: '全部商品', route: '/products' }, { label: '' }]);

useHead({
  title: '商品資訊｜!WEAR'
});

const count = ref(1);

// 減少商品數量
const reduceCount = () => {
  if (count.value > 1) {
    count.value -= 1;
  }
};

// 增加商品數量
const addCount = () => {
  count.value += 1;
};

// 加入購物車
const addToCart = async (product_id, qty = 1) => {
  const cart = { product_id, qty };
  await cartStore.postCart(cart);
};

// ----- API回傳的資料 ----- //
const recommendationProducts = ref([]);
const product = ref();

const getAllData = async () => {
  await productStore.getProduct(id.value);
  await productStore.getAllProducts();
  product.value = productStore.productData;
  getRecommendationProductsData();
  items.value[1].label = product.value.title;
};

const getRecommendationProductsData = () => {
  recommendationProducts.value = productStore.allProductsData.filter((item) => {
    return (
      item.category === product.value.category &&
      item.description === product.value.description &&
      item.content === product.value.content &&
      item.id !== product.value.id
    );
  });
};

onMounted(getAllData);

// 監聽路由變化，重新取得商品資料
watch(() => route.params.productId, getAllData);

// ----- 加工API回傳的資料 ----- //
const saleRatio = computed(() => {
  const discount = (product.value.price / product.value.origin_price - 1) * 100;
  return Math.round(discount); // 四捨五入
});
</script>

<template>
  <main style="padding-top: 70px; min-height: calc(100vh - 104px)">
    <div class="container pt-4">
      <div class="row">
        <div class="col-12">
          <Breadcrumb :items="items" />
        </div>
      </div>
      <!-- 單一商品細節 -->
      <div
        v-if="product"
        class="row pb-5 pt-3"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-sine"
        data-aos-duration="300"
      >
        <!-- 商品圖 -->
        <div class="col-md-6 px-lg-5 d-flex align-items-end">
          <div class="position-relative w-100">
            <img :src="product.image" alt="" class="rounded custom-shadow" />
            <div class="d-flex gap-1 p-1 justify-content-end position-absolute start-0 end-0 top-0">
              <VTag v-if="product.unit" severity="danger" value="HOT" />
              <VTag
                v-if="product.price != product.origin_price"
                severity="warn"
                :value="`SALE ${saleRatio}%`"
              />
            </div>
          </div>
        </div>
        <!-- 商品資訊 -->
        <div class="col-md-6 pe-lg-5 d-flex align-items-end info">
          <div class="w-100">
            <small class="fw-light">{{ product.id }}</small>
            <h4 class="fw-normal py-1">
              {{ product.title }}
            </h4>
            <h5 class="border-bottom border-danger pb-3">
              <Price :product="product" />
            </h5>
            <div class="p-2 my-3">
              <p class="mb-2">商品規格</p>
              <ul class="list-unstyled small m-0">
                <li>- 類型： {{ product.category }}</li>
                <li>- 框型： {{ product.description }}</li>
                <li>- 材質： {{ product.content }}</li>
                <li>- 尺寸： 53 □ 20 - 146 ○ 48</li>
              </ul>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <Counter :count="count" @reduce-count="reduceCount" @add-count="addCount" />
              </div>
              <div class="col-lg-6 pt-3 pt-lg-0">
                <div class="d-grid gap-2">
                  <button
                    class="btn btn-danger"
                    style="padding-top: 10px; padding-bottom: 10px"
                    type="button"
                    @click="addToCart(product.id, count)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!-- 同類型輪播 -->
      <div class="row px-3 my-5">
        <h3 class="px-4 pt-4" style="letter-spacing: 1px">你可能也喜歡</h3>
        <ProductCarousel :products="recommendationProducts" :isloop="false" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/scss/grid' as *;
img {
  width: 100%;
  object-fit: cover;
  border: 1px solid #fff;
}
.info {
  @media screen and (max-width: 767px) {
    padding-top: 30px;
  }
  small {
    font-size: 12px;
    color: var(--text-second-color-light);
  }
  h4 {
    text-transform: capitalize;
  }
  ul {
    li {
      line-height: 24px;
    }
  }
}
</style>
