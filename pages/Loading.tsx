import styles from "../styles/LoadingPage.module.scss";
export default function LoadingPage() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h3>Shopius</h3>
    </div>
  );
}
