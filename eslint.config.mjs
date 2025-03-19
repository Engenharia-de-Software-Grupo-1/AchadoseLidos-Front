import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';

export default {
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      languageOptions: {
        sourceType: 'module',
        globals: globals.browser,
        parser: tsParser,
      },
      ...pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginReact.configs.flat.recommended,
      plugins: [pluginReact, tseslint],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug', 'trace', 'table'] }],
      },
    },
  ],
};