import ThumbnailUpload from '@components/Forms/Admin/Courses/ThumbnailUpload';
import CourseDynamicPreviewCard from '@components/Fields/Admin/Courses/CourseDynamicPreviewCard';

const CourseThumbnailCard = () => {
  return (
    <div className="bg-secondary w-full p-4 lg:rounded-lg lg:p-6 h-full flex flex-col">
      <h2 className="border-b pb-2 text-white text-lg font-semibold">Course Thumbnail</h2>
      <div className="mt-4 w-68 mx-auto">
        <ThumbnailUpload label="" />
      </div>
      <div className="mt-6 flex-1 flex flex-col pb-0">
        <h3 className="text-white text-base font-semibold mb-3">Course Preview</h3>
        <CourseDynamicPreviewCard />
      </div>
    </div>
  );
};

export default CourseThumbnailCard;
