import { AddStudyChapterModal } from '@components/Modals';
import { StudySkeleton } from '@components/Study';
import { StudyProvider } from '@contexts';
import { useDisclosure, useWindowSize } from '@hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { StudyPageLayout, StudyPageLayoutLarge, StudyPageLayoutSmall } from '.';

const StudyPage = ({ index, data, status, refetch }) => {
  const router = useRouter();
  const { hide, isOpen, show } = useDisclosure();
  const { isMobile, isMd, is2xl } = useWindowSize();

  const [isJustCreated, setIsJustCreated] = useState(false);

  useEffect(() => {
    if (router.asPath.includes('#new') && status === 'success') {
      setIsJustCreated(true);
      show();
      const newUrl = router.asPath.split('#')[0];
      router.replace(newUrl, undefined, { shallow: true });
    }
  }, [router.asPath, status, show, router]);

  const handleHideModal = () => {
    setIsJustCreated(false);
    hide();
  };

  return (
    <StudyProvider study={data} index={index}>
      <div className="flex md:hidden w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' && isMobile && (
          <StudyPageLayoutSmall
            key={`study-small-${index}`}
            refetch={refetch}
            onAddChapter={show}
          />
        )}
      </div>
      <div className="hidden md:block 2xl:hidden w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' && isMd && (
          <StudyPageLayout key={`study-md-${index}`} refetch={refetch} onAddChapter={show} />
        )}
      </div>
      <div className="hidden 2xl:block w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' && is2xl && (
          <StudyPageLayoutLarge
            key={`study-large-${index}`}
            refetch={refetch}
            onAddChapter={show}
          />
        )}
      </div>
      <AddStudyChapterModal
        hide={handleHideModal}
        isOpen={isOpen}
        data={data}
        isJustCreated={isJustCreated}
        refetch={refetch}
      />
    </StudyProvider>
  );
};

export default StudyPage;
