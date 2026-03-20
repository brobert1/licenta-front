import { Bar } from 'react-chartjs-2';
import { normalizeData } from '../../functions';
import { useQuery } from '@hooks';
import BarChartLoading from './BarChartLoading';
import BarChartError from './BarChartError';

const BarChart = ({ endpoint = '/admin/monthly-clients' }) => {
  const { data: newUsersMonthlyData, status } = useQuery(endpoint);

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
              backgroundColor: '#FFFFFF',
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
