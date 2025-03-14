<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import GoTop from './components/GoTop.vue';
import Loader from './components/Loader.vue';
import Toast from './components/Toast.vue';
import { useCommonStore } from '@/pinia/useCommonStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const commonStore = useCommonStore();
const route = useRoute();

const navbarClass = computed(() => (route.path === '/' ? '' : 'border-bottom'));
</script>

<template>
  <Loader v-show="commonStore.isLoading" />
  <Toast />
  <NavBar :root-class="navbarClass" />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <div data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-duration="500">
        <component :is="Component" />
      </div>
    </keep-alive>
  </router-view>
  <Footer />
  <GoTop />
</template>

<style lang="scss"></style>
