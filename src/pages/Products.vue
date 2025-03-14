<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/pinia/useProductStore';
import ProductCard from '@/components/ProductCard.vue';
import NoData from '@/components/NoData.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const route = useRoute();
const productStore = useProductStore();

// ------ 前端定義的參數 ------ //
const isGetData = ref(false);
const keyword = ref();
const sortType = ref();
const sortTypes = ref([
  { name: '價格（由高至低）', id: '1' },
  { name: '價格（由低至高）', id: '2' }
]);
const colorType = ref();
const colorTypes = ref([
  { name: '黑', id: 'black' },
  { name: '棕', id: 'brown' },
  { name: '銀', id: 'silver' },
  { name: '金', id: 'golden' },
  { name: '透明', id: 'transparent' }
]);
const materialType = ref();
const materialTypes = ref([{ name: '輕量樹脂' }, { name: '鈦合金' }]);
const shapeType = ref();
const shapeTypes = ref([
  { name: '圓框' },
  { name: '方型' },
  { name: '波士頓' },
  { name: '威靈頓' }
]);
const priceType = ref();
const priceTypes = ref([
  { name: '1000 ~ 2000', min: '1000', max: '2000' },
  { name: '2000 ~ 3000', min: '2000', max: '3000' },
  { name: '3000 ~ 4000', min: '3000', max: '4000' },
  { name: '4000 ~ 5000', min: '4000', max: '5000' },
  { name: '5000 ~ 6000', min: '5000', max: '6000' }
]);

const isShowNav = ref();
const filterCount = ref(0);

// 需要監聽的篩選條件
const filters = [colorType, materialType, shapeType, priceType];

filters.forEach((filter) =>
  watch(filter, (newValue, oldValue) => {
    if (!oldValue && newValue) {
      filterCount.value = filterCount.value + 1;
    }
    if (!newValue && oldValue) {
      filterCount.value = filterCount.value - 1;
    }
  })
);

const categoryMap = {
  glasses: '光學眼鏡',
  sunglasses: '太陽眼鏡'
};

const eventMap = {
  hot: '熱門推薦',
  onsale: '優惠活動'
};

const pageNavData = computed(() => [
  { label: eventMap[route.query.event] || categoryMap[route.query.category] || '全部商品' }
]);

useHead({
  title: `${pageNavData.value[0].label}｜!WEAR`
});

// ----- API回傳的資料 ----- //
const allProducts = ref([]);

const getAllProductsData = async () => {
  await productStore.getAllProducts();
  getTypeProductsData();
  isGetData.value = true;
};

const getTypeProductsData = () => {
  if (!route.query.category && !route.query.event) {
    allProducts.value = productStore.allProductsData;
    return;
  }
  switch (route.query.category) {
    case 'glasses':
      allProducts.value = productStore.glassesProducts;
      break;
    case 'sunglasses':
      allProducts.value = productStore.sunGlassesProducts;
      break;
  }
  switch (route.query.event) {
    case 'hot':
      allProducts.value = productStore.recommendationProducts;
      break;
    case 'onsale':
      allProducts.value = productStore.saleProducts;
      break;
  }
};

onMounted(getAllProductsData);

// ----- 加工API回傳的資料 ----- //
// 篩選商品
const filteredProducts = computed(() => {
  return allProducts.value
    .filter((item) => {
      if (keyword.value && !item.title.toLowerCase().includes(keyword.value.toLowerCase())) {
        return false;
      }
      if (colorType.value && item.title.split(' ')[0] !== colorType.value.id) {
        return false;
      }
      if (materialType.value && item.content !== materialType.value.name) {
        return false;
      }
      if (shapeType.value && item.description !== shapeType.value.name) {
        return false;
      }
      if (priceType.value) {
        if (item.price < priceType.value.min || item.price > priceType.value.max) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (!sortType.value) return 0;
      if (sortType.value.id === '2') return a.price - b.price;
      if (sortType.value.id === '1') return b.price - a.price;
      return 0;
    });
});

// ----- 還原預設的資料 ----- //
const clearInput = () => {
  keyword.value = null;
  sortType.value = null;
  colorType.value = null;
  materialType.value = null;
  shapeType.value = null;
  priceType.value = null;
  isShowNav.value = false;
};

watch(
  () => route.query,
  () => {
    clearInput();
    getTypeProductsData();
  }
);
</script>

<template>
  <main style="padding-top: 70px; min-height: calc(100vh - 104px)">
    <div class="container pt-4">
      <div class="row">
        <div class="col-12">
          <Breadcrumb :items="pageNavData" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 pt-sm-3">
          <VInputGroup>
            <VInputGroupAddon>
              <i class="pi pi-search" />
            </VInputGroupAddon>
            <VInputText v-model="keyword" placeholder="商品名稱" />
          </VInputGroup>
        </div>
        <div class="col-md-3 pt-3">
          <VFloatLabel class="w-100" variant="on">
            <VSelect
              v-model="sortType"
              input-id="sort_label"
              :options="sortTypes"
              option-label="name"
              class="w-100"
              show-clear
            />
            <label for="sort_label">排序方式</label>
          </VFloatLabel>
        </div>
        <div class="col-md-3 pt-3">
          <VOverlayBadge v-if="filterCount" :value="filterCount" severity="danger">
            <VButton
              icon="pi pi-sliders-h"
              label="進階篩選"
              severity="secondary"
              variant="outlined"
              class="w-100"
              @click="isShowNav = !isShowNav"
            />
          </VOverlayBadge>
          <VButton
            v-else
            icon="pi pi-sliders-h"
            label="進階篩選"
            severity="secondary"
            variant="outlined"
            class="w-100"
            @click="isShowNav = !isShowNav"
          />
        </div>
      </div>
      <div v-if="isShowNav" class="row">
        <div class="col-md-3 pt-3">
          <VFloatLabel class="w-100" variant="on">
            <VSelect
              v-model="colorType"
              input-id="color_label"
              :options="colorTypes"
              option-label="name"
              class="w-100"
              show-clear
            />
            <label for="color_label">鏡框顏色</label>
          </VFloatLabel>
        </div>
        <div class="col-md-3 pt-3">
          <VFloatLabel class="w-100" variant="on">
            <VSelect
              v-model="materialType"
              input-id="material_label"
              :options="materialTypes"
              option-label="name"
              class="w-100"
              show-clear
            />
            <label for="material_label">鏡框材質</label>
          </VFloatLabel>
        </div>
        <div class="col-md-3 pt-3">
          <VFloatLabel class="w-100" variant="on">
            <VSelect
              v-model="shapeType"
              input-id="shape_label"
              :options="shapeTypes"
              option-label="name"
              class="w-100"
              show-clear
            />
            <label for="shape_label">框形</label>
          </VFloatLabel>
        </div>
        <div class="col-md-3 pt-3">
          <VFloatLabel class="w-100" variant="on">
            <VSelect
              v-model="priceType"
              input-id="price_label"
              :options="priceTypes"
              option-label="name"
              class="w-100"
              show-clear
            />
            <label for="price_label">價格</label>
          </VFloatLabel>
        </div>
      </div>
      <div v-show="isGetData && filteredProducts.length" class="row g-2 g-md-4 pb-5 mb-4">
        <div
          v-for="item in filteredProducts"
          :key="item.id"
          class="col-12 col-md-6 col-lg-4 col-xl-3"
        >
          <ProductCard :product="item" :root-class="'mx-0'" />
        </div>
      </div>
      <NoData v-show="isGetData && !filteredProducts.length" />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
