import Bone from '../Bone';

const StudyCardSkeleton = ({ type }) => {
  return (
    <div className="flex flex-col cursor-pointer group gap-4 bg-secondary p-3 lg:p-4 rounded-lg lg:rounded-xl overflow-hidden shadow-md">
      <div className="grid grid-cols-6 lg:grid-cols-8 gap-4 items-center">
        <div className="w-full hidden object-contain rounded-md"></div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-tertiary rounded"></div>
        </div>
        <div className="col-span-5 lg:col-span-7 flex lg:gap-0.5 flex-col">
          <div className="flex justify-between items-start gap-4">
            <Bone type={type} extraClass="h-5 lg:h-6 w-3/4" />
          </div>
          <div className="flex flex-row gap-1 items-center text-grey text-xs">
            <Bone type={type} extraClass="h-3 w-12" />
            <p>|</p>
            <Bone type={type} extraClass="h-3 w-16" />
          </div>
        </div>
      </div>
      <Bone type={type} extraClass="h-3 w-4/5" />
      <Bone type={type} extraClass="h-3 w-4/5" />
      <Bone type={type} extraClass="h-3 w-4/5" />
    </div>
  );
};

export default StudyCardSkeleton;
