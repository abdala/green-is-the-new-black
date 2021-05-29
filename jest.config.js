module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/fixtures/', '/test/'],
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}