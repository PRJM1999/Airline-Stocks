import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import annotationPlugin from "chartjs-plugin-annotation";
import historicdata from '../../public/assets/historicaltrends.json';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin,
);





const data = {
  labels: historicdata.year,
  datasets: [
    {
      label: "Oil Price",
      data: historicdata.oilindex,
      fill: false,
      borderColor: "red",
    },
    {
      label: "Dow Jones Aviation Index",
      data: historicdata.dowaviationindex,
      fill: false,
      borderColor: "blue"
    },
    {
      label: "US GDP INDEX",
      data: historicdata.usgdpindex,
      fill: false,
      borderColor: "green"
    }
  ]
};

const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            display: false,
        },
        tooltips : {
            enabled: true,
        },
        legend: {
            display: true,
            position: 'bottom',
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    xMin: 11,
                    xMax: 11,
                    borderColor: 'black',
                    borderWidth: 2,
                    label: {
                        content: '9/11',
                        enabled: true,
                    },
                },
                {
                    type: 'line',
                    mode: 'vertical',
                    xMin: 18,
                    xMax: 18,
                    borderColor: 'black',
                    borderWidth: 2,
                },
                {
                    type: 'line',
                    mode: 'vertical',
                    xMin: 30,
                    xMax: 30,
                    borderColor: 'black',
                    borderWidth: 2,
                },
            ],
        },
    },
};

const IndustryGraph = () => {
  return (
    <div style={{minHeight: "40vh"}}>
      <Line data={data} options={options} />
    </div>
  );
};

export default IndustryGraph;
