<script setup>
import { ref } from 'vue';
const home = ref({
  icon: 'pi pi-home',
  route: '/'
});
defineProps({
  items: { type: Array, default: () => [] }
});
</script>

<template>
  <VBreadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="[item.icon, 'text-color']" />
          <span class="text-primary font-semibold">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span class="text-surface-700 dark:text-surfac -0">{{ item.label }}</span>
      </a>
    </template>
  </VBreadcrumb>
</template>

<style lang="scss" scoped>
.p-breadcrumb-item-link {
  text-transform: capitalize;
  .text-primary {
    color: #64748b !important;
  }
}
</style>
