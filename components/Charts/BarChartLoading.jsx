import React from 'react';

const BarChartLoading = () => {
  return (
    <div className="flex-1 bg-transparent">
      <div className="h-[240px] w-full rounded-lg bg-gray-800 animate-pulse">
        <div className="h-full w-full flex items-center justify-center">
          <span className="text-gray-500">Loading chart data...</span>
        </div>
      </div>
    </div>
  );
};

export default BarChartLoading;
