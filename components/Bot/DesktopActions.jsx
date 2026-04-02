import GameBotActions from './GameBotActions';
import PostGameActions from './PostGameActions';

const DesktopActions = ({ actions, game, review }) => {
  if (game.gameWinner) {
    return (
      <PostGameActions
        onNewBot={actions.handleBackToSetup}
        onRematch={actions.handleRematch}
        onPrevMove={review.goPrevMoment}
        onNextMove={review.goNextMoment}
      />
    );
  }

  return (
    <GameBotActions
      currentOpening={game.currentOpening}
      mutation={game.mutation}
      onNextMove={review.goNextMoment}
      onPrevMove={review.goPrevMoment}
      onTakeback={actions.handleTakeback}
    />
  );
};

export default DesktopActions;
