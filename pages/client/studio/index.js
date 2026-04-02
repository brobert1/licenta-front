import { checkAuth, withAuth } from '@auth';
import { Breadcrumb, Button, Link } from '@components';
import { Layout } from '@components/Client';
import { AddStudyModal } from '@components/Modals';
import { StudiesList, StudiesListFilters } from '@components/Studio';
import { useState } from 'react';
import { useDisclosure } from '@hooks';

const Page = () => {
  const { hide, isOpen, show } = useDisclosure();
  const [options, setOptions] = useState({});

  return (
    <Layout>
      <div className="max w-full flex flex-col items-center gap-8 mt-4">
        <Breadcrumb title="All Chess Studies" page="Studies">
          <div className="flex gap-2">
            <Link
              href="/client/studio/trash"
              className="button w-full lg:w-max justify-center px-4 flex items-center gap-2 full
              secondary"
            >
              <i className="fa-solid fa-trash"></i>
              <p>View Trash</p>
            </Link>
            <Button
              onClick={show}
              className="button w-full lg:w-max justify-center px-4 flex items-center gap-2 full accent"
            >
              <i className="fa-solid fa-plus"></i>
              <p>Create study</p>
            </Button>
          </div>
        </Breadcrumb>
        <div className="w-full flex flex-col gap-4">
          <StudiesListFilters setOptions={setOptions} />
          <StudiesList options={options} />
        </div>
      </div>
      <AddStudyModal hide={hide} isOpen={isOpen} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
