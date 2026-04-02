const buildVimeoPlayerSrc = ({ privacyHash, startSeconds, videoId }) => {
  const params = new URLSearchParams({
    ...(privacyHash && { h: privacyHash }),
    autoplay: '0',
    byline: '0',
    controls: '0',
    dnt: '1',
    keyboard: '1',
    loop: '0',
    portrait: '0',
    progress_bar: '0',
    title: '0',
    vimeo_logo: '0',
  });

  const url = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  return startSeconds > 0 ? `${url}#t=${startSeconds}s` : url;
};

export default buildVimeoPlayerSrc;
