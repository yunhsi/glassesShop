<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  count: Number
});

const emit = defineEmits(['addCount', 'reduceCount']);

const tempCount = ref(props.count);

watch(
  () => props.count,
  (newCount) => {
    tempCount.value = newCount;
  }
);

const emitReduceCount = () => {
  emit('reduceCount', tempCount.value);
};

const emitAddCount = () => {
  emit('addCount', tempCount.value);
};
</script>

<template>
  <VInputGroup>
    <VInputGroupAddon>
      <VButton label="-" :disabled="tempCount == 1" severity="secondary" @click="emitReduceCount" />
    </VInputGroupAddon>
    <VInputNumber v-model="tempCount" class="counterInput" readonly />
    <VInputGroupAddon>
      <VButton label="+" severity="secondary" @click="emitAddCount" />
    </VInputGroupAddon>
  </VInputGroup>
</template>

<style lang="scss">
.counterInput {
  color: #000;
  .p-inputnumber-input {
    text-align: center;
  }
}
</style>
