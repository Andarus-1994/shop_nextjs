import axios from "axios";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { useCallback, useEffect, useState, useRef } from "react";
import LoadingSpinner from "../../../Components/Loading";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Image from "next/image";
import Placeholder from "../../../public/phImage.png";
import { CategoryType, ItemType, OptionSelect } from "../../../Components/Types/ItemsTypes";
import { basename } from "path";

type ModalProps = {
  closeModal: Function;
  itemObjectProp?: ItemType;
  refreshItems: Function;
};

type CustomError = Error & {
  response?: {
    data: {
      errors: object;
    };
  };
};

export default function NewOrEditItem({ closeModal, itemObjectProp, refreshItems }: ModalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState<ItemType>({
    name: "",
    price: null,
    stock: null,
    image: "",
    brand: "",
    color: "",
    size: [] as OptionSelect[],
    categories: [] as CategoryType[],
  });
  const imageInput = useRef<HTMLInputElement>(null);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (itemObjectProp) setItem(itemObjectProp);
  }, [itemObjectProp]);

  const getCategories = useCallback(async () => {
    setLoadingCategories(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/getCategories",
        { categoryId: "all" },
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

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const createItem = async () => {
    setLoading(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const formData = new FormData();
    formData.append("item", JSON.stringify(item));
    formData.append("image", item.image);
    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/newItem",
        formData,
        config
      );
      const itemsData = items.data;
      setCategories(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMessage = e.message;
        setError(errorMessage);
        setCategories([]);
        const customError = e as CustomError;
        if (customError.response && customError.response.data.errors) {
          setError(Object.values(customError.response.data.errors)[0] as string);
        }
      }
    } finally {
      setLoading(false);
      if (!errorMessage) {
        refreshItems();
        closeModal();
      }
    }
  };

  const editItem = async () => {
    setLoading(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const formData = new FormData();
    formData.append("item", JSON.stringify(item));
    formData.append("image", item.image);
    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/editItem",
        formData,
        config
      );
      const itemsData = items.data;
      setCategories(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMessage = e.message;
        setError(errorMessage);
        setCategories([]);
        const customError = e as CustomError;
        if (customError.response && customError.response.data.errors) {
          setError(Object.values(customError.response.data.errors)[0] as string);
        }
      }
    } finally {
      setLoading(false);
      if (!errorMessage) {
        refreshItems();
        closeModal();
      }
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        return;
      }
      setItem({ ...item, image: selectedFile });
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
        <h4>New Item</h4>
        <div className={styles.inputBox}>
          <label>
            Name<span>*</span>
          </label>
          <input
            placeholder="Item"
            defaultValue={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
        </div>
        <div className={styles.inputBox}>
          <label>
            Price <span>*</span>
          </label>
          <input
            className={styles.inputNumber}
            placeholder="$"
            value={item.price && item.price !== null ? item.price : ""}
            onChange={(e) => {
              let value = e.target.value;
              const decimalDigits = value.split(".")[1];
              if (decimalDigits && decimalDigits.length > 2) {
                value = parseFloat(value).toFixed(2);
              }
              setItem({ ...item, price: value });
            }}
            onKeyDown={(e) => {
              const charCode = e.key;
              const inputValue = (e.target as HTMLInputElement).value;

              if (
                ((charCode < "0" || charCode > "9") &&
                  charCode !== "Backspace" && // Allow backspace key
                  charCode !== "Delete" &&
                  (charCode !== "." || inputValue.includes("."))) ||
                (charCode === "." && inputValue.length === 0)
              ) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className={styles.inputBox}>
          <label>
            Stock<span>*</span>
          </label>
          <input
            className={styles.inputNumber}
            placeholder="0"
            value={item.stock ?? ""}
            onChange={(e) => setItem({ ...item, stock: Number(e.target.value) })}
            onKeyDown={(e) => {
              const charCode = e.key;
              if (
                (charCode < "0" || charCode > "9") &&
                charCode !== "Backspace" && // Allow backspace key
                charCode !== "Delete"
              ) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Brand</label>
          <input
            defaultValue={item.brand}
            placeholder="Brand"
            onChange={(e) => setItem({ ...item, brand: e.target.value })}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Color</label>
          <input
            defaultValue={item.color}
            placeholder="Color"
            onChange={(e) => setItem({ ...item, color: e.target.value })}
          />
        </div>
        <div className={styles.inputBox}>
          <Select
            className="multi-select"
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            value={item.size}
            onChange={(e) => {
              const selectedValues = e.map((option: any) => option);
              setItem({ ...item, size: selectedValues });
            }}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: "360px",
                margin: "5px 0 0 10px",
                padding: "0px 10px",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
              }),
              multiValue: (base) => ({
                ...base,
                minWidth: "fit-content",
              }),
            }}
            placeholder="Sizes"
            isMulti
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={[
              { value: "S", label: "S" },
              { value: "M", label: "M" },
              { value: "L", label: "L" },
              { value: "XL", label: "XL" },
            ]}
          />
        </div>
        <div className={styles.inputBox}>
          <Select
            className="multi-select"
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            isLoading={loadingCategories}
            loadingMessage={() => "Retrieving categories"}
            onChange={(e) => {
              const selectedValues = e.map((option: any) => option);
              setItem({ ...item, categories: selectedValues });
            }}
            value={item.categories}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "360px",
                margin: "5px 0 0 10px",
                padding: "0px 10px",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
              }),
              multiValue: (base) => ({
                ...base,
                width: "fit-content",
                paddingRight: "15px",
              }),
            }}
            closeMenuOnSelect={false}
            placeholder="Categories"
            isMulti
            components={animatedComponents}
            options={categories}
          />
        </div>
        <input
          accept="image/*"
          type="file"
          ref={imageInput}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label>Upload Image</label>
        <label htmlFor="select-image" className={styles.labelImage}>
          {typeof item.image === "string" && !!item.image ? (
            <Image
              src={item.image}
              alt="Img"
              width={60}
              height={60}
              onClick={() => {
                imageInput.current?.click();
              }}
            />
          ) : typeof item.image === "object" ? (
            <Image
              src={URL.createObjectURL(item.image)}
              alt="Img"
              width={60}
              height={60}
              onClick={() => {
                imageInput.current?.click();
              }}
            />
          ) : (
            <Image
              src={Placeholder}
              alt="Img2"
              width={60}
              height={60}
              onClick={() => {
                imageInput.current?.click();
              }}
            />
          )}
        </label>

        <div className={styles.error}>{error}</div>
        <div className={styles.inputBox}>
          <button onClick={() => closeModal()}>Cancel</button>
          <button onClick={itemObjectProp === undefined ? createItem : editItem} disabled={loading}>
            {loading ? <LoadingSpinner /> : itemObjectProp === undefined ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
