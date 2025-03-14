import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';
import vueParser from 'vue-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  js.configs.recommended, // ✅ ESLint 官方推薦規則
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: vueParser,
      globals: {
        localStorage: 'readonly',
        console: 'readonly',
        __dirname: 'readonly'
      }
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, semi: true }],
      'no-unused-vars': 'warn', // ⚠️ 變數未使用時警告
      'no-console': 'off', // ❌ 全局禁用 `console` 警告
      'no-debugger': 'error', // ❌ 禁用 `debugger`
      eqeqeq: ['error', 'always'], // ✅ 必須使用 `===` 而不是 `==`
      curly: ['error', 'all'], // ✅ `if`、`for` 必須使用 `{}` 包裹
      'arrow-parens': ['error', 'always'], // ✅ 箭頭函式 `x => {}` 強制加括號 `(x) => {}`
      'comma-dangle': ['error', 'never'], // ✅ 不允許最後的 `,`
      indent: ['error', 2], // ✅ 縮排為 2 空格
      quotes: ['error', 'single'], // ✅ 強制使用單引號 `'`
      semi: ['error', 'always'], // ✅ 強制使用 `;`
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3, // ✅ 單行最多允許 3 個屬性
          multiline: 1 // ✅ 換行時，每行 1 個屬性
        }
      ]
    }
  },
  ...compat.config({
    plugins: ['prettier', 'vue'],
    extends: ['plugin:prettier/recommended', 'plugin:vue/vue3-recommended']
  })
];
