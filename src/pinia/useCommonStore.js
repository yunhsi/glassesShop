import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

export const useCommonStore = defineStore('useCommon', () => {
  const toast = useToast();
  const isLoading = ref(false);

  // 訊息提示
  const showMsg = (type, msg) => {
    toast.add({
      severity: type,
      summary: '訊息提示',
      detail: msg,
      life: 1000
    });
  };

  return { isLoading, showMsg };
});
