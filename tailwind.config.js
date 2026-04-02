module.exports = {
  important: true,
  content: [
    './chess/**/*.jsx', // all chess components
    './components/**/*.jsx', // all components
    './constants/**/*.js', // constants with Tailwind classes
    './examples/**/*.jsx', // all examples
    './pages/**/*.js', // all pages as well
  ],
  theme: {
    extend: {
      colors: {
        accent: '#CF2F7C',
        'accent-hover': '#A92261',
        border: '#d6d3d1',
        grey: '#a8a29e',
        interactive: '#1E40AF',
        'interactive-hover': '#1D4ED8',
        muted: '#78716c',
        primary: '#1c1917',
        secondary: '#f5f5f4',
        surface: '#fafaf9',
        tertiary: '#e7e5e4',
      },
      fontFamily: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
        chess: '"Noto Chess", "Noto Sans", sans-serif',
        noto: '"Noto Sans", sans-serif',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'loop-scroll-up': 'loop-scroll-up 60s linear infinite',
        'loop-scroll-down': 'loop-scroll-down 60s linear infinite',
        'post-game-expand': 'post-game-expand 0.32s ease-out forwards',
        'post-game-collapse': 'post-game-collapse 0.28s ease-in forwards',
        'bubble-drop': 'bubbleDrop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'text-fade-up': 'textFadeUp 0.25s ease-out 0.1s both',
        'text-fade-down': 'textFadeDown 0.25s ease-out 0.2s both',
        'chat-slide-in': 'chatSlideIn 0.3s ease-out both',
        'chevron-rotate': 'chevronRotate 0.25s ease-out forwards',
        'chevron-rotate-back': 'chevronRotateBack 0.25s ease-out forwards',
        'quiz-enter': 'quizEnter 0.5s ease-out both',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) both',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.32, 0.72, 0, 1) both',
        'chapters-push': 'chaptersPush 0.7s cubic-bezier(0.34, 1.2, 0.64, 1) both',
        'chapters-rise': 'chaptersRise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        'video-appear': 'videoAppear 0.6s ease-out both',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bubbleDrop: {
          '0%': { opacity: '0', transform: 'scaleY(0)' },
          '100%': { opacity: '1', transform: 'scaleY(1)' },
        },
        textFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        textFadeDown: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
        chatSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        chevronRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
        chevronRotateBack: {
          '0%': { transform: 'rotate(90deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        quizEnter: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'loop-scroll-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        },
        'loop-scroll-down': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'post-game-expand': {
          '0%': { opacity: '0', maxHeight: '0' },
          '100%': { opacity: '1', maxHeight: '300px' },
        },
        'post-game-collapse': {
          '0%': { opacity: '1', maxHeight: '300px' },
          '100%': { opacity: '0', maxHeight: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        chaptersPush: {
          '0%': { transform: 'translateY(0)' },
          '45%': { transform: 'translateY(16px)' },
          '100%': { transform: 'translateY(0)' },
        },
        chaptersRise: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        videoAppear: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
