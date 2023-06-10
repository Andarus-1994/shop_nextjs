import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./../styles/Dashboard/Sidebar.module.scss";
import stylesContent from "./../styles/Dashboard/Dashboard.module.scss";
import { useDispatch } from "react-redux";
import { navTrigger } from "../store/reducers/navReducer";
export function IndexLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const dashboardContentRef = useRef<HTMLDivElement>(null);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollTop > 0) {
      dispatch(navTrigger(true));
    } else {
      dispatch(navTrigger(false));
    }
  };

  useEffect(() => {
    if (dashboardContentRef.current)
      dashboardContentRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [children]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="dashboard.png" />
      </Head>
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <nav>
            <div className={styles.cover}></div>
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
          </nav>
        </div>
        <div className={stylesContent.content} onScroll={handleScroll} ref={dashboardContentRef}>
          {children}
        </div>
      </div>
    </>
  );
}
