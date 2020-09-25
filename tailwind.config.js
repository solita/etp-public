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
      beige: '#f2f8e7',
      lightgray: '#e0e0e0'
    },
    extend: {
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        icon: 'Material Icons'
      },
      flex: {
        full: '1 1 100%'
      },
      boxShadow: {
        lightgreen: '0px 6px 0px 6px #c5e191',
        green: '0px 6px 0px 6px #538000',
        darkgreen: '0px 6px 0px 6px #345000',
        ashblue: '0px 6px 0px 6px #2e5053'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    boxShadow: ['responsive', 'hover', 'focus'],
    zIndex: ['responsive', 'hover', 'focus']
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  }
};
