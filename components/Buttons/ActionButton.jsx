import { Tooltip } from "@components";
import { classnames } from "@lib";

const ActionButton = ({ extraClass, icon, onClick, tooltipText, ...props }) => (
  <div className="relative inline-block">
    <button
      className={classnames(
        'flex h-7 w-7 items-center justify-center rounded-full text-lg focus:outline-none',
        extraClass
      )}
      onClick={onClick}
      {...props}
    >
      {tooltipText && (
        <Tooltip icon={icon} placement="top">
          {tooltipText}
        </Tooltip>
      )}
    </button>
  </div>
);

export default ActionButton;
