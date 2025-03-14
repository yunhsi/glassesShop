import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import viteImagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

// 🔹 判斷環境
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: '/glassesShop/',
    plugins: [
      vue(),
      Pages(),
      visualizer({ open: true }),
      // ✅ 圖片壓縮（正式環境）
      isProduction &&
        viteImagemin({
          gifsicle: { optimizationLevel: 7 },
          optipng: { optimizationLevel: 7 },
          mozjpeg: { quality: 80 },
          webp: { quality: 80 },
          svgo: {
            plugins: [{ removeViewBox: false }]
          }
        })
    ].filter(Boolean), // 🔹 避免 `false` 進入 plugins 陣列

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },

    server: {
      port: 3000, // ✅ 設定開發伺服器 Port
      open: true // ✅ 自動開啟瀏覽器
    },

    optimizeDeps: {
      include: [
        'pinia',
        'axios',
        'primevue/config',
        'primevue/button',
        'vee-validate',
        '@vee-validate/rules',
        '@vee-validate/i18n'
      ],
      exclude: ['vue']
    },

    build: {
      minify: 'esbuild', // ✅ 改用 esbuild，比 Terser 快
      sourcemap: !isProduction, // ✅ 開發環境開啟，正式環境關閉

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('pinia')) return 'pinia';
              if (id.includes('axios')) return 'axios';
              if (id.includes('primevue')) return 'primevue';
              if (id.includes('vee-validate')) return 'vee-validate';
              return 'vendor'; // 其他第三方庫
            }
          }
        }
      },

      terserOptions: {
        compress: {
          drop_console: isProduction, // ✅ 只在正式環境移除 console.log
          drop_debugger: isProduction
        }
      }
    }
  };
});
