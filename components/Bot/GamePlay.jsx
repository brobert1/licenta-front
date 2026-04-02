import { GameBoard as DefaultGameBoard } from '@chess/components/Play';
import { useGamePlayModel } from '@hooks';
import GamePlayResponsive from './GamePlayResponsive';

const GamePlay = ({
  onEndGame,
  onClearResumeData,
  BoardComponent = DefaultGameBoard,
  isEngineReady,
  resumeData = null,
}) => {
  const model = useGamePlayModel({
    BoardComponent,
    isEngineReady,
    onClearResumeData,
    onEndGame,
    resumeData,
  });

  return <GamePlayResponsive model={model} />;
};

export default GamePlay;
