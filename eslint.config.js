// const nx = require('@nx/eslint-plugin');
// const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

// module.exports = [
//   ...nx.configs['flat/base'],
//   ...nx.configs['flat/typescript'],
//   ...nx.configs['flat/javascript'],
//   {
//     ignores: ['**/dist'],
//   },
//   {
//     files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
//     rules: {},
//   },
//   ...nx.configs['flat/angular'],
//   ...nx.configs['flat/angular-template'],
//   {
//     files: ['**/*.ts', '**/*.html'],
//     rules: {
//       'no-unused-vars': 'warn',
//       '@typescript-eslint/no-unused-expressions': ['error', {'allowTernary' : true }],
//       'object-shorthand': 'error',
//       'curly': 'error',
//       'semi': 'error',
//       'no-redeclare': 'error',
//       'prefer-const': 'error',
//       'quotes': ['error', 'single'],
//       'eqeqeq': 'error',
//       'no-unreachable': 'error',
//       'keyword-spacing': ['error', { 'after': true }],
//       '@angular-eslint/directive-selector': [
//         'error',
//         {
//           type: 'attribute',
//           prefix: 'app',
//           style: 'camelCase',
//         },
//       ],
//       '@angular-eslint/component-selector': [
//         'error',
//         {
//           type: 'element',
//           prefix: 'app',
//           style: 'kebab-case',
//         },
//       ],
//     },
//   },
// ];





const nx = require('@nx/eslint-plugin');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');


module.exports = [
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
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
    // Override or add rules here
    rules: {},
  },
];

