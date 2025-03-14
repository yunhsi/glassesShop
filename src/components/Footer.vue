<script setup></script>

<template>
  <footer class="bg-dark">
    <div class="container py-3">
      <p class="m-0 copyright text-center">
        <!-- copyright -->
        © 2025
        <router-link to="/" prefetch>!wear</router-link>
        All Rights Reserved
        <br />
        <!-- 後台登入 -->
        <small class="d-block py-1">
          僅做為練習使用，非商業用途. ｜
          <a href="https://yunhsi.github.io/iwearCLI/#/admin/login" class="small" target="_blank">
            登入後台
          </a>
        </small>
      </p>
      <!-- social media -->
      <ul class="d-flex justify-content-center list-unstyled m-0">
        <li>
          <a href="javascript:;" target="_blank" class="px-2">
            <VIcon :icon="['fab', 'square-facebook']" />
          </a>
        </li>
        <li>
          <a href="javascript:;" target="_blank" class="px-2">
            <VIcon :icon="['fab', 'square-instagram']" />
          </a>
        </li>
        <li>
          <a href="javascript:;" target="_blank" class="px-2">
            <VIcon :icon="['fab', 'square-threads']" />
          </a>
        </li>
        <li>
          <a href="javascript:;" target="_blank" class="px-2">
            <VIcon :icon="['fab', 'line']" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
}
a {
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s;
  font-family: Major Mono Display;
  &:hover {
    color: #fff;
  }
}
p {
  font-size: 14px;
}
</style>
