const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        bluegray: colors.blueGray,
        cyan: colors.cyan,
        rose: colors.rose,
        emerald: colors.emerald
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
