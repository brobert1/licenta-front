import { normalizeData } from '@functions';
import { useQuery } from '@hooks';
import { Bar } from 'react-chartjs-2';
import BarChartError from './BarChartError';
import BarChartLoading from './BarChartLoading';

const BarChart = () => {
  const { data: newUsersMonthlyData, status } = useQuery('/admin/monthly-clients');

  const options = {
    animation: { duration: 0 },
    barPercentage: 1,
    hover: { mode: null },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { drawOnChartArea: false, offset: false } },
      y: { beginAtZero: true, suggestedMax: 100 },
    },
  };

  // Only create data object if we have successfully loaded data
  const data =
    status === 'success' && newUsersMonthlyData
      ? {
          datasets: [
            {
              backgroundColor: '#CF2F7C',
              data: normalizeData(newUsersMonthlyData).map((item) => item[1]), // Use all values
            },
          ],
          labels: normalizeData(newUsersMonthlyData).map((item) => item[0]), // Use all labels
        }
      : { datasets: [], labels: [] };

  return (
    <>
      {status === 'loading' && <BarChartLoading />}
      {status === 'error' && <BarChartError />}
      {status === 'success' && (
        <div className="flex-1">
          <Bar data={data} height={256} options={options} />
        </div>
      )}
    </>
  );
};

export default BarChart;
