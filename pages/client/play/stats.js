import { checkAuth, withAuth } from '@auth';
import { Breadcrumb } from '@components';
import { Stats, StatsFilters } from '@components/Bot';
import { Layout } from '@components/Client';
import { useState } from 'react';

const Page = () => {
  const [options, setOptions] = useState({ color: 'white' });

  return (
    <Layout>
      <div className="w-full flex flex-col gap-6 pb-12 mx-auto">
        <Breadcrumb title="Chess Statistics" page="Play" />
        <StatsFilters options={options} setOptions={setOptions} />
        <Stats options={options} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
