module.exports = {
  content: ['src/renderer/**/*.tsx', 'src/renderer/**/*.ts'],
  css: ['src/renderer/**/*.css'],
  safelist: [/^csv-reader-.*$/, /^sweet_.*$/],
  output: 'release/purgecss/',
};
