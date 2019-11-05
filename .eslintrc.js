module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base','prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "class-methods-use-this": "off",
    "no-param-reassingn": "off",
    "camelcase" : "off",
    "no-unused-vars" : ["error", { "argsIgnorePattern" : "next" }]
  }
};
