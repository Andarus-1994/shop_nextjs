import styles from "../../styles/Gifts.module.scss";
import { FcSalesPerformance } from "react-icons/fc";

export default function Sales() {
  return (
    <div className={styles.container}>
      <h2>Sales page</h2>
      <div style={{ textAlign: "center", margin: "100px 0" }}>
        <FcSalesPerformance size={60} />
        <h3 style={{ fontSize: "35px" }}> No sales</h3>
      </div>
    </div>
  );
}
