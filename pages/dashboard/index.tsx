import { IndexLayout } from "./../../Components/LayoutDashboard";
import styles from "../../styles/Dashboard/Main.module.scss";
import Jeans from "./../../public/jeans.webp";
import Link from "next/link";
import Image from "next/image";
import Line from "../../Components/ChartJs/Line";
import Bar from "../../Components/ChartJs/Bar";

export default function Dashboard() {
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
            <Line color="#1DCF4A" />
          </div>
          <div>
            <h5>Most sold products</h5>
            <h4>Last month</h4>
            <Bar
              labels={[
                "Blue Jeans",
                "Red Shirt",
                "Green Belt",
                "Yellow Sac",
                "Black Nothing",
                "Test",
                "Test44",
              ]}
              colors={[
                "#3DD020", // Green
                "#A3E768", // blue
                "#E4F553", // yellow
                "#DDE788", // green
                "#F38B30", // purple
                "#D9281B", // purple
                "#FF1100", // extreme red
              ]}
              dataset1={[165, 159, 80, 41, 26, 15, 10]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.PageLayout = IndexLayout;
