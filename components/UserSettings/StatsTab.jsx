import { Stats, StatsFilters } from '@components/Bot';
import { useState } from 'react';

const StatsTab = () => {
  const [options, setOptions] = useState({ color: 'white' });

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl pb-12">
      <StatsFilters options={options} setOptions={setOptions} />
      <Stats options={options} />
    </div>
  );
};

export default StatsTab;
