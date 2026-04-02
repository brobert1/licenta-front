import React from 'react';

const LineChartLoading = () => {
  return (
    <div className="flex-1 bg-transparent">
      <div className="h-60 w-full rounded-lg bg-secondary animate-pulse">
        <div className="h-full w-full flex items-center justify-center">
          <span className="text-muted">Loading chart data...</span>
        </div>
      </div>
    </div>
  );
};

export default LineChartLoading;
