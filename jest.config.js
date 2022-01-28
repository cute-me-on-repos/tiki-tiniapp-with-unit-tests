// jest.config.js 
module.exports = async () => {
  return {
    verbose: true,
    transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
    automock: false,
    setupFiles: ["./mocking/setupJestMock.js","jest-canvas-mock"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
    collectCoverageFrom: ["app/**/*.{js,ts}"],
    testEnvironment:"jsdom"
  };
};
