module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/test/**/*.(spec|test).(ts|tsx)"],
    collectCoverageFrom: ["src/**/*.[jt]s"],
    resetMocks: true,
    clearMocks: true
};