<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useThemeStore } from '@/pinia/useThemeStore';
import { useCartStore } from '@/pinia/useCartStore';
import { useOrderStore } from '@/pinia/useOrderStore';

const themeStore = useThemeStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

defineProps({
  rootClass: String
});

const anotherColorMode = computed(() => {
  return themeStore.isDarkMode ? '淺色' : '深色';
});

const navDom = ref(null);
// 主要 Menu 資料
const menus = ref([
  {
    label: '首頁',
    route: '/'
  },
  {
    label: '商品分類',
    items: [
      {
        label: '全部商品',
        route: '/products'
      },
      {
        label: '光學眼鏡',
        route: '/products?category=glasses'
      },
      {
        label: '太陽眼鏡',
        route: '/products?category=sunglasses'
      },
      {
        separator: true
      },
      {
        label: '熱門推薦',
        route: '/products?event=hot'
      },
      {
        label: '優惠活動',
        route: '/products?event=onsale'
      }
    ]
  },
  {
    label: '購物說明',
    route: '/notes'
  }
]);
// 其他 Menu 資料
const otherMenusDom = ref();
const otherMenus = ref([
  { label: '未完成的訂單', route: '/orders?status=0' },
  { label: '已完成的訂單', route: '/orders?status=1' },
  {
    separator: true
  },
  { label: `切換${anotherColorMode.value}模式` }
]);
const cartsCount = ref();
const unpaidOrdersCount = ref();

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  cartStore.getCarts();
  orderStore.getOrders(1);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  if (window.scrollY > 80) {
    navDom.value.classList.add('scrolled');
  } else {
    navDom.value.classList.remove('scrolled');
  }
  if (otherMenusDom.value.target) {
    document.querySelector('.otherMenusBtn').click();
  }
};

watch(cartStore, () => {
  // 取得購物車數量
  cartsCount.value = cartStore.carsData.carts.length;
});

watch(orderStore, () => {
  // 取得未結帳訂單數量
  unpaidOrdersCount.value = orderStore.ordersData.orders.filter((item) => {
    return !item.is_paid;
  }).length;
});

const toggle = (event) => {
  otherMenusDom.value.toggle(event);
};

// 深淺模式切換
const switchColorMode = () => {
  setTimeout(() => {
    themeStore.isDarkMode = !themeStore.isDarkMode;
  }, 100);
};
</script>

<template>
  <nav ref="navDom" class="fixed-top" :class="rootClass">
    <VMenubar :model="menus" class="container">
      <template #start>
        <!-- Logo -->
        <router-link to="/" class="navbar-brand" prefetch>
          <VIcon :icon="['fas', 'glasses']" />
          !wear
        </router-link>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <!-- Menu -->
        <router-link
          v-if="item.route"
          :to="item.route"
          class="d-flex align-items-center"
          v-bind="props.action"
          prefetch
        >
          <span>{{ item.label }}</span>
        </router-link>
        <a v-else v-bind="props.action">
          <span>{{ item.label }}</span>
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root }
            ]"
          />
        </a>
      </template>
      <template #end>
        <div class="d-flex align-items-center gap-2">
          <!-- 購物車 -->
          <router-link to="/cart" prefetch>
            <VOverlayBadge v-if="cartsCount" severity="danger">
              <VButton
                type="button"
                icon="pi pi-shopping-cart"
                severity="contrast"
                variant="text"
                rounded
              />
            </VOverlayBadge>
            <VButton
              v-else
              type="button"
              icon="pi pi-shopping-cart"
              severity="contrast"
              variant="text"
              rounded
            />
          </router-link>
          <!-- 其他 -->
          <VButton
            type="button"
            icon="pi pi-ellipsis-v"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            severity="contrast"
            variant="text"
            rounded
            class="otherMenusBtn"
            @click="toggle"
          />
          <VMenu id="overlay_menu" ref="otherMenusDom" :model="otherMenus" :popup="true">
            <template #item="{ item, props }">
              <!-- 訂單 -->
              <router-link
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
                prefetch
              >
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span class="ml-2">{{ item.label }}</span>
                  <VBadge
                    v-if="unpaidOrdersCount && item.label == '未完成的訂單'"
                    :value="unpaidOrdersCount"
                    severity="danger"
                    size="small"
                  />
                </a>
              </router-link>
              <!-- 深淺模式切換 -->
              <a v-else v-bind="props.action" @click="switchColorMode">
                <span>{{ item.label }}</span>
                <i v-if="anotherColorMode == '淺色'" class="pi pi-sun" />
                <i v-else class="pi pi-moon" />
              </a>
            </template>
          </VMenu>
        </div>
      </template>
    </VMenubar>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  transition: all 0.3s;
  background-color: transparent;
  .p-menubar {
    border-radius: 0;
    background-color: transparent;
    .navbar-brand {
      font-family: Major Mono Display;
      font-size: 24px;
      color: var(--text-color-light);
    }
    .p-menubar-root-list {
      font-size: 14px;
    }
    .p-menubar-item-link {
      color: var(--text-color-light);
      opacity: 0.85;
    }
    .p-button-text.p-button-contrast {
      color: var(--text-color-light);
    }
  }
}
.scrolled {
  background-color: var(--nav-bg-light);
  box-shadow: var(--shadow-light);
  backdrop-filter: blur(7px);
}
</style>
