// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'error',
    'react/prop-types': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      2,
      {
        groups: [
          'external',
          'builtin',
          'index',
          'sibling',
          'parent',
          'internal',
          'type',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always-and-inside-groups',
      },
    ],
  },
};
