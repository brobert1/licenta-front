import { checkAuth, withAuth } from '@auth';
import { useBotEngineContext } from '@chess/contexts';
import { ChessProvider } from '@chess/contexts/ChessContext';
import { useGameDisclosure } from '@chess/hooks';
import { Layout } from '@components';
import { GamePlay, GameSetup } from '@components/Bot';
import { ResumeGameModal } from '@components/Modals';
import { BotProvider } from '@contexts/BotContext';
import { parseBotRematchState } from '@functions';
import { clearGameState, loadGameState } from '@functions/bot-game-persistence';
import { useQuery } from '@hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const { isPlaying, startGame, endGame } = useGameDisclosure();
  const { isReady, initialize } = useBotEngineContext();
  const { data: me } = useQuery('/client/account');

  const { rematchBot, rematchKey, rematchSettings } = parseBotRematchState(router.query);

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [savedGame, setSavedGame] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  // Load the persisted game for this specific user once their ID is known.
  // Each user has an isolated storage key so there is no cross-user contamination.
  useEffect(() => {
    if (rematchBot) return;
    if (!me?._id) return;

    const saved = loadGameState(me._id);
    if (!saved) return;

    setSavedGame(saved);
    setShowResumeModal(true);
  }, [me?._id, rematchBot]);

  useEffect(() => {
    if (!rematchBot) return;

    setResumeData(null);
    setSavedGame(null);
    setShowResumeModal(false);
  }, [rematchBot]);

  const handleResume = () => {
    setResumeData(savedGame);
    setShowResumeModal(false);
    startGame();
  };

  const handleNewGame = () => {
    clearGameState(me?._id);
    setSavedGame(null);
    setResumeData(null);
    setShowResumeModal(false);
  };

  return (
    <Layout variant="client">
      <ChessProvider>
        <BotProvider key={rematchKey} initialBot={rematchBot} initialSettings={rematchSettings}>
          <ResumeGameModal
            isOpen={showResumeModal}
            savedGame={savedGame}
            onResume={handleResume}
            onNewGame={handleNewGame}
          />
          {isPlaying ? (
            <GamePlay
              onEndGame={endGame}
              onClearResumeData={() => setResumeData(null)}
              isEngineReady={isReady}
              resumeData={resumeData}
            />
          ) : (
            <GameSetup onStartGame={startGame} isEngineReady={isReady} />
          )}
        </BotProvider>
      </ChessProvider>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
