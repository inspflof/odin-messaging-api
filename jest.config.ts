import type { Config } from 'jest';

const config: Config = {
  // 1. Indique à Jest d'utiliser ts-jest configuré pour l'ESM moderne
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  // 2. IMPORTANT : Empêche Jest d'aller fouiller dans le dossier de build dist/
  modulePathIgnorePatterns: ["<rootDir>/dist/"],

  // 3. Traduit les extensions .js de vos fichiers sources en .ts pour ts-jest
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // 4. Force ts-jest à compiler en mode ESM pur
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

  collectCoverageFrom: [
    "src/**",
    "!src/**/generated/**",
    "!src/**/*.mock.ts"
  ]
};

export default config;