export default {
  singleQuote: true, // ✅ 使用單引號 `'`（避免與 HTML 屬性衝突）
  semi: true, // ✅ 句尾加上 `;`（避免 ASI 問題）
  tabWidth: 2, // ✅ 設定縮排為 2 空格
  useTabs: false, // ✅ 使用空格而不是 `tab`
  trailingComma: 'none', // ✅ 移除最後的 `,`
  printWidth: 100, // ✅ 設定每行最大字數（避免換行過多）
  bracketSpacing: true, // ✅ `{ foo: bar }` 而不是 `{foo: bar}`
  arrowParens: 'always', // ✅ `(x) => {}` 而不是 `x => {}`
  endOfLine: 'lf', // ✅ 強制使用 `LF`（避免 Windows/Mac 差異）
  htmlWhitespaceSensitivity: 'ignore' // ✅ 讓 Prettier 允許 HTML 格式換行
};
