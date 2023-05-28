import { useState } from "react";
import styles from "../../../styles/Dashboard/Users.module.scss";
import axios from "axios";

interface DeletionProps {
  id: number;
  closeModal: Function;
  refreshUsers: Function;
}

interface MyError extends Error {
  response?: {
    data?: {
      data?: string;
    };
  };
}

export default function UserDeletionModal({ id, closeModal, refreshUsers }: DeletionProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const deleteUser = async (id: number) => {
    setErrorMessage("");
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/deleteUser/" + id,
        config
      );
      if (data.data) {
        refreshUsers();
      }
      console.log(data.data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        const myError = e as MyError;
        if (myError.response) {
          console.log(myError.response.data?.data);
          setErrorMessage(myError.response.data?.data ?? "");
        }
      }
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.userModalContainer}
      onClick={(e) => {
        handleClose(e);
      }}
    >
      <div className={styles.dashboardModal}>
        <h4>You gonna delete the user with id: {id}</h4>
        <div className={styles.inputBox}>
          <button onClick={() => closeModal()}>Cancel</button>
          <button onClick={() => deleteUser(id)} disabled={loading}>
            {loading ? "Deleting.." : "Yes"}
          </button>
        </div>
        {errorMessage}
      </div>
    </div>
  );
}
