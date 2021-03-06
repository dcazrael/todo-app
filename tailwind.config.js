module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
        200: 'hsl(236, 33%, 92%)',
        300: 'hsl(234, 39%, 85%)',
        400: 'hsl(192, 100%, 67%)',
        500: 'hsl(220, 98%, 61%)',
        600: 'hsl(237, 14%, 26%)',
        800: 'hsl(235, 24%, 19%)',
        900: 'hsl(235, 21%, 11%)',
      },
      purple: {
        300: 'hsl(280, 87%, 65%)',
      },
      gray: {
        100: 'hsl(0, 0%, 98%)',
        200: 'hsl(236, 33%, 92%)',
        300: 'hsl(233, 11%, 84%)',
        400: 'hsl(234, 11%, 52%)',
        500: 'hsl(236, 9%, 61%)',
        600: 'hsl(233, 14%, 35%)',
        700: 'hsl(235, 19%, 35%)',
      },
    },
    fontFamily: {
      josefin: 'Josefin Sans',
    },
    letterSpacing: {
      tightest: '-.075em',
      tight: '-.025em',
      normal: '0',
      wider: '.05em',
      widest: '.25em',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
