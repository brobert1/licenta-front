import { ActionModal, Button, Link, Plural } from '@components';
import { AddStudyModal } from '@components/Modals';
import { useDisclosure } from '@hooks';
import { useMutation } from '@hooks';
import { deleteCourse } from '@api/professor';
import { formatDate } from '@functions';
import Thumbnail from '@components/Thumbnail';
import CourseLessons from '@components/Course/CourseLessons';
import { useRouter } from 'next/router';
import { CourseActionsMenu } from '.';

const CoursePageContent = ({ data }) => {
  const lessons = data?.content?.filter((item) => item.kind === 'study') || [];
  const router = useRouter();

  const { isOpen, show, hide } = useDisclosure(false);
  const { isOpen: isAddStudyOpen, show: showAddStudy, hide: hideAddStudy } = useDisclosure(false);
  const { isOpen: isMenuOpen, hide: hideMenu, toggle: toggleMenu } = useDisclosure(false);

  const mutation = useMutation(deleteCourse, {
    invalidateQueries: '/professor/courses',
    redirectOnSuccess: '/professor/courses',
    successCallback: hide,
  });
  const handleDelete = () => mutation.mutateAsync(data?._id);

  const handleEdit = () => {
    hideMenu();
    router.push(`/professor/courses/${data?._id}/edit`);
  };

  const handleDeleteClick = () => {
    hideMenu();
    show();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 px-4 lg:flex-row lg:items-center lg:px-0">
          <div className="flex items-center gap-4">
            <Thumbnail
              icon={<i className="fa-solid fa-photo-film text-2xl"></i>}
              thumbnail={data?.image?.path}
              size="16"
            />
            <div>
              <h1 className="font-heading text-2xl text-white font-semibold">{data?.name}</h1>
              <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
                <div className="flex items-center gap-1">
                  <p className="text-gray-300">
                    <Plural count={lessons.length} one="Lesson" many="Lessons" />
                  </p>
                  <span className="text-gray-300">|</span>
                  <p className="text-gray-300 first-letter:uppercase">{data?.difficulty}</p>
                  <span className="text-gray-300">|</span>
                  <div className="flex text-gray-300 items-center">
                    <i className="fa-regular fa-calendar-days w-4" />
                    <p>{data?.createdAt ? formatDate(data.createdAt, 'MMM dd, yyyy') : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              type="button"
              className="button w-full sm:w-max justify-center px-4 flex items-center gap-2 full accent"
              onClick={showAddStudy}
            >
              <i className="fa-regular fa-plus" />
              <p>Add Lesson</p>
            </Button>
            <Link
              className="button w-full sm:w-max justify-center px-4 flex items-center gap-2 full secondary"
              href="/professor/studio/trash"
            >
              <i className="fa-solid fa-trash-can"></i>
              <p>View Trash</p>
            </Link>
            <div className="relative">
              <Button
                type="button"
                className="button w-10 h-10 justify-center flex items-center full secondary"
                onClick={toggleMenu}
              >
                <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
              </Button>
              {isMenuOpen && (
                <CourseActionsMenu
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  hide={hideMenu}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <CourseLessons id={data?._id} />
        </div>
      </div>
      <ActionModal
        cancelText="Back"
        confirmText="Delete"
        hide={hide}
        isLoading={mutation.isLoading}
        isOpen={isOpen}
        onConfirm={handleDelete}
        title="Delete confirmation"
        variant="danger"
      >
        <p className="text-white">
          Are you sure you want to delete <strong>{data?.name}</strong>?
        </p>
      </ActionModal>
      <AddStudyModal
        isOpen={isAddStudyOpen}
        hide={hideAddStudy}
        courseId={data?._id}
        courseName={data?.name}
      />
    </>
  );
};

export default CoursePageContent;
