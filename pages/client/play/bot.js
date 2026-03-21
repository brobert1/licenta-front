import { checkAuth, withAuth } from '@auth';
import { GamePlay, GameSetup } from '@components/Bot';
import { Layout } from '@components/Client';
import { BotProvider } from '@contexts/BotContext';
import { ChessProvider } from '@chess/contexts/ChessContext';
import { useGameDisclosure } from '@chess/hooks';

const Page = () => {
  const { isPlaying, startGame, endGame } = useGameDisclosure();

  return (
    <Layout type="small">
      <ChessProvider>
        <BotProvider>
          {isPlaying ? <GamePlay onEndGame={endGame} /> : <GameSetup onStartGame={startGame} />}
        </BotProvider>
      </ChessProvider>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
