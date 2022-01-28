module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["google", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  globals: {
    my: "readonly",
    App: "readonly",
    Page: "readonly",
    Component: "readonly",
    getApp: "readonly",
    getCurrentPages: "readonly",
  },

  rules: {
    "space-infix-ops": ["error", { int32Hint: false }],
    "no-async-promise-executor": "warn",
    "no-empty": "warn",
    indent: "off",
    "quote-props": ["error", "as-needed"],
    "prettier/prettier": "off",
    "new-cap": "off",
    "no-invalid-this": "off",
    "no-implicit-globals": "error",
    "no-undefined": "error",
    "no-undef": "error",
    "require-jsdoc": "off",
    camelcase: "off",
    "import/newline-after-import": ["error", { count: 1 }],
    "padding-line-between-statements": "off",
    quotes: ["error", "double", { avoidEscape: true }],
  },
  plugins: ["import", "@typescript-eslint", "eslint-plugin-jest"],
};