import { checkAuth, withAuth } from '@auth';
import { MatchFoundAnimation } from '@components/Multiplayer';
import { Layout } from '@components/Client';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import OnlineGameSetup from '@components/Multiplayer/OnlineGameSetup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PlayContent = () => {
  const { activeGame, matchFound } = useMultiplayerContext();
  const router = useRouter();

  useEffect(() => {
    if (activeGame) {
      router.push('/client/play/online');
    }
  }, [activeGame]);

  if (matchFound) return <MatchFoundAnimation />;
  if (activeGame) return null;
  return <OnlineGameSetup />;
};

const Page = () => (
  <Layout>
    <PlayContent />
  </Layout>
);

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
