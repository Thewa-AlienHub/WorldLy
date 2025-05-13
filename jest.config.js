// jest.config.js (ES module syntax)
// jest.config.mjs
export default {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  };
  
  