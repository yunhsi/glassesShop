<script setup></script>

<template>
  <div class="spinWrapper">
    <VProgressSpinner fill="transparent" animation-duration=".5s" />
  </div>
</template>

<style lang="scss" scoped>
.spinWrapper {
  height: 100%;
  width: 100%;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: var(--nav-bg-light);
}
</style>
