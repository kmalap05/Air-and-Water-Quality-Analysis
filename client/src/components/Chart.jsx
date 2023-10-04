import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

// eslint-disable-next-line react/prop-types
const Chart = ({ fieldId, fieldData, fieldName, fieldColor, width, height, xAxisLabel, yAxisLabel }) => {
  const data = {
    labels: fieldId,
    datasets: [
      {
        label: fieldName,
        data: fieldData,
        borderColor: fieldColor,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="max-w-xl m-7" style={{ width, height }}>
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default Chart;
