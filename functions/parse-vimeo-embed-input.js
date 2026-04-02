const parseVimeoTimeToken = (raw) => {
  if (raw == null || raw === '') return 0;
  const str = String(raw).trim();
  if (!str) return 0;
  if (/^\d+$/.test(str)) return parseInt(str, 10);

  const h = str.match(/(\d+)h/i)?.[1];
  const m = str.match(/(\d+)m/i)?.[1];
  const s = str.match(/(\d+)s/i)?.[1];

  if (!h && !m && !s) return parseInt(str.match(/^\d+/)?.[0] ?? '0', 10);

  return parseInt(h ?? '0', 10) * 3600 + parseInt(m ?? '0', 10) * 60 + parseInt(s ?? '0', 10);
};

const isVimeoHost = (host) =>
  typeof host === 'string' && (host === 'vimeo.com' || host.endsWith('.vimeo.com'));

const extractVideoId = (pathname) => {
  const fromVideo = pathname.match(/\/video\/(\d+)/)?.[1];
  if (fromVideo) return fromVideo;

  const segments = pathname.split('/').filter(Boolean);
  for (let i = segments.length - 1; i >= 0; i -= 1) {
    if (/^\d{5,}$/.test(segments[i])) return segments[i];
  }

  return null;
};

const timeFromUrl = ({ searchParams, hash }) => {
  const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
  return parseVimeoTimeToken(searchParams.get('t') ?? hashParams.get('t') ?? '0');
};

const parseVimeoEmbedInput = (src) => {
  if (!src || typeof src !== 'string') return null;

  try {
    const url = new URL(src);
    if (!isVimeoHost(url.hostname)) return null;

    const videoId = extractVideoId(url.pathname);
    if (!videoId) return null;

    return { privacyHash: url.searchParams.get('h'), startSeconds: timeFromUrl(url), videoId };
  } catch {
    return null;
  }
};

export default parseVimeoEmbedInput;
