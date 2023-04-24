import { Chart, ChartOptions } from "chart.js";
import { ChartConfiguration } from "chart.js/auto";
import {
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartData,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line as LineChart } from "react-chartjs-2";

interface LineProps {
  color: string;
}

export default function Line({ color }: LineProps) {
  console.log(color);
  Chart.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend
  );

  const data: ChartData<"line"> = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    datasets: [
      {
        label: "Customers",
        data: [165, 159, 80, 41, 101, 15, 10],
        backgroundColor: color + 80, // Green
        borderColor: color,
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {},
    },
    scales: {
      x: {
        display: true,
        beginAtZero: true,
        ticks: {
          font: {
            family: "Poppins",
            size: 14,
            weight: "normal",
          },
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        ticks: {
          font: {
            family: "Poppins",
            size: 13,
            weight: "normal",
          },
        },
      },
    },
  };

  return <LineChart options={options} data={data} />;
}
