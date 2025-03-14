<script setup>
import { defineProps, defineEmits } from 'vue';

// 接收 props
const props = defineProps({
  pagination: { type: Object, default: () => ({}) }
});

// 定義 emits
const emit = defineEmits(['getList']);

// 方法：發送 getList 事件，並滾動到頂部
const emitGetProduct = (page) => {
  emit('getList', page);
  window.scrollTo({ top: 0, behavior: 'instant' });
};
</script>

<template>
  <nav aria-label="Page navigation example" class="my-3">
    <ul class="pagination pagination-sm justify-content-center m-0">
      <li class="page-item" :class="{ disable: !pagination.has_pre }">
        <a
          class="page-link"
          href="javascript:;"
          aria-label="Previous"
          @click="emitGetProduct(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pagination.total_pages"
        :key="page"
        class="page-item"
        :class="{ active: pagination.current_page === page }"
      >
        <a class="page-link" href="javascript:;" @click="emitGetProduct(page)">{{ page }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disable: !pagination.has_next }"
        @click="emitGetProduct(pagination.current_page + 1)"
      >
        <a class="page-link" href="javascript:;" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.page-link {
  color: #000;
  border-color: #000;
}
.page-item.active .page-link {
  background: #000;
  color: #fff;
}
.dark-mode {
  .page-link {
    border-color: #fff;
    background: #000;
    color: #fff;
  }
  .page-item.active .page-link {
    background: #fff;
    color: #000;
  }
}
</style>
