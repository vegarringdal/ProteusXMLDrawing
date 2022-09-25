module.exports = {
    testEnvironment: "jsdom",
    clearMocks: true,
    collectCoverageFrom: [],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.jest.json",
                diagnostics: false
            }
        ]
    }
};
