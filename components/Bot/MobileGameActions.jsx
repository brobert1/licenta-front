import { useGameActionControls } from '@hooks';
import MobileActionBar from './MobileActionBar';
import GameResignModal from './GameResignModal';
import MobileInGameActions from './MobileInGameActions';
import MobilePostGameActions from './MobilePostGameActions';

const MobileGameActions = ({ currentOpening, mutation, onNewBot, onRematch, onTakeback }) => {
  const controls = useGameActionControls({ currentOpening, mutation });

  return (
    <>
      <MobileActionBar ariaLabel={controls.isPostGame ? 'Post-game actions' : 'Game actions'}>
        {controls.isPostGame ? (
          <MobilePostGameActions
            canReviewGame={controls.canReviewGame}
            canShareGame={controls.canShareGame}
            isGuest={controls.isGuest}
            onCopyPgn={controls.handleCopyPgn}
            onDownload={controls.handleDownloadPgn}
            onNewBot={onNewBot}
            onRematch={onRematch}
            onShare={controls.handleShare}
            reviewHref={controls.reviewHref}
          />
        ) : (
          <MobileInGameActions
            canTakeback={controls.canTakeback}
            onResign={controls.openResignModal}
            onTakeback={onTakeback}
          />
        )}
      </MobileActionBar>
      <GameResignModal
        isOpen={controls.isResignModalOpen}
        onClose={controls.hideResignModal}
        onConfirm={controls.handleResignConfirm}
      />
    </>
  );
};

export default MobileGameActions;
