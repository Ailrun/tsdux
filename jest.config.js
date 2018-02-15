module.exports = {
  moduleFileExtensions: [
    'ts', 'js',
  ],
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
};
