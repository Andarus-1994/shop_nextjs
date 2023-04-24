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
import { Bar as BarChart } from "react-chartjs-2";

interface BarProps {
  labels: Array<string>;
  colors: Array<string>;
  dataset1: Array<number>;
}

export default function Bar({ labels, colors, dataset1 }: BarProps) {
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

  const data: ChartData<"bar"> = {
    labels: labels,
    datasets: [
      {
        label: "Products",
        data: dataset1,
        backgroundColor: colors,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
        title: {
          display: true,
          text: "Quantity",
          font: {
            family: "Poppins",
            size: 13,
            weight: "normal",
          },
        },
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
  return <BarChart options={options} data={data} />;
}
