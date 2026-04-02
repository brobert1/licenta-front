'use client';

import { LoadingState } from '@components';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MatchFoundAnimation from './MatchFoundAnimation';
import OnlineGameSetup from './OnlineGameSetup';

const PlayOnlineClient = () => {
  const router = useRouter();
  const { activeGame, matchFound } = useMultiplayerContext();

  useEffect(() => {
    if (!router.isReady) return;
    if (matchFound) return;
    const segment = activeGame?.publicId || activeGame?._id;
    if (segment) {
      router.replace(`/client/play/live/${segment}`);
    }
  }, [router, activeGame, matchFound]);

  if (matchFound) return <MatchFoundAnimation />;
  if (activeGame) {
    return (
      <LoadingState
        title="Joining your game"
        description="Opening the match and syncing the board…"
      />
    );
  }
  return <OnlineGameSetup />;
};

export default PlayOnlineClient;
