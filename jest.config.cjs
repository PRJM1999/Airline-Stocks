module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: [
      '**/__tests__/**/*.test.(ts|tsx)',
      '**/?(*.)+(spec|test).(ts|tsx)',
    ],
  };