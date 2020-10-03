module.exports = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!jest.config.js',
    '!**/data/**',
    '!**/node_modules/**',
    '!**/.history/**',
    '!**/test/**',
    '!**/coverage/**',
    '!**/tmp/**'
  ],
  coverageDirectory: 'coverage/unit',
  coverageReporters: ['json', 'text', 'lcov'],
  testPathIgnorePatterns: ['.history/']
}
