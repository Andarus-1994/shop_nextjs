import styles from "../../styles/Gifts.module.scss";
import { FaGifts } from "react-icons/fa";
export default function Gifts() {
  return (
    <div className={styles.container}>
      <h2>Gifts page</h2>
      <div style={{ textAlign: "center", margin: "100px 0" }}>
        <FaGifts size={60} />
        <h3 style={{ fontSize: "35px" }}> No gifts</h3>
      </div>
    </div>
  );
}
