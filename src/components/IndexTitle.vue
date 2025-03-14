<script setup>
defineProps({
  tw: String,
  en: String,
  rootClass: String
});
</script>

<template>
  <div
    class="title"
    :class="rootClass"
    data-aos="fade-zoom-in"
    data-aos-easing="ease-in-sine"
    data-aos-duration="600"
  >
    <h2>{{ tw }}</h2>
    <h5>{{ en }}</h5>
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/grid' as *;
.title {
  margin-bottom: 15px;
  position: relative;
  h2 {
    letter-spacing: 3px;
    margin-bottom: 0px;
    &::first-letter {
      font-size: 50px;
      color: var(--danger);
    }
  }
  h5 {
    letter-spacing: 2px;
  }
}
.mobile-text-center {
  @include pad {
    text-align: center;
  }
}
</style>
