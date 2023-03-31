import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Title} from 'chart.js';

Chart.register(ArcElement, Title);


interface Data {
  NumAirlines: number;
  Journeys: string;
  growth2030: string;
  marketSize: string;
}

interface DoughnutChartProps {
  data: Data;
}

const GrowthDoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const growthData = data.growth2030.split(',').map((value: string) => parseInt(value));
  const remainingValue = 100 - growthData.reduce((a, b) => a + b, 0);
  growthData.push(remainingValue);

  const chartData = {
    datasets: [
      {
        data: growthData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255,1)',
          'rgba(255,159,64 ,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: any = {
    plugins: {
      title: {
        display: true,
        text: 'Market Growth by 2030 %',
      },
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value: any, context: any) => {
          if (context.dataIndex === 0) {
            return value;
          } else {
            return null;
          }
        },
      }
    },
    maintainAspectRatio: true,
    responsive: true,
};

return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center">
      <Doughnut data={chartData} options={chartOptions} style={{maxHeight: "100%"}}/>
    </div>
);
};

export default GrowthDoughnutChart;