require('dotenv').config();
const headers = require('./headers');

module.exports = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_BASE_URL: process.env.APP_BASE_URL,
    FONT_AWESOME_KEY: process.env.FONT_AWESOME_KEY,
    JWT_TOKEN_NAME: process.env.JWT_TOKEN_NAME,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    SHOW_FORM_DEBUG: process.env.SHOW_FORM_DEBUG,
    SHOW_LOGS_EVERYWHERE: process.env.SHOW_LOGS_EVERYWHERE,
    SHOW_NEWSLETTER: process.env.SHOW_NEWSLETTER,
    HAS_MOVE_TRAINER: process.env.HAS_MOVE_TRAINER,
    CASTLE_API_URL: process.env.CASTLE_API_URL,
    CASTLE_API_TOKEN: process.env.CASTLE_API_TOKEN,
    BOTS_API_URL: process.env.BOTS_API_URL,
    BOTS_API_KEY: process.env.BOTS_API_KEY,
    LICHESS_TOKEN: process.env.LICHESS_TOKEN,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/og/:path*',
        destination: '/api/og/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/client/play/online',
        destination: '/client/play',
        permanent: false,
      },
      {
        source: '/client/studio',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/client/studio/:path*',
        destination: '/404',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
      },
      {
        source: '/manifest.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
      {
        source: '/lib/stockfish/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)',
        headers,
      },
    ];
  },
  generateEtags: false,
  poweredByHeader: false,
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
};
