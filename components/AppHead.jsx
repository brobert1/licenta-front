import { Favicon, NoIndex, OpenGraph } from '@components';
import { description, fonts, scripts, stylesheets } from '@site.config';

const AppHead = () => {
  const showStylesheets = (href) => {
    return <link key={href} rel="stylesheet" href={href} />;
  };
  const showScripts = (src) => {
    return <script key={src} type="text/javascript" src={src}></script>;
  };
  const showFonts = (href) => {
    return <link rel="preload" href={href} as="font" type="font/woff2" crossOrigin />;
  };

  // Order of the meta tags is important, do NOT change the order
  // Loading image must be after the stylesheets

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#fafaf9" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {stylesheets.map(showStylesheets)}
      {scripts.map(showScripts)}
      {fonts.map(showFonts)}
      <img src="/icons/loading.gif" alt="loading" className="hidden" />
      <Favicon />
      <OpenGraph />
      <NoIndex />
    </>
  );
};

export default AppHead;
