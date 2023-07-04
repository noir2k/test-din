module.exports = {
  extends: 'erb',
  ignorePatterns: ['**/*.html', '**/*.ejs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'html'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    camelcase: 'off',
    'global-require': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'new-cap': 'off',
    'promise/catch-or-return': 'off',
    'promise/always-return': 'off',
    // A temporary hack related to IDE not resolving correct package.json
    'react/self-closing-comp': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.ejs'],
    },
  },
};
