import { checkGuest } from '@auth';
import { useBotEngineContext } from '@chess/contexts';
import { ChessProvider } from '@chess/contexts/ChessContext';
import { useGameDisclosure } from '@chess/hooks';
import { Layout } from '@components';
import { GamePlay, GameSetup } from '@components/Bot';
import { ResumeGameModal } from '@components/Modals';
import { BotProvider } from '@contexts/BotContext';
import { loadGameState, clearGameState } from '@functions/bot-game-persistence';
import { useEffect, useState } from 'react';

const Page = () => {
  const { isPlaying, startGame, endGame } = useGameDisclosure();
  const { isReady, initialize } = useBotEngineContext();

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [savedGame, setSavedGame] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    initialize();
    const saved = loadGameState('guest');
    if (saved) {
      setSavedGame(saved);
      setShowResumeModal(true);
    }
  }, []);

  const handleResume = () => {
    setResumeData(savedGame);
    setShowResumeModal(false);
    startGame();
  };

  const handleNewGame = () => {
    clearGameState('guest');
    setSavedGame(null);
    setResumeData(null);
    setShowResumeModal(false);
  };

  return (
    <Layout variant="guest">
      <ChessProvider>
        <BotProvider isGuest>
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
  return await checkGuest(context);
}

export default Page;
