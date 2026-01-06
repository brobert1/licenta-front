const headers = require('./headers');

module.exports = {
  sitename: "Rook'n'Learn | Checkmate the Ordinary",
  title: "Rook'n'Learn | Checkmate the Ordinary",
  description: `
  An e-learning app for chess enthusiasts with a massive library of curated lessons from
  world-class Grandmasters and coaches.
  `,
  baseurl: `${process.env.APP_BASE_URL}`,
  image: `${process.env.APP_BASE_URL}/images/logo.png`,
  stylesheets: [
    // Add public or external stylesheets here
    `https://kit.fontawesome.com/${process.env.FONT_AWESOME_KEY}.css`,
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  ],
  async headers() {
    return [
      // Apply security headers to all routes
      {
        source: '/:path*',
        headers,
      },
      // Cache images and icons for 1 year
      {
        source: ['/images/:path*', '/icons/:path*'],
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  scripts: [],
  fonts: [
    // Add public or external fonts here
    '/fonts/noto-chess.woff2',
  ],
};
