import { PgnTree } from '@chess/components/PgnViewer';
import BotGameResultBanner from './BotGameResultBanner';
import BotMessageArea from './BotMessageArea';
import DesktopActions from './DesktopActions';
import OpeningFooter from './OpeningFooter';

const DesktopSidebar = ({ actions, game, review, targetRef }) => {
  return (
    <div
      ref={targetRef}
      className="col-span-2 flex flex-col rounded-lg overflow-hidden border border-border shadow-sm"
    >
      <div className="flex flex-col bg-surface border-b border-border py-4 gap-3">
        <h3 className="text-primary text-xl font-heading font-semibold text-center mb-1">
          Playing vs {game.botName}
        </h3>
        <BotMessageArea />
      </div>
      <div className="flex flex-col h-full overflow-hidden bg-secondary relative">
        <div className="relative flex flex-col flex-grow min-h-0">
          <div className="flex flex-col flex-grow min-h-0">
            <div className="min-h-0 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <PgnTree
                tree={review.tree}
                autoScroll={true}
                current={review.current}
                onMoveClick={review.goToMoment}
              />
            </div>
            {game.gameWinner && <BotGameResultBanner />}
          </div>
        </div>
      </div>
      <OpeningFooter
        currentOpening={game.currentOpening}
        history={game.history}
        resumedOpeningName={game.resumedOpeningName}
      />
      <DesktopActions actions={actions} game={game} review={review} />
    </div>
  );
};

export default DesktopSidebar;
