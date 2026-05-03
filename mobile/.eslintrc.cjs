module.exports = {
    root: true,
    extends: [
      "expo",
      "prettier",
      "@callstack/eslint-config/node"
    ],
    plugins: ["@typescript-eslint", "prettier"],
    parser: "@typescript-eslint/parser",
    rules: {
      "prettier/prettier": "warn",
    },
    ignorePatterns: ["node_modules/", "dist/", "build/"],
  };