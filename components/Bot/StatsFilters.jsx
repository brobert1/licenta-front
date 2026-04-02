import { Button } from '@components';

const StatsFilters = ({ options, setOptions }) => {
  return (
    <div className="flex flex-col max-w-sm gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-primary">Piece Color</label>
        <div className="flex gap-2">
          <Button
            onClick={() => setOptions({ color: 'white' })}
            className={`rounded-md border-2 px-3 py-1.5 text-sm font-medium transition-colors ${
              options.color === 'white'
                ? 'border-accent bg-tertiary text-primary'
                : 'border-tertiary bg-tertiary text-muted hover:border-grey'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              White
            </div>
          </Button>
          <Button
            onClick={() => setOptions({ color: 'black' })}
            className={`rounded-md border-2 px-3 py-1.5 text-sm font-medium transition-colors ${
              options.color === 'black'
                ? 'border-accent bg-tertiary text-primary'
                : 'border-tertiary bg-tertiary text-muted hover:border-grey'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              Black
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsFilters;
