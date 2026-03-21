import { checkAuth, withAuth } from '@auth';
import { MultiplayerGame, MatchFoundAnimation } from '@components/Multiplayer';
import { Layout } from '@components/Client';
import { MultiplayerProvider, useMultiplayerContext } from '@contexts/MultiplayerContext';
import OnlineGameSetup from '@components/Multiplayer/OnlineGameSetup';

const PlayContent = () => {
  const { activeGame, matchFound } = useMultiplayerContext();

  if (matchFound) return <MatchFoundAnimation />;
  if (activeGame) return <MultiplayerGame />;
  return <OnlineGameSetup />;
};

const Page = () => (
  <Layout>
    <MultiplayerProvider>
      <PlayContent />
    </MultiplayerProvider>
  </Layout>
);

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
