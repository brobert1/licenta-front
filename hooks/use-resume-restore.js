import { useChessContext } from '@chess/contexts';
import { useBotContext } from '@contexts/BotContext';
import { findBotByName } from '@data/bots';
import { useEffect } from 'react';
import { constants } from 'next-chessground';

const useResumeRestore = (resumeData) => {
  const { selectBot, updateGameSettings } = useBotContext();
  const { resetGameState, setHistory, setPgn } = useChessContext();

  useEffect(() => {
    if (!resumeData) return;
    const botData = findBotByName(resumeData.botName);
    const startingFen = resumeData.gameSettings?.selectedPosition?.fen || constants.initialFen;

    if (botData) selectBot(botData);
    resetGameState(startingFen);
    updateGameSettings(resumeData.gameSettings);
    setHistory(resumeData.history || []);
    setPgn(resumeData.pgn || '');
  }, []);
};

export default useResumeRestore;
