import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

export const useThemeStore = defineStore(
  'useTheme',
  () => {
    const isDarkMode = ref(false);

    watchEffect(() => {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    });

    return { isDarkMode };
  },
  {
    persist: true
  }
);
