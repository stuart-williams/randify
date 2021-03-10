module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  moduleDirectories: ["<rootDir>/node_modules", "."],
};
