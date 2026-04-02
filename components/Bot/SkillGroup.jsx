import { classnames } from '@lib';

const SkillGroup = ({ title, eloRange, eloColor = 'text-muted', children }) => {
  return (
    <div className="flex gap-2 flex-col p-3 bg-secondary rounded-md">
      <div className="flex items-center justify-between">
        <p className={classnames(eloColor, 'text-base font-medium')}>{title}</p>
        <p className={classnames(eloColor, 'font-medium text-sm')}>{eloRange}</p>
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-2 md:grid-cols-4 md:gap-3">{children}</div>
    </div>
  );
};

export default SkillGroup;
