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
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
  ],
  preset: 'ts-jest',
};
