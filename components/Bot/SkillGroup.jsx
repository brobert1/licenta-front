const SkillGroup = ({
  title,
  eloRange,
  eloColor = "text-gray-400",
  children
}) => {
  return (
    <div className="flex gap-2 flex-col p-3 bg-tertiary rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-white text-base">{title}</p>
        <p className={eloColor}>{eloRange}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );
};

export default SkillGroup;
