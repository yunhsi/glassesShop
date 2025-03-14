<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const goTopDom = ref(null);

onMounted(() => {
  goTopDom.value = document.querySelector('.go-top');
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  if (window.scrollY > 200) {
    goTopDom.value.classList.add('scrolled');
  } else {
    goTopDom.value.classList.remove('scrolled');
  }
};

const goTop = () => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <div class="go-top text-secondary hvr-sink" @click="goTop">
    <VIcon :icon="['fas', 'angle-up']" class="text-center" />
    <small>TOP</small>
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/grid' as *;
.go-top {
  position: fixed;
  right: 40px;
  bottom: 55px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: all 0.3s;
  z-index: 10;
  cursor: pointer;
  @include pad {
    right: 30px;
  }
  small {
    font-size: 12px;
    font-weight: light;
  }
}
.scrolled {
  opacity: 1;
}
</style>
