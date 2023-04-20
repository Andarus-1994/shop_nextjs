import { NextPage } from "next";
import { BiError } from "react-icons/bi";
import styles from "./../styles/404.module.scss";

const NotFound: NextPage = () => {
  return (
    <div className={styles.errorPage}>
      <p>404</p>
      <BiError />
      <h1>Page not found</h1>
    </div>
  );
};

export default NotFound;
