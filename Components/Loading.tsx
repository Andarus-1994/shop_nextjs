import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "../styles/utils/LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingGlobal}>
      <AiOutlineLoading3Quarters />
    </div>
  );
}
