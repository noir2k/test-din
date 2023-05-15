import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
