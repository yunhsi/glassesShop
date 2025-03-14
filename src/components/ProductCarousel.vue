<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductCard from '@/components/ProductCard.vue';

const props = defineProps({
  products: Array,
  isloop: Boolean
});
</script>

<template>
  <swiper
    :modules="[Autoplay]"
    :speed="500"
    :loop="isloop"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    :breakpoints="{
      1000: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      414: {
        slidesPerView: 1
      }
    }"
    data-aos="fade-up"
    data-aos-anchor-placement="top-bottom"
    data-aos-duration="600"
    data-aos-delay="200"
  >
    <swiper-slide v-for="item in products" :key="item.id">
      <ProductCard :product="item" />
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
</style>
