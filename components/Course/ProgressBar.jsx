import { Plural } from '@components';

const ProgressBar = ({ completedCount, totalCount, one, many }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="flex gap-2 items-center">
        <span className="text-xs text-white">
          {completedCount || 0}/
          <Plural one={one} many={many} count={totalCount} />
        </span>
        {completedCount === totalCount && (
          <i className="fa-sharp fa-solid fa-circle-check text-green-400 text-sm"></i>
        )}
      </p>
      <div className="flex w-full h-3 overflow-hidden rounded-full bg-tertiary">
        <span
          className="bg-accent"
          style={{
            width: `${(completedCount / (totalCount || 1)) * 100}%`,
          }}
        ></span>
      </div>
    </div>
  );
};

export default ProgressBar;
