import "bootstrap/dist/css/bootstrap.css";
import styles from "../styles/Home.module.scss";
import Head from "next/head";
export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopius</title>
        <meta name="description" content="Shop app" />
        <link rel="icon" href="iconSite.png" />
      </Head>
      <main>{children}</main>
    </div>
  );
}
