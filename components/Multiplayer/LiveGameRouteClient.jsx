'use client';

import { LoadingState } from '@components';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MultiplayerPlayResponsive from './MultiplayerPlayResponsive';

const livePath = (segment) => `/client/play/live/${segment}`;

const canonicalLiveSegment = (activeGame) => activeGame?.publicId || activeGame?._id;

const routeMatchesGame = (activeGame, routeSegment) => {
  if (!activeGame || routeSegment == null || routeSegment === '') return false;
  const r = String(routeSegment);
  if (activeGame.publicId && r === String(activeGame.publicId)) return true;
  return r === String(activeGame._id);
};

const LiveGameRouteClient = () => {
  const router = useRouter();
  const { publicId: routeSegment } = router.query;
  const { activeGame, isConnected, matchFound, opponent } = useMultiplayerContext();

  useEffect(() => {
    const onNoGame = () => router.replace('/client/play');
    window.addEventListener('multiplayer-no-active-game', onNoGame);
    return () => window.removeEventListener('multiplayer-no-active-game', onNoGame);
  }, [router]);

  useEffect(() => {
    if (!router.isReady || !routeSegment) return undefined;
    if (activeGame || matchFound) return undefined;
    if (!isConnected) return undefined;
    const id = setTimeout(() => router.replace('/client/play'), 8000);
    return () => clearTimeout(id);
  }, [router, routeSegment, activeGame, matchFound, isConnected]);

  useEffect(() => {
    if (!router.isReady || !routeSegment || !activeGame || !opponent) return;
    const canonical = canonicalLiveSegment(activeGame);
    if (canonical && String(routeSegment) !== String(canonical)) {
      router.replace(livePath(canonical));
    }
  }, [router, routeSegment, activeGame, opponent]);

  if (!router.isReady || !routeSegment) {
    return <LoadingState title="Loading game" description="Preparing the page…" />;
  }

  if (!activeGame || !opponent) {
    return (
      <LoadingState
        title="Connecting to your game"
        description="Restoring your session with the server. If this takes too long, go back to Play online from the menu."
      />
    );
  }

  if (!routeMatchesGame(activeGame, routeSegment)) {
    return (
      <LoadingState title="Updating link" description="Sending you to the correct match URL…" />
    );
  }

  return <MultiplayerPlayResponsive />;
};

export default LiveGameRouteClient;
