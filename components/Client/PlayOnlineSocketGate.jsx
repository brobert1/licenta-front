'use client';

import { useRouter } from 'next/router';
import ClientSocketProvider from './ClientSocketProvider';

const isOnlinePlayRoute = (pathname) =>
  pathname === '/client/play' ||
  pathname === '/client/play/live/[publicId]' ||
  /^\/client\/play\/live\/[^/]+$/.test(pathname);

const PlayOnlineSocketGate = ({ children }) => {
  const router = useRouter();
  if (!isOnlinePlayRoute(router.pathname)) {
    return children;
  }
  return <ClientSocketProvider>{children}</ClientSocketProvider>;
};

export default PlayOnlineSocketGate;
