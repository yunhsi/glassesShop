<script setup>
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/pinia/useOrderStore';
import { ref, computed, watch, onMounted } from 'vue';
import PaymentInfo from '@/components/PaymentInfo.vue';
import NoData from '@/components/NoData.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const route = useRoute();
const orderStore = useOrderStore();

const items = ref([{ label: '' }]);

useHead({
  title: '訂單列表｜!WEAR'
});

const isGetData = ref(false);
const keyword = ref();

// ----- API回傳的資料 ----- //
const ordersData = ref();
const orders = ref();

const getTypeOrdersData = () => {
  switch (route.query.status) {
    case '0':
      orders.value = ordersData.value.orders.filter((item) => {
        return !item.is_paid;
      });
      items.value[0].label = '未完成的訂單';
      break;
    case '1':
      orders.value = ordersData.value.orders.filter((item) => {
        return item.is_paid;
      });
      items.value[0].label = '已完成的訂單';
      break;
  }
  isGetData.value = true;
};

onMounted(async () => {
  await orderStore.getOrders(1);
  ordersData.value = orderStore.ordersData;
  getTypeOrdersData();
});

watch(
  () => route.query,
  () => {
    getTypeOrdersData();
  }
);

// 篩選訂單
const filterKeyword = computed(() => {
  if (keyword.value) {
    const lowerKeyword = keyword.value.toLowerCase();
    return orders.value.filter((item) => {
      return (
        item.user.name.toLowerCase().includes(lowerKeyword) ||
        item.user.tel.toLowerCase().includes(lowerKeyword) ||
        item.user.address.toLowerCase().includes(lowerKeyword)
      );
    });
  }
  return orders.value;
});
</script>

<template>
  <main style="padding-top: 73px; min-height: calc(100vh - 104px)">
    <div class="container pt-4 pb-5">
      <!-- 搜尋 -->
      <div class="search-bar mx-2 mx-md-0 mb-md-4">
        <Breadcrumb :items="items" />
        <div class="wrap" style="width: 320px">
          <VInputGroup>
            <VInputGroupAddon>
              <i class="pi pi-search" />
            </VInputGroupAddon>
            <VInputText
              v-model.trim="keyword"
              type="search"
              placeholder="訂單之收件人姓名、電話、地址"
            />
          </VInputGroup>
        </div>
      </div>

      <div v-show="isGetData && filterKeyword.length" class="row">
        <div v-for="item in filterKeyword" :key="item.id" class="col-md-6 col-lg-4 pb-3">
          <router-link :to="`/order/${item.id}`">
            <PaymentInfo :id="item.id" :order="item" />
          </router-link>
        </div>
      </div>
      <NoData v-show="isGetData && !filterKeyword.length" :keyword="keyword" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/scss/grid' as *;
.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  @include pad {
    flex-direction: column;
    align-items: start;
    margin: 0;
  }
}
</style>
