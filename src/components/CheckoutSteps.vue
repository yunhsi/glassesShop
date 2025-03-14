<script setup>
defineProps({
  step: String
});
</script>

<template>
  <div class="row g-0 pt-5 pb-md-5 pb-4 mt-2 small progress-wrap">
    <!-- 1 -->
    <div class="col-3 text-center text-danger">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span class="progress-num">1</span>
        <span class="progress-text">確認品項</span>
      </div>
      <div class="progress mt-2" style="height: 2px">
        <div class="progress-bar" role="progressbar" :class="{ active: step >= 1 }" />
      </div>
    </div>
    <!-- 2 -->
    <div class="col-3 text-center text-danger">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span class="progress-num">2</span>
        <span class="progress-text">建立訂單</span>
      </div>
      <div class="progress mt-2" style="height: 2px">
        <div class="progress-bar" role="progressbar" :class="{ active: step >= 2 }" />
      </div>
    </div>
    <!-- 3 -->
    <div class="col-3 text-center text-danger">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span class="progress-num">3</span>
        <span class="progress-text">確認付款</span>
      </div>
      <div class="progress mt-2" style="height: 2px">
        <div class="progress-bar" role="progressbar" :class="{ active: step >= 3 }" />
      </div>
    </div>
    <!-- 4 -->
    <div class="col-3 text-center text-danger">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span class="progress-num">4</span>
        <span class="progress-text">完成訂單</span>
      </div>
      <div class="progress mt-2" style="height: 2px">
        <div class="progress-bar" role="progressbar" :class="{ active: step >= 4 }" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-wrap {
  .progress-num {
    width: 22px;
    height: 22px;
    border: 1px solid var(--danger);
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  }
  .progress-text {
    letter-spacing: 1px;
  }
}
.active {
  width: 100%;
  background: var(--danger);
}
</style>
