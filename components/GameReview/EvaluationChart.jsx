import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables);

const MIN_RANGE = 3;

// Parse evaluation values: numbers stay as-is, mate strings like "+M13"/"-M5" become ±mateCap
// M0 (checkmate delivered) inherits the sign of the previous evaluation to avoid chart spikes
const parseEval = (val, mateCap, prevParsed) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const mateMatch = val.match(/^([+-])M(\d+)$/);
    if (mateMatch) {
      const movesToMate = parseInt(mateMatch[2], 10);
      if (movesToMate === 0 && prevParsed !== undefined) {
        // Game over — keep the same direction as the previous position
        return prevParsed < 0 ? -mateCap : mateCap;
      }
      return mateMatch[1] === '+' ? mateCap : -mateCap;
    }
  }
  return 0;
};

const formatEval = (original) => {
  if (typeof original === 'string') return original;
  return original > 0 ? `+${original.toFixed(2)}` : original.toFixed(2);
};

const EvaluationChart = ({ evaluations }) => {
  if (!evaluations || evaluations.length === 0) return null;

  // Find the largest absolute numeric value to use as the base for mate cap
  const maxNumeric = evaluations.reduce((max, v) => {
    if (typeof v === 'number') return Math.max(max, Math.abs(v));
    return max;
  }, 0);
  const mateCap = Math.ceil(maxNumeric) + 2;

  const parsed = evaluations.map((v, i, arr) => {
    const prev = i > 0 ? parseEval(arr[i - 1], mateCap) : undefined;
    return parseEval(v, mateCap, prev);
  });
  const maxAbs = parsed.reduce((max, v) => Math.max(max, Math.abs(v)), 0);
  const range = Math.max(MIN_RANGE, Math.ceil(maxAbs));

  const data = {
    labels: evaluations.map((_, i) => i),
    datasets: [
      {
        data: parsed,
        borderColor: '#CF2F7C',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#CF2F7C',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        fill: {
          target: 'origin',
          above: 'rgba(45, 212, 191, 0.08)',
          below: 'rgba(45, 212, 191, 0.08)',
        },
      },
    ],
  };

  const options = {
    animation: { duration: 0 },
    maintainAspectRatio: false,
    responsive: true,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#f9fafb',
        titleColor: '#0f172a',
        bodyColor: '#CF2F7C',
        borderColor: '#f9fafb',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: () => null,
          label: (item) => formatEval(evaluations[item.dataIndex]),
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: -range,
        max: range,
      },
    },
  };

  const zeroLinePlugin = {
    id: 'zeroLine',
    beforeDraw: (chart) => {
      const { ctx, chartArea, scales } = chart;
      const yZero = scales.y.getPixelForValue(0);

      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(chartArea.left, yZero);
      ctx.lineTo(chartArea.right, yZero);
      ctx.stroke();
      ctx.restore();
    },
  };

  return (
    <div className="px-4 py-3">
      <div className="bg-tertiary rounded-lg p-2 overflow-hidden" style={{ height: 100 }}>
        <Line data={data} options={options} plugins={[zeroLinePlugin]} />
      </div>
    </div>
  );
};

export default EvaluationChart;
