import { StudySkeleton } from '@components/Study';
import { useWindowSize } from '@hooks';
import StudyLessonContent from './StudyLessonContent';

const StudyLessonResponsive = ({ status, layoutType, layoutProps }) => {
  const { isMobile, isMd, is2xl } = useWindowSize();

  if (status === 'loading') return <StudySkeleton type="loading" />;
  if (status === 'error') return <StudySkeleton type="error" />;

  return (
    <>
      {isMobile && (
        <div className="w-full">
          <StudyLessonContent size="small" layoutType={layoutType} layoutProps={layoutProps} />
        </div>
      )}
      {isMd && (
        <div className="w-full">
          <StudyLessonContent size="medium" layoutType={layoutType} layoutProps={layoutProps} />
        </div>
      )}
      {is2xl && (
        <div className="w-full">
          <StudyLessonContent size="large" layoutType={layoutType} layoutProps={layoutProps} />
        </div>
      )}
    </>
  );
};

export default StudyLessonResponsive;
