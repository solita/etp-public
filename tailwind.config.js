module.exports = {
  purge: false,
  theme: {
    colors: {
      black: '#000000',
      grey: '#eaeded',
      white: '#ffffff',
      lightgreen: '#c5e191',
      green: '#538000',
      darkgreen: '#345000',
      ashblue: '#2e5053',
      beige: '#f2f8e7'
    },
    extend: {
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        icon: 'Material Icons'
      }
    }
  },
  variants: { backgroundColor: ['responsive', 'hover', 'focus'] },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  }
};
