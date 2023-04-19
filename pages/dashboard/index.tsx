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
  TooltipItem,
  TooltipModel,
} from "chart.js";

export default function Dashboard() {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

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
      gradient?.addColorStop(0, colors.purple.half);
      gradient?.addColorStop(0.65, colors.purple.quarter);
      gradient?.addColorStop(1, colors.purple.zero);

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
            borderColor: colors.purple.default,
            lineTension: 0.2,
            pointBackgroundColor: colors.purple.default,
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
        <div className={styles.updates}>
          <h5>New customers</h5>
          <h4>Last 7 weeks</h4>
          <div style={{ width: "100%", height: "100%" }}>
            <canvas id="myChart" ref={canvasEl} width={"230px"}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.PageLayout = IndexLayout;
