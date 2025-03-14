import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/pages/Products.vue'),
    props: (route) => ({
      event: route.query.event,
      category: route.query.category
    })
  },
  {
    path: '/product/:productId',
    name: 'Product',
    component: () => import('@/pages/Product.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/pages/Notes.vue')
  },
  {
    path: '/cart',
    name: 'Step1',
    component: () => import('@/pages/checkout/Step1.vue')
  },
  {
    path: '/order',
    name: 'Step2',
    component: () => import('@/pages/checkout/Step2.vue')
  },
  {
    path: '/order/:orderId',
    name: 'Step3',
    component: () => import('@/pages/checkout/Step3.vue')
  },
  {
    path: '/checkout/:orderId',
    name: 'Step4',
    component: () => import('@/pages/checkout/Step4.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/pages/Orders.vue'),
    props: (route) => ({
      status: route.query.status
    })
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }; // 切換頁面時回到頂部，返回時記住滾動位置
  }
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next(); // ✅ 這個頁面不需要登入，直接進入
});

export default router;
