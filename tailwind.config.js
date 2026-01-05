module.exports = {
  important: true,
  content: [
    './chess/**/*.jsx', // all chess components
    './components/**/*.jsx', // all components
    './examples/**/*.jsx', // all examples
    './pages/**/*.js', // all pages as well
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        secondary: '#1e1e1e',
        accent: '#2976ff',
        tertiary: '#2e2e2e',
        grey: '#989898',
      },
      fontFamily: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
        chess: '"Noto Chess", "Noto Sans", sans-serif',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'loop-scroll-up': 'loop-scroll-up 60s linear infinite',
        'loop-scroll-down': 'loop-scroll-down 60s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'loop-scroll-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        },
        'loop-scroll-down': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      width: {
        68: '18rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
  ],
};
