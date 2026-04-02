import { Link } from '@components';
import { classnames } from '@lib';
import { ChevronRight } from 'lucide-react';

const FeatureCardSubItem = ({ href, iconBg, Icon, iconClass, title, subtitle }) => (
  <Link
    href={href}
    className="flex items-center gap-4 px-4 py-3 w-full text-left hover:bg-hover transition-colors duration-150"
  >
    <div
      className={classnames(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
        iconBg ?? 'bg-surface-raised border border-border'
      )}
    >
      {Icon ? (
        <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
      ) : (
        <i className={classnames('fas text-primary', iconClass)} />
      )}
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="font-bold text-primary text-sm">{title}</h4>
      <p className="text-muted text-xs">{subtitle}</p>
    </div>
    <ChevronRight className="h-4 w-4 shrink-0 text-grey" strokeWidth={2} aria-hidden />
  </Link>
);

export default FeatureCardSubItem;
