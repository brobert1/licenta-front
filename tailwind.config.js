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
        primary: '#020617', // Deep Slate
        secondary: '#1e293b', // Slate 800
        accent: '#3b82f6', // Blue 500
        tertiary: '#334155', // Slate 700
        grey: '#94a3b8', // Slate 400
        // Landing page palette (Grandmaster's Study style)
        gold: '#b8860b',
        'gold-light': '#d4a84b',
        cream: '#f8f6f3',
        'cream-dark': '#ebe8e4',
        // Design system tokens (Stitch / Rook'n'Learn landing)
        surface: '#f7f9fb',
        'surface-container-low': '#f2f4f6',
        'surface-container': '#eceef0',
        'surface-container-high': '#e6e8ea',
        'surface-container-highest': '#e0e3e5',
        'surface-container-lowest': '#ffffff',
        'on-primary': '#ffffff',
        'on-surface': '#191c1e',
        'outline-variant': '#c6c6cd',
        tertiaryGold: '#725c00',
        'tertiary-container': '#cba829',
        'secondary-muted': '#505f76',
        // Light panels (bot live play sidebar + player bars)
        gameplay: {
          DEFAULT: '#f7f9fb',
          elevated: '#eceef0',
          control: '#e6e8ea',
        },
      },
      fontFamily: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
        chess: '"Noto Chess", "Noto Sans", sans-serif',
        serif: '"Playfair Display", Georgia, serif',
        sans: '"Source Sans 3", system-ui, sans-serif',
        headline: '"Newsreader", Georgia, serif',
        landing: '"Manrope", system-ui, sans-serif',
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
