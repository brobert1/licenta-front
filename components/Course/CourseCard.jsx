import { Plural } from '@components';
import { DashboardCardButtons } from '@components/Client';
import { calculateCoursePricing, stripTags } from '@functions';
import { classnames } from '@lib';
import { size } from 'lodash';

const CourseCard = ({ name, preview, author, tags, content, active, ...props }) => {
  const lessons = content?.filter((i) => i.kind === 'study');
  const isInactive = !active;
  const { percentOff, endsIn } = calculateCoursePricing(props);

  return (
    <div
      className={classnames(
        'flex lg:flex-row flex-col bg-secondary p-3.5 lg:p-5 rounded-xl gap-4 relative',
        isInactive && 'border-2 border-dashed border-gray-600 opacity-60'
      )}
    >
      <div className="lg:block hidden overflow-hidden w-40 aspect-square rounded-lg flex-shrink-0 relative">
        <img src={preview?.image?.path} alt={name} className="w-full h-full object-cover" />
        {props?.sale?.isActive && (
          <span className="absolute top-2 left-2 rounded-full bg-red-600/80 text-white text-[10px] font-semibold px-2 py-0.5">
            Save {percentOff}%
          </span>
        )}
      </div>
      <div className="flex flex-col justify-between gap-4 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <div className="lg:hidden overflow-hidden w-16 aspect-square rounded-lg flex-shrink-0 relative">
              <img src={preview?.image?.path} alt={name} className="w-full h-full object-cover" />
              {props?.sale?.isActive && (
                <span className="absolute top-1 left-1 rounded-full bg-red-600/80 text-white text-[9px] font-semibold px-1.5 py-0.5">
                  -{percentOff}%
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-lg lg:text-xl font-semibold ">{name}</h2>
              {props?.sale?.isActive && (
                <div className="flex flex-wrap items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded-md bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 px-1.5 py-0.5 text-[10px] font-semibold">
                    <i className="fa-solid fa-bolt" /> Limited Time Sale
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-red-600/10 text-red-300 border border-red-600/40 px-1.5 py-0.5 text-[10px] font-semibold">
                    <i className="fa-solid fa-percent" /> {percentOff}% off
                  </span>
                  {endsIn && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-600/10 text-blue-300 border border-blue-600/40 px-1.5 py-0.5 text-[10px] font-semibold">
                      <i className="fa-regular fa-clock" /> Ends in {endsIn}
                    </span>
                  )}
                </div>
              )}
              <div className="flex lg:hidden items-center gap-2">
                <span className="bg-accent text-white text-xs font-bold py-0.5 px-1 rounded-sm">
                  {author?.title}
                </span>
                <p className="font-semibold text-sm text-white">{author?.name}</p>
              </div>
            </div>
          </div>
          <div className="line-clamp-3 overflow-hidden">
            <p className="text-grey font-medium text-sm">{stripTags(preview?.description)}</p>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="bg-accent text-white text-xs font-bold py-0.5 px-1 rounded-sm">
              {author?.title}
            </span>
            <p className="font-semibold text-sm text-white">{author?.name}</p>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <i className="fa-regular fa-graduation-cap"></i>
              <p className="capitalize">
                <Plural count={size(lessons)} one="lesson" many="lessons" />
              </p>
            </div>
          </div>
        </div>
        <DashboardCardButtons active={active} {...props} />
      </div>
    </div>
  );
};

export default CourseCard;
