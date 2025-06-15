module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    'react-refresh/only-export-components': 'off',
  },
  ignorePatterns: ['/proc', '/sys', '/dev', '**/node_modules/**', '**/dist/**'],
};
