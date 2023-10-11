const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    purgecss({
      content: ['src/renderer/**/*.tsx', 'src/renderer/**/*.ts'],
      css: ['src/renderer/**/*.css'],
      safelist: [/^csv-reader-.*$/, /^sweet_.*$/],
      output: 'release/purgecss/',
    }),
  ],
};
