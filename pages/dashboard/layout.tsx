import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Dashboard/Sidebar.module.scss";
import stylesContent from "../../styles/Dashboard/Dashboard.module.scss";
export function IndexLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="dashboard.png" />
      </Head>
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <nav>
            <div className={styles.topSide1}></div>
            <div className={styles.topSide2}></div>
            <div className={styles.topSide3}></div>
            <Link
              className={router.pathname == "/dashboard" ? styles.active : ""}
              href={"/dashboard"}
            >
              Main
            </Link>
            <Link
              className={router.pathname == "/dashboard/users" ? styles.active : ""}
              href={"/dashboard/users"}
            >
              Users
            </Link>
            <Link
              className={router.pathname == "/dashboard/items" ? styles.active : ""}
              href={"/dashboard/items"}
            >
              Items
            </Link>
            <Link
              className={router.pathname == "/dashboard/analytics" ? styles.active : ""}
              href={"/dashboard/analytics"}
            >
              Analytics
            </Link>
            <div className={styles.bottomSide1}></div>
            <div className={styles.bottomSide2}></div>
            <div className={styles.bottomSide3}></div>
          </nav>
        </div>
        <div className={stylesContent.content}>{children}</div>
      </div>
    </>
  );
}
