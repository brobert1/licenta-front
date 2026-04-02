import { checkGuest } from '@auth';
import { Layout } from '@components';
import { GameReviewFromPgn } from '@components/GameReview';
import { clearLastGame, loadLastGame } from '@functions/bot-game-persistence';
import { useEffect, useState } from 'react';

const Page = ({ shouldLoadSavedGame }) => {
  const [initialGame, setInitialGame] = useState(undefined);

  useEffect(() => {
    if (!shouldLoadSavedGame) {
      setInitialGame(null);
      return;
    }

    const game = loadLastGame('guest');
    setInitialGame(game);
    if (game) clearLastGame('guest');
  }, [shouldLoadSavedGame]);

  if (initialGame === undefined) return null;

  return (
    <Layout variant="guest">
      <GameReviewFromPgn isGuest={true} initialGame={initialGame} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const authResult = await checkGuest(context);

  if (authResult.redirect) return authResult;

  return {
    ...authResult,
    props: {
      ...authResult.props,
      shouldLoadSavedGame: context.query.source === 'last-bot-game',
    },
  };
}

export default Page;
