module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'server/**/*.js',
    '!**/__tests__/**/*.js?(x)',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/server/database/migrations',
    '<rootDir>/server/database/seeders',
    '<rootDir>/server/database/models/index.js',
  ],
  testEnvironment: 'node',
};
