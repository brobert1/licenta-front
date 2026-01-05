const Video = ({ src, onVideoRef }) => {
  if (!src) return null;

  try {
    const url = new URL(src);
    const videoId = url.hostname.includes('youtube.com')
      ? url.searchParams.get('v')
      : url.pathname.slice(1);

    if (!videoId) return null;

    const start = url.searchParams.get('t')?.replace(/s$/i, '');
    const params = `modestbranding=1&rel=0&iv_load_policy=3&playsinline=1${
      start ? `&start=${start}` : ''
    }`;

    return (
      <iframe
        ref={onVideoRef}
        src={`https://www.youtube.com/embed/${videoId}?${params}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        credentialless=""
        className="w-full rounded-md aspect-video border-0"
      ></iframe>
    );
  } catch {
    return null;
  }
};

export default Video;
