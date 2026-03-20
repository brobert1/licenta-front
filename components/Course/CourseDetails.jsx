import { useProfile, useQuery } from '@hooks';
import CourseDetailsSkeleton from './CourseDetailsSkeleton';
import CourseDetailsSuccess from './CourseDetailsSuccess';

const CourseDetails = ({ id, showAllReviews = false, success, isPreview }) => {
  const { me } = useProfile();
  const endpoint = isPreview
    ? me?.role === 'professor'
      ? '/professor/courses'
      : '/admin/courses'
    : '/client/courses';
  const { data, status, refetch } = useQuery(`${endpoint}/${id}`);

  // Transform admin response to match client response format
  const transformedData =
    isPreview && data
      ? {
          course: {
            ...data,
            reviews: [],
            rating: '0.00',
          },
          user: {
            _id: null,
            isReviewer: false,
            review: null,
            isOwned: false,
          },
        }
      : data;

  return (
    <>
      {status === 'error' && <CourseDetailsSkeleton type="error" />}
      {status === 'loading' && <CourseDetailsSkeleton type="loading" />}
      {status === 'success' && (
        <CourseDetailsSuccess
          data={transformedData}
          refetch={refetch}
          success={success}
          showAllReviews={showAllReviews}
          isPreview={isPreview}
        />
      )}
    </>
  );
};

export default CourseDetails;
