import { ImageResponse } from 'next/og';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const score = Math.max(0, parseInt(searchParams.get('score') || '0'));
  const total = Math.max(1, parseInt(searchParams.get('total') || '5'));

  const cappyUrl = `${process.env.APP_BASE_URL}/images/capybara-success.png`;

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: '#fdf8f3',
        fontFamily: 'sans-serif',
      }}
    >
      <img
        src={cappyUrl}
        width={160}
        height={160}
        style={{ objectFit: 'contain', marginBottom: 12 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: '#CF2F7C',
            lineHeight: 1,
            letterSpacing: '-2px',
          }}
        >
          {score}/{total}
        </span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#78716c',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            marginTop: 6,
          }}
        >
          MY SCORE
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 28,
          fontSize: 34,
          fontWeight: 700,
          color: '#1c1917',
        }}
      >
        Can you beat me? 🏆
      </div>
      <div style={{ display: 'flex', marginTop: 20, fontSize: 18, color: '#78716c' }}>
        {process.env.APP_BASE_URL}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400, immutable' },
    }
  );
}
