const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.spec.ts'], // Carpeta de tests
  modulePathIgnorePatterns: ['dist','node_modules'],       // Ignorar build
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['cdk']
};