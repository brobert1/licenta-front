import { useState } from 'react';
import { Button, Link } from '@components';
import { useDisclosure } from '@hooks';
import { classnames } from '@lib';
import { ChevronRight } from 'lucide-react';
import FeatureCardSubItem from './FeatureCardSubItem';

const featureIconClass = 'h-6 w-6 shrink-0 text-white';

const FeatureCard = ({ href, iconBg, Icon, iconClass, subtitle, title, subItems, disabled }) => {
  const { isOpen, show, hide } = useDisclosure();
  const [isClosing, setIsClosing] = useState(false);
  const isExpandable = subItems && subItems.length > 0;

  const handleToggle = () => {
    if (isOpen && !isClosing) {
      setIsClosing(true);
    } else if (!isOpen) {
      show();
    }
  };

  const handleCollapseEnd = () => {
    setIsClosing(false);
    hide();
  };

  if (isExpandable) {
    return (
      <div
        className={classnames(
          'rounded-xl bg-surface shadow-sm w-full overflow-hidden',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Button
          onClick={disabled ? undefined : handleToggle}
          className={classnames(
            'flex items-center gap-4 p-4 w-full text-left',
            disabled && 'pointer-events-none'
          )}
        >
          <div
            className={classnames(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
              iconBg
            )}
          >
            {Icon ? (
              <Icon className={featureIconClass} strokeWidth={2} aria-hidden />
            ) : (
              <i className={classnames('fas text-white text-xl', iconClass)} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-primary text-base">{title}</h3>
            <p className="text-muted text-sm">{subtitle}</p>
          </div>
          <ChevronRight
            className={classnames(
              'h-5 w-5 shrink-0 text-grey',
              isOpen && !isClosing
                ? 'animate-chevron-rotate'
                : isClosing
                  ? 'animate-chevron-rotate-back'
                  : ''
            )}
            strokeWidth={2}
            aria-hidden
          />
        </Button>
        {isOpen && (
          <div
            className={classnames(
              'border-t border-border divide-y divide-border overflow-hidden',
              isClosing ? 'animate-post-game-collapse' : 'animate-post-game-expand'
            )}
            onAnimationEnd={isClosing ? handleCollapseEnd : undefined}
          >
            {subItems.map((item, index) => (
              <div
                key={item.title}
                className={classnames(
                  isClosing ? 'animate-text-fade-down' : 'animate-text-fade-up'
                )}
                style={{ animationDelay: isClosing ? '0ms' : `${index * 50}ms` }}
              >
                <FeatureCardSubItem {...item} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={classnames(
        'flex items-center gap-4 rounded-xl bg-surface p-4 shadow-sm w-full text-left',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <div
        className={classnames(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
          iconBg
        )}
      >
        {Icon ? (
          <Icon className={featureIconClass} strokeWidth={2} aria-hidden />
        ) : (
          <i className={classnames('fas text-white text-xl', iconClass)} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-primary text-base">{title}</h3>
        <p className="text-muted text-sm">{subtitle}</p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-grey" strokeWidth={2} aria-hidden />
    </Link>
  );
};

export default FeatureCard;
