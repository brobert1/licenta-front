import { Button } from '@components';

const FilterButton = ({ active, onClick, children, className = '' }) => (
  <Button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md font-medium border transition-all text-sm flex items-center justify-center gap-2 ${
      active
        ? 'bg-accent/10 border-accent text-accent'
        : 'bg-tertiary border-tertiary text-gray-400 hover:border-gray-600 hover:text-gray-300'
    } ${className}`}
  >
    {children}
  </Button>
);

const StatsFilters = ({ options, setOptions }) => {
  const handleOptionChange = (key, value) => {
    setOptions((prev) => {
      const newOptions = { ...prev };
      if (value === 'all') {
        delete newOptions[key];
      } else {
        newOptions[key] = value;
      }
      return newOptions;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-secondary p-4 rounded-xl border border-white/5">
      {/* Game Type Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Game Type
        </label>
        <div className="flex gap-2">
          <FilterButton active={!options.type} onClick={() => handleOptionChange('type', 'all')}>
            All Games
          </FilterButton>
          <FilterButton
            active={options.type === 'bot'}
            onClick={() => handleOptionChange('type', 'bot')}
          >
            <i className="fa-regular fa-robot"></i>
            Vs Computer
          </FilterButton>
          <FilterButton
            active={options.type === 'live'}
            onClick={() => handleOptionChange('type', 'live')}
          >
            <i className="fa-solid fa-earth-americas"></i>
            Online
          </FilterButton>
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Piece Color
        </label>
        <div className="flex gap-2">
          <FilterButton active={!options.color} onClick={() => handleOptionChange('color', 'all')}>
            Any Color
          </FilterButton>
          <FilterButton
            active={options.color === 'white'}
            onClick={() => handleOptionChange('color', 'white')}
          >
            <div className="w-3 h-3 bg-white rounded-full"></div>
            White
          </FilterButton>
          <FilterButton
            active={options.color === 'black'}
            onClick={() => handleOptionChange('color', 'black')}
          >
            <div className="w-3 h-3 bg-black border border-white/20 rounded-full"></div>
            Black
          </FilterButton>
        </div>
      </div>
    </div>
  );
};

export default StatsFilters;
