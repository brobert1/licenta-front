import { saveGame } from '@api/client';
import { PgnTree } from '@chess/components/PgnViewer';
import { GameBoard } from '@chess/components/Play';
import { useChessContext } from '@chess/contexts';
import { useOpeningDetector, usePgnViewer } from '@chess/hooks';
import { BotCard, BotMessageArea, GameBotActions, UserCard } from '@components/Bot';
import { GameOverModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useDisclosure, useElementWidth, useMutation, useRerender } from '@hooks';
import { classnames } from '@lib';
import { constants, NextChessground } from 'next-chessground';
import { useState } from 'react';

const GamePlay = ({ onEndGame }) => {
  const { isOpen, show, hide } = useDisclosure();
  const [boardKey, rerender] = useRerender('game-board');
  const { ref: boardTrackRef, width: boardTrackWidth } = useElementWidth();

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
    <div className="bot-gameplay w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 h-full overflow-hidden p-6">
      <div className="md:col-span-3 h-full flex flex-col overflow-hidden">
        <div
          className={`flex flex-col gap-2 flex-1 min-h-0 max-w-full mx-auto ${
            boardTrackWidth > 0 ? '' : 'w-full'
          }`}
          style={boardTrackWidth > 0 ? { width: boardTrackWidth } : undefined}
        >
          <BotCard
            showTimer={isTimedGame}
            show={show}
            mutation={mutation}
            timerKey={boardKey}
            onTimeChange={setBotTime}
          />
          <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden w-full">
            <div
              ref={boardTrackRef}
              className="bot-gameplay-board h-full aspect-square max-w-full relative rounded-lg overflow-hidden"
            >
              <div className={classnames('h-full', isReviewMode && 'invisible')}>
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
          </div>
          <UserCard
            showTimer={isTimedGame}
            show={show}
            mutation={mutation}
            timerKey={boardKey}
            onTimeChange={setPlayerTime}
          />
        </div>
      </div>
      <div className="md:col-span-2 h-full flex flex-col rounded-xl overflow-hidden border border-black/10 bg-gameplay">
        <div className="px-5 pt-4 pb-3 border-b border-black/10 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-1">
            <i className="fa-regular fa-robot text-tertiary-container" />
            <h3 className="font-headline text-xl text-on-surface text-center">Playing vs {botName}</h3>
          </div>
          <BotMessageArea />
        </div>
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="relative flex flex-col flex-grow min-h-0">
            <div className="flex flex-col flex-grow min-h-0">
              <div className="overflow-y-auto min-h-0 flex-grow">
                <PgnTree
                  chrome="gameplay"
                  tree={tree}
                  autoScroll={true}
                  current={current}
                  onMoveClick={goToMoment}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gameplay-control flex items-center justify-between border-t border-black/10 shrink-0">
          <p className="font-landing text-sm text-on-surface">
            {history.length === 0
              ? 'Starting position'
              : currentOpening?.name || 'Starting position'}
          </p>
          <i className="fa-regular fa-book-atlas text-tertiary-container text-sm" />
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
