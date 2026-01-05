import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components/Client';
import { Checkbox } from '@components/Fields';

const Page = () => {
  return (
    <Layout>
      <div className="max w-full flex flex-col items-center gap-8">
        <div className="w-full  max-w-2xl flex flex-col gap-4">
          <h3 className="text-white text-3xl font-bold">Communication Preferences</h3>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-white">General Communication</p>
            <p className="text-grey text-sm font-medium">
              Get updates on courses, offers and your Member benefits.
            </p>
            <Checkbox value="green">
              <p className="text-grey font-medium">Yes, send me emails.</p>
            </Checkbox>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
