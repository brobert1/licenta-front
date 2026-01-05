import { checkAuth, withAuth } from '@auth';
import { NoSsr } from '@components';
import { Layout } from '@components/Client';
import { NextChessground } from 'next-chessground';

const Page = () => {
  return (
    <Layout>
      <div className="max-w-6xl w-full flex flex-col items-center gap-8">
        <h2 className="text-white text-xl font-semibold mb-2">Chess Board Settings</h2>
        <div id="chess-settings" className="w-full max-w-lg">
          <NoSsr>
            <NextChessground />
          </NoSsr>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
