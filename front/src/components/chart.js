import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//Componente de grafica de barras
export const BarChart = ({ chartData }) => {
  if(JSON.stringify(chartData)!=='{}'){
    return (
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,           
            plugins: {
              title: {
                display: true,
                text: "Uso de memoria"
              },
              legend: {
                display: false,
                position: "bottom"
              }
            }
          }}
        />
      </div>
    );
  }
};