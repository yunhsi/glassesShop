import { defineRule, configure, ErrorMessage, Field, Form } from 'vee-validate';
import { required, email, min, max, numeric } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 設定驗證規則
defineRule('required', required); // 必填
defineRule('email', email); // Email 格式
defineRule('min', min); // 最小長度
defineRule('max', max); // 最大長度
defineRule('numeric', numeric); // 只能輸入數字
// ✅ 只能輸入中文（包含繁體與簡體）
defineRule('onlyChinese', (value) => {
  const chineseRegex = /^[\u4e00-\u9fa5]+$/;
  return chineseRegex.test(value) ? true : '請輸入中文';
});

// 設定語系
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
});
setLocale('zh_TW');

export default function installVeeValidate(app) {
  // 掛載 Global 的 VeeValidate 元件
  app.component('VField', Field);
  app.component('VForm', Form);
  app.component('ErrorMessage', ErrorMessage);
}
