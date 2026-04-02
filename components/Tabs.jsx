import { classnames } from '@lib';

const Tabs = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={classnames('flex w-full gap-8 border-b border-tertiary', className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={classnames(
            'relative pb-3 text-sm font-medium transition-colors',
            activeTab === tab ? 'text-primary' : 'text-grey hover:text-primary'
          )}
          onClick={() => onChange(tab)}
        >
          {tab}
          {activeTab === tab && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" />}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
