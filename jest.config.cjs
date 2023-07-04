module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^lodash-es$": "lodash",
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transformIgnorePatterns: [],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.vue?$": "@vue/vue3-jest",
    "^.+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
  testMatch: ["**/__test__/**/*.test.(js|ts)|**/__test__/*.(js|ts)"],
  testResultsProcessor: "./node_modules/jest-html-reporter",
}
