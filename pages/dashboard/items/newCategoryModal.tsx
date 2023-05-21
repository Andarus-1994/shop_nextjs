import axios from "axios";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { useState } from "react";
import LoadingSpinner from "../../../Components/Loading";

type ModalProps = {
  closeModal: Function;
};

export default function NewCategory({ closeModal }: ModalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const createCategory = async () => {
    let errorMessage = "";
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.get(process.env.NEXT_PUBLIC_API_URL + "api/newCategory", config);
      const itemsData = items.data;
      console.log(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        errorMessage = e.message;
        setError(errorMessage);
      }
    } finally {
      if (!errorMessage) closeModal();
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
      <div className={styles.userModal}>
        <h4>New Category</h4>
        <div className={styles.inputBox}>
          <label>Name</label>
          <input placeholder="Category" />
        </div>
        <div className={styles.inputBox}>
          <div>Main Category:</div>
          <select>
            <option>Blousons</option>
          </select>
        </div>
        <div className={styles.error}>{error}</div>
        <div className={styles.inputBox}>
          <button onClick={() => closeModal()}>Cancel</button>
          <button disabled={loading} onClick={createCategory}>
            {loading ? <LoadingSpinner /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
