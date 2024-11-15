const nx = require('@nx/eslint-plugin');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');


module.exports = [
  eslintPluginPrettierRecommended,
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/typescript'],
  {
    ignores: ['**/dist', '**/*.config.js'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-unused-expressions': ['error', {'allowTernary' : true }],
      'prettier/prettier': ['error', {
        "endOfLine": "auto",
        'tabWidth': 4,
        'semi': true,
        'singleQuote': true,
        'bracketSpacing': true
      }],
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      "@angular-eslint/template/elements-content": [
        "warn",
        {
          "allowList": [
            "tuiLink",
            "tuiIconButton",
          ]
        }],
      'prettier/prettier': ['error', {
        'tabWidth': 4,
      }],
    },
  },
];

