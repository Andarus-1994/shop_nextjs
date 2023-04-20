import { IndexLayout } from "./../../Components/LayoutDashboard";
import styles from "../../styles/Dashboard/Main.module.scss";
import Jeans from "./../../public/jeans.webp";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const canvasEl = useRef<HTMLCanvasElement>(null);

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

  const data2: ChartData<"bar"> = {
    labels: [
      "Blue Jeans",
      "Red Shirt",
      "Green Belt",
      "Yellow Sac",
      "Black Nothing",
      "Test",
      "Test44",
    ],
    datasets: [
      {
        label: "Products",
        data: [165, 159, 80, 41, 26, 15, 10],
        backgroundColor: [
          "#3DD020", // Green
          "#A3E768", // blue
          "#E4F553", // yellow
          "#DDE788", // green
          "#F38B30", // purple
          "#D9281B", // purple
          "#FF1100", // extreme red
        ],
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

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  useEffect(() => {
    if (canvasEl.current) {
      const ctx = canvasEl.current?.getContext("2d");
      // const ctx = document.getElementById("myChart");

      const gradient = ctx?.createLinearGradient(0, 16, 0, 600);

      const weight = [4, 8, 3, 21, 3, 15, 1];
      const options: ChartOptions<"line"> = {
        responsive: true,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
          },
        },
      };

      const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"];
      const data = {
        labels: labels,
        datasets: [
          {
            backgroundColor: gradient,
            label: "Customers",
            data: weight,
            borderWidth: 2,
            borderColor: "#E4F553",
            lineTension: 0.2,
            pointBackgroundColor: "#3DD020",
            pointRadius: 3,
          },
        ],
      };
      const config: ChartConfiguration<"line"> = {
        type: "line",
        data: data,
        options: options,
      };
      const myLineChart = new Chart(ctx!, config);
      return function cleanup() {
        myLineChart.destroy();
      };
    }
  }, [canvasEl]);

  return (
    <div className={styles.main}>
      <section>
        <h3>Ecommerce Dashboard</h3>
        <h4>Here’s what’s going on at your business right now</h4>
      </section>
      <div className={styles.flexUpdates}>
        <div className={styles.updates}>
          <h5>Latest sellings</h5>
          <h4>Payment and more details for each product sold</h4>
          <div className={styles.listSoldItems}>
            <div className={styles.soldItem}>
              <Image src={Jeans} alt="Product" />
              <p>
                <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={Jeans} alt="Product" />
              <p>
                <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={Jeans} alt="Product" />
              <p>
                <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={Jeans} alt="Product" />
              <p>
                <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={Jeans} alt="Product" />
              <p>
                <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
          </div>
        </div>
        <div
          className={styles.updates}
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div>
            <h5>New customers</h5>
            <h4>Last 7 weeks</h4>
            <canvas id="myChart" ref={canvasEl}></canvas>
          </div>
          <div>
            <h5>Most sold products</h5>
            <h4>Last month</h4>
            <Bar data={data2} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.PageLayout = IndexLayout;
