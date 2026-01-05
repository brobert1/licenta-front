import { Button } from '@components';

const StatsFilters = ({ options, setOptions }) => {
  return (
    <div className="flex flex-col max-w-sm gap-4">
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Piece Color</label>
        <div className="flex gap-2">
          <Button
            onClick={() => setOptions({ color: 'white' })}
            className={`px-3 py-1.5 bg-neutral-700 rounded-md font-medium border-2 transition-colors text-sm ${
              options.color === 'white'
                ? 'text-neutral-100 border-accent'
                : 'text-neutral-300 border-neutral-600 hover:border-neutral-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              White
            </div>
          </Button>
          <Button
            onClick={() => setOptions({ color: 'black' })}
            className={`px-3 py-1.5 bg-neutral-700 rounded-md font-medium border-2 transition-colors text-sm ${
              options.color === 'black'
                ? 'text-neutral-100 border-accent'
                : 'text-neutral-300 border-neutral-600 hover:border-neutral-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-neutral-950 rounded-full"></div>
              Black
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsFilters;
