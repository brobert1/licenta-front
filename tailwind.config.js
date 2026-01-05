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
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-out': 'fadeOut 0.3s ease-in forwards',
        'loop-scroll-up': 'loop-scroll-up 60s linear infinite',
        'loop-scroll-down': 'loop-scroll-down 60s linear infinite',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.3s',
        'bounce-short': 'bounceShort 2s infinite ease-in-out',
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
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-100px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(100px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0) rotate(180deg)' },
          to: { opacity: '1', transform: 'scale(1) rotate(12deg)' },
        },
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
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
