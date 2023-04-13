import { IndexLayout } from "./../../Components/LayoutDashboard";
import styles from "../../styles/Dashboard/Main.module.scss";
import CostumeImage from "./../../public/costume.jpg";
import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div className={styles.main}>
      <h3>Ecommerce Dashboard</h3>
      <h4>Here’s what’s going on at your business right now</h4>
      <div className={styles.flexUpdates}>
        <div className={styles.updates}>
          <h5>Latest sellings</h5>
          <h4>Payment and more details for each product sold</h4>
          <div className={styles.listSoldItems}>
            <div className={styles.soldItem}>
              <Image src={CostumeImage} alt="UserImage" />
              <p>
                Item name: <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={CostumeImage} alt="UserImage" />
              <p>
                Item name: <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={CostumeImage} alt="UserImage" />
              <p>
                Item name: <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={CostumeImage} alt="UserImage" />
              <p>
                Item name: <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
            <div className={styles.soldItem}>
              <Image src={CostumeImage} alt="UserImage" />
              <p>
                Item name: <Link href={""}> Blue Jeans</Link>
              </p>
              <p>
                Sold price: <span>244 $</span>
              </p>
              <p>Bought by: Andrey</p>
            </div>
          </div>
        </div>
        <div className={styles.updates}>
          <h5>Upcomming changes</h5>
          <h4>Soon...</h4>
        </div>
      </div>
    </div>
  );
}

Dashboard.PageLayout = IndexLayout;
