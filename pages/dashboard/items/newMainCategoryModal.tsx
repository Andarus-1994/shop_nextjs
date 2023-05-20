import axios from "axios";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { useState } from "react";
import LoadingSpinner from "../../../Components/Loading";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type User = {
  id: number;
  user: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  profile_image: string;
  roles: Array<string> | string;
};

interface ModalProps {
  closeModal: Function;
}

export default function NewMainCategory({ closeModal }: ModalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const animatedComponents = makeAnimated();

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const createCategory = async () => {
    setLoading(true);
    let errorMessage = "";
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
        <h4>New Main Category</h4>
        <div className={styles.inputBox}>
          <label>Name</label>
          <input placeholder="Main category" />
        </div>
        <div className={styles.inputBox}>
          <Select
            className="multi-select"
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            isLoading={true}
            loadingMessage={() => "Loading"}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "370px",
                margin: "5px 0 0 0",
                padding: "0px 10px",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
              }),
            }}
            placeholder="Sub - Categories"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={[]}
          />
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
