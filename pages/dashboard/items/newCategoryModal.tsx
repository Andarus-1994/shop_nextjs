import axios from "axios";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/Loading";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type ModalProps = {
  closeModal: Function;
};

type CustomError = Error & {
  response?: {
    data: {
      errors: object;
    };
  };
};

export default function NewCategory({ closeModal }: ModalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    mainCategory: 0,
  });
  const [mainCategories, setMainCategories] = useState([]);
  const [loadingMainCategories, setLoadingMainCategories] = useState(true);
  const animatedComponents = makeAnimated();

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const getMainCategories = useCallback(async () => {
    setLoadingMainCategories(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/getMainCategories",
        config
      );
      const itemsData = items.data;
      setMainCategories(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMessage = e.message;
        console.log(errorMessage);
        setMainCategories([]);
      }
    } finally {
      setLoadingMainCategories(false);
    }
  }, []);

  useEffect(() => {
    getMainCategories();
  }, [getMainCategories]);

  const createCategory = async () => {
    let errorMessage = "";
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/newCategory",
        category,
        config
      );
      const itemsData = items.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        errorMessage = e.message;
        setError(errorMessage);

        const customError = e as CustomError;
        if (customError.response && customError.response.data.errors) {
          setError(Object.values(customError.response.data.errors)[0] as string);
        }
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
          <label>
            Name<span>*</span>
          </label>
          <input
            placeholder="Category"
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
        </div>
        <div className={styles.inputBox}>
          <div>Main Category:</div>
          <Select
            className="multi-select"
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            isLoading={loadingMainCategories}
            loadingMessage={() => "Loading"}
            onChange={(e) => {
              const selectedOption = e as { value: number; label: string };
              setCategory({ ...category, mainCategory: selectedOption.value });
              console.log(selectedOption);
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "220px",
                margin: "5px 0 0 10px",
                padding: "0px 10px",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
              }),
            }}
            placeholder="Categories"
            components={animatedComponents}
            options={mainCategories}
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
