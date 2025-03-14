import { createApp } from 'vue';
import pinia from '@/pinia/index';
import router from '@/router/router';
import App from '@/App.vue';
import { createHead } from '@vueuse/head';

// ✅ 安裝外部插件
import installAOS from '@/plugins/aos';
import installPrimeVue from '@/plugins/primevue';
import installVeeValidate from '@/plugins/vee-validate';
import installFontAwesome from '@/plugins/fontawesome';

// ✅ 全域 SCSS 與 CSS 套件
import 'hover.css';
import 'animate.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/scss/main.scss';

const app = createApp(App);
const head = createHead();

// ✅ 安裝 Vue 插件
app.use(pinia);
app.use(router);
app.use(head);

installAOS();
installPrimeVue(app);
installVeeValidate(app);
installFontAwesome(app);

app.mount('#app');
