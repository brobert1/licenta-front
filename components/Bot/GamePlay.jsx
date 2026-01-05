import { saveGame } from '@api/client';
import { PgnTree } from '@chess/components/PgnViewer';
import { GameBoard } from '@chess/components/Play';
import { useChessContext } from '@chess/contexts';
import { useOpeningDetector, usePgnViewer } from '@chess/hooks';
import { BotCard, BotMessageArea, GameBotActions, UserCard } from '@components/Bot';
import { GameOverModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useDisclosure, useEqualHeight, useMutation, useRerender } from '@hooks';
import { classnames } from '@lib';
import { constants, NextChessground } from 'next-chessground';
import { useState } from 'react';

const GamePlay = ({ onEndGame }) => {
  const { sourceRef, targetRef } = useEqualHeight();
  const { isOpen, show, hide } = useDisclosure();
  const [boardKey, rerender] = useRerender('game-board');

  const { selectedBot, gameSettings, handleGameOver, reset, setSavedGame } = useBotContext();
  const { pgn, history } = useChessContext();

  const {
    tree,
    current,
    goToMoment,
    onUserMove: onMove,
    lastMoment,
    goPrevMoment,
    goNextMoment,
  } = usePgnViewer(pgn);

  const { currentOpening } = useOpeningDetector();

  const { name: botName, elo: botElo, openingLine } = selectedBot;
  const { selectedPosition, playerColor } = gameSettings;

  // Time tracking state (lifted from Timer components)
  const initialSeconds = (gameSettings?.timeControl?.minutes || 10) * 60;
  const [playerTime, setPlayerTime] = useState(initialSeconds);
  const [botTime, setBotTime] = useState(initialSeconds);

  const mutation = useMutation(saveGame, {
    successCallback: (data) => {
      if (data?.data?._id) {
        setSavedGame(data.data._id);
      }
    },
  });

  const onGameOver = (chess) => handleGameOver(chess, mutation, show);

  const handleBackToSetup = () => {
    reset(true);
    onEndGame();
    rerender();
  };

  const handleRematch = () => {
    reset(false);
    hide();
    // Reset time for rematch
    setPlayerTime(initialSeconds);
    setBotTime(initialSeconds);
    rerender();
  };

  const isTimedGame = gameSettings?.timeControl?.mode === 'realtime';
  const isReviewMode = current?.index !== lastMoment?.index && lastMoment?.index > 0;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
      <div ref={sourceRef} className="md:col-span-3 max-w-chess-board h-min flex flex-col gap-2">
        <BotCard
          showTimer={isTimedGame}
          show={show}
          mutation={mutation}
          timerKey={boardKey}
          onTimeChange={setBotTime}
        />
        <div className="relative">
          <div className={classnames(isReviewMode && 'invisible')}>
            <GameBoard
              key={boardKey}
              handleGameOver={onGameOver}
              elo={botElo}
              fen={selectedPosition?.fen || constants.initialFen}
              playerColor={playerColor}
              orientation={playerColor}
              thinkTime={2000}
              onMove={onMove}
              openingLine={openingLine}
              timeControl={isTimedGame ? gameSettings.timeControl : null}
              playerTime={playerTime}
              botTime={botTime}
            />
          </div>
          {isReviewMode && (
            <div className="absolute inset-0">
              <NextChessground
                fen={current.fen}
                lastMove={current?.from && current?.to ? [current.from, current.to] : null}
                orientation={playerColor}
                viewOnly={true}
              />
            </div>
          )}
        </div>
        <UserCard
          showTimer={isTimedGame}
          show={show}
          mutation={mutation}
          timerKey={boardKey}
          onTimeChange={setPlayerTime}
        />
      </div>
      <div ref={targetRef} className="md:col-span-2 flex rounded-lg overflow-hidden flex-col">
        <div className="flex flex-col bg-secondary py-3 gap-3">
          <h3 className="text-white text-lg pt-2 mb-2 font-semibold text-center">
            Playing vs {botName}
          </h3>
          <BotMessageArea />
        </div>
        <div className="flex flex-col h-full overflow-hidden bg-secondary">
          <div className="relative flex flex-col flex-grow min-h-0">
            <div className="flex flex-col flex-grow min-h-0">
              <div className="overflow-y-auto min-h-0 flex-grow">
                <PgnTree tree={tree} autoScroll={true} current={current} onMoveClick={goToMoment} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-tertiary border-t border-b border-gray-700 flex items-center justify-between">
          <p className="text-sm text-white">
            {history.length === 0
              ? 'Starting position'
              : currentOpening?.name || 'Starting position'}
          </p>
          <i className="fas fa-book-atlas text-white text-sm"></i>
        </div>
        <GameBotActions
          show={show}
          onBackToSetup={handleBackToSetup}
          mutation={mutation}
          onPrevMove={goPrevMoment}
          onNextMove={goNextMoment}
          currentOpening={currentOpening}
        />
      </div>
      <GameOverModal isOpen={isOpen} hide={handleBackToSetup} onRematch={handleRematch} />
    </div>
  );
};

export default GamePlay;
