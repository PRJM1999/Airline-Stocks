import React from 'react';
import {Chart, CategoryScale, LinearScale, BarElement, BarController, Title} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, ChartDataLabels, Title);

interface Data {
  NumAirlines: number;
  Journeys: string;
  growth2030: string;
  marketSize: string;
}

interface BarChartProps {
  data: Data;
}

const NumAirlinesChart: React.FC<BarChartProps> = ({ data }) => {
    const chartData = {
      labels: [""],
      datasets: [
        {
          data: [data.NumAirlines],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions: any = {
        scales: {
          y: {
            display: true,
            max: 300,
            grid: {
              display: false,
            }
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Number of Airlines by Region',
          },
        },
        maintainAspectRatio: true,
        responsive: true,
    };
  
    return (
      <div className="p-4 bg-white rounded shadow flex items-center justify-center">
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  };
  
  export default NumAirlinesChart;