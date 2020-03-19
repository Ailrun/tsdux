module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint/tslint',
  ],
  rules: {
    '@typescript-eslint/tslint/config': [
      'warn',
      {
        lintFile: './tslint.json',
      },
    ],
  },
};
