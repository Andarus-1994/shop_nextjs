import styles from "../../styles/Notification.module.scss";
import { useState, useEffect } from "react";
interface NotificationProps {
  message: string;
}
export default function Notification({ message }: NotificationProps) {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDisplay(false);
    }, 4000);
    if (message) setDisplay(true);
    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  return display === true ? <div className={styles.notification}>{message}</div> : <></>;
}
