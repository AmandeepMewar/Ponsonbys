import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.mocha },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
