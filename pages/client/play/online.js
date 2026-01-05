import { checkAuth, withAuth } from '@auth';
import { MultiplayerGame } from '@components/Multiplayer';
import { Layout } from '@components/Client';
import { MultiplayerProvider, useMultiplayerContext } from '@contexts/MultiplayerContext';
import OnlineGameSetup from '@components/Multiplayer/OnlineGameSetup';

const OnlinePlayContent = () => {
  const { activeGame } = useMultiplayerContext();

  if (activeGame) {
    return <MultiplayerGame />;
  }

  return <OnlineGameSetup />;
};

const Page = () => {
  return (
    <Layout>
      <MultiplayerProvider>
        <OnlinePlayContent />
      </MultiplayerProvider>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
