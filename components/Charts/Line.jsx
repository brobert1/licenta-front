import { normalizeData } from '@functions';
import { useQuery } from '@hooks';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import LineChartError from './LineChartError';
import LineChartLoading from './LineChartLoading';

ChartJS.register(...registerables);

const colors = ['#CF2F7C', '#f5f5f4', '#fafaf9'];

const Line = () => {
  const { data: salesMonthlyData, status } = useQuery('/admin/monthly-payments');
  const [chartData, setChartData] = useState({ datasets: [] });
  const chartRef = useRef(null);

  const options = {
    animation: { duration: 0 },
    cubicInterpolationMode: 'monotone',
    interaction: { intersect: false, mode: 'index' },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    pointStyle: false,
    responsive: true,
    scales: {
      x: {
        grid: { drawOnChartArea: false },
        ticks: { maxRotation: 50, minRotation: 50, color: '#78716c' },
        offset: true,
      },
      y: {
        beginAtZero: true,
        suggestedMax: 50,
        ticks: { color: '#78716c' },
      },
    },
  };

  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, colors[2]);
    gradient.addColorStop(1, colors[1]);
    return gradient;
  };

  useEffect(() => {
    // Only update if data has been successfully fetched and the chart ref is available
    if (status !== 'success' || !chartRef.current || !chartRef.current.chartArea) return;

    const normalizedData = normalizeData(salesMonthlyData);
    const values = normalizedData.map((item) => Number(item[1]));
    const max = Math.max(...values);
    const min = Math.min(...values);

    const dataset = {
      borderColor: colors[0],
      borderWidth: min === max && min === 0 ? 0 : 2,
      data: values,
      fill: false,
      backgroundColor: createGradient(chartRef.current.ctx, chartRef.current.chartArea),
    };

    const updatedChartData = {
      labels: normalizedData.map((item) => item[0]),
      datasets: [dataset],
    };

    setChartData(updatedChartData);
  }, [salesMonthlyData, status]);

  return (
    <>
      {status === 'loading' && <LineChartLoading />}
      {status === 'error' && <LineChartError />}
      {status === 'success' && (
        <div className="flex-1 bg-transparent">
          <Chart data={chartData} height={240} options={options} ref={chartRef} type="line" />
        </div>
      )}
    </>
  );
};

export default Line;
