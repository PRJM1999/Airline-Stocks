import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title);


const FleetSizeChart = (data: any) => {
  const chartData = {
    labels: Object.keys(data.data),
    datasets: [
      {
        label: 'Fleet Size',
        data: Object.values(data.data).map((item: any) => item.fleet_size),
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
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          precision: 0,
        },
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Total Fleet Size by Airline',
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'start',
        offset: 4,
        font: {
          size: 12,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="p-4 bg-white rounded shadow flex items-center justify-center">
      <Bar data={chartData} options={chartOptions} style={{minHeight: "50vh", maxWidth: "90vw"}}/>
    </div>
  );
};

export default FleetSizeChart;
