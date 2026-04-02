import { checkGuest } from '@auth';
import { Layout, OpenGraph } from '@components';
import GuestQuiz from '@components/Guest/GuestQuiz';

const Page = ({ score, total }) => {
  const quizShareMeta =
    score != null
      ? {
          imageUrl: `${process.env.APP_BASE_URL}/og/quiz-result?score=${score}&total=${total}`,
          title: `I scored ${score}/${total} — can you beat me?`,
        }
      : null;

  return (
    <Layout variant="guest">
      {quizShareMeta && (
        <OpenGraph
          title={quizShareMeta.title}
          description="Test your chess knowledge with this quick quiz from Rook'N'Learn!"
          image={quizShareMeta.imageUrl}
        />
      )}
      <GuestQuiz />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const result = await checkGuest(context);
  if (result.redirect) return result;

  const { score, total } = context.query;
  const parsedScore = parseInt(score);
  const parsedTotal = parseInt(total);
  return {
    props: {
      ...(!isNaN(parsedScore) && !isNaN(parsedTotal) && {
        score: Math.max(0, parsedScore),
        total: Math.max(1, parsedTotal),
      }),
    },
  };
}

export default Page;
