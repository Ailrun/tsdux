module.exports = {
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/test-utilities.ts",
  ],
  coverageThreshold: {
    "global": {
      "branches": 90,
      "functions": 90,
      "lines": 90,
      "statements": 90,
    }
  },
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
