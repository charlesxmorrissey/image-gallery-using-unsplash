'use strict'

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],

  env: {
    browser: true,
    es6: true,
    jest: true,
  },

  globals: {
    expect: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      generators: true,
    },
  },

  rules: {
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 2,
    'prefer-const': [
      2,
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
}
