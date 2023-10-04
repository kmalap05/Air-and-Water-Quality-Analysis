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
const Chart = ({ fieldId, fieldData, fieldName, fieldColor }) => {
  const data = {
    labels: fieldId,
    datasets: [
      {
        label: fieldName,
        data: fieldData,
        borderColor: fieldColor,
        fill: 'true',
        tension: 0.0
      }
    ]
  };

  const options = {
    plugins: {
      legend: true
    },
    scales: {
      y: {}
    }
  };

  return (
    <div className="m-7 max-h-72">
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default Chart;
