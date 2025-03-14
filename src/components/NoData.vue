<script setup></script>

<template>
  <div class="noData">
    <h3>
      <VIcon :icon="['fa', 'magnifying-glass']" />
      找不到資料
    </h3>
  </div>
</template>

<style lang="scss" scoped>
.noData {
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-weight: normal;
  }
}
</style>
