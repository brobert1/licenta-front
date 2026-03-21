import { checkAuth, withAuth } from '@auth';
import { MultiplayerGame, MatchFoundAnimation } from '@components/Multiplayer';
import { Layout } from '@components/Client';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const GameLoadingSkeleton = () => (
  <div className="grid w-full h-full grid-cols-1 gap-4 overflow-hidden p-6 md:grid-cols-5 md:gap-6 animate-pulse">
    {/* Board column */}
    <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden md:col-span-3">
      {/* Opponent card */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-9 h-9 rounded-full bg-surface-container-high" />
        <div className="flex flex-col gap-1.5">
          <div className="w-28 h-3 rounded bg-surface-container-high" />
          <div className="w-16 h-2.5 rounded bg-surface-container-high" />
        </div>
        <div className="ml-auto w-14 h-8 rounded-lg bg-surface-container-high" />
      </div>
      {/* Board */}
      <div className="flex-1 min-h-0 flex items-center justify-center w-full">
        <div className="h-full aspect-square max-w-full rounded-lg bg-surface-container-high" />
      </div>
      {/* Player card */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-9 h-9 rounded-full bg-surface-container-high" />
        <div className="flex flex-col gap-1.5">
          <div className="w-24 h-3 rounded bg-surface-container-high" />
          <div className="w-16 h-2.5 rounded bg-surface-container-high" />
        </div>
        <div className="ml-auto w-14 h-8 rounded-lg bg-surface-container-high" />
      </div>
    </div>

    {/* Side panel */}
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-black/10 bg-gameplay md:col-span-2">
      {/* Tabs */}
      <div className="flex shrink-0 border-b border-black/10 p-3 gap-2">
        <div className="flex-1 h-8 rounded-lg bg-surface-container-high" />
        <div className="flex-1 h-8 rounded-lg bg-surface-container-high" />
      </div>
      {/* Move list area */}
      <div className="flex-1 p-4 flex flex-col gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-6 h-3 rounded bg-surface-container-high" />
            <div className="flex-1 h-3 rounded bg-surface-container-high" />
            <div className="flex-1 h-3 rounded bg-surface-container-high" />
          </div>
        ))}
      </div>
      {/* Action buttons */}
      <div className="shrink-0 p-3 border-t border-black/10 flex gap-2">
        <div className="flex-1 h-10 rounded-lg bg-surface-container-high" />
        <div className="flex-1 h-10 rounded-lg bg-surface-container-high" />
        <div className="w-10 h-10 rounded-lg bg-surface-container-high" />
        <div className="w-10 h-10 rounded-lg bg-surface-container-high" />
      </div>
    </div>
  </div>
);

const PlayOnlineContent = () => {
  const { activeGame, matchFound } = useMultiplayerContext();

  if (matchFound) return <MatchFoundAnimation />;
  if (activeGame) return <MultiplayerGame />;
  return <GameLoadingSkeleton />;
};

const Page = () => (
  <Layout type="small">
    <PlayOnlineContent />
  </Layout>
);

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
