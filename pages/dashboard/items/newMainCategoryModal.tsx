import axios from "axios";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/Loading";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type ModalProps = {
  closeModal: Function;
  refreshMainCategories: Function;
};
type Category = {
  id: number;
  name: string;
  main_category_id: number;
};

type CustomError = Error & {
  response?: {
    data: {
      errors: object;
    };
  };
};

export default function NewMainCategory({ closeModal, refreshMainCategories }: ModalProps) {
  const [error, setError] = useState("");
  const [mainCategory, setMainCategory] = useState({
    name: "",
    categories: [] as Category[],
  });
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const animatedComponents = makeAnimated();

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const getCategories = useCallback(async () => {
    setLoadingCategories(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/getCategories",
        config
      );
      const itemsData = items.data;
      setCategories(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMessage = e.message;
        setError(errorMessage);
        setCategories([]);
      }
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const createMainCategory = async () => {
    setLoading(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/newMainCategory",
        mainCategory,
        config
      );
      const itemsData = items.data;
      if (itemsData.message) {
        refreshMainCategories();
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
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

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
          <label>
            Name<span>*</span>
          </label>
          <input
            onChange={(e) => setMainCategory({ ...mainCategory, name: e.target.value })}
            placeholder="Main category"
          />
        </div>
        <div className={styles.inputBox}>
          <Select
            className="multi-select"
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            isLoading={loadingCategories}
            loadingMessage={() => "Loading"}
            onChange={(e) => {
              const selectedValues = e.map((option: any) => option.value);
              setMainCategory({ ...mainCategory, categories: selectedValues });
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "380px",
                margin: "5px 0 0 0",
                padding: "0px 10px",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
              }),
            }}
            placeholder="Categories"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={categories}
          />
        </div>
        <div className={styles.error}>{error}</div>
        <div className={styles.inputBox}>
          <button onClick={() => closeModal()}>Cancel</button>
          <button disabled={loading} onClick={createMainCategory}>
            {loading ? <LoadingSpinner /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
