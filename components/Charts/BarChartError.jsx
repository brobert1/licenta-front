import React from 'react';

const BarChartError = () => {
  return (
    <div className="flex-1 bg-transparent">
      <div className="h-60 w-full rounded-lg bg-secondary animate-pulse">
        <div className="h-full w-full flex items-center justify-center">
          <span className="text-red-500">Failed to load chart data</span>
        </div>
      </div>
    </div>
  );
};

export default BarChartError;
