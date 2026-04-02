import { Button } from '@components';
import { classnames } from '@lib';

const ThreatButton = ({ disabled, isMobile = false, isActive, onToggle }) => {
  return (
    <Button
      className={classnames('button mini tertiary', isActive ? 'bg-gray-600' : 'bg-tertiary')}
      onClick={onToggle}
      disabled={disabled}
    >
      {!isMobile && <span className="text-xs lg:text-sm font-semibold mr-2">Threat</span>}
      <i className="fa-solid fa-bullseye"></i>
    </Button>
  );
};

export default ThreatButton;
