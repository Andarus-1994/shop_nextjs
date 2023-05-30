import axios from "axios";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";
import LoadingSpinner from "../../../Components/Loading";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import Placeholder from "../../../public/phImage.png";

type ModalProps = {
  closeModal: Function;
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
type item = {
  name: string;
  price: number;
  stock: number;
  brand: string;
  color: string;
  size: string[];
  image: string | File;
  categories: Category[];
};

export default function NewOrEditItem({ closeModal }: ModalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState<item>({
    name: "",
    price: 0,
    stock: 0,
    image: "",
    brand: "",
    color: "",
    size: [],
    categories: [] as Category[],
  });
  const imageInput = useRef<HTMLInputElement>(null);
  const animatedComponents = makeAnimated();

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
          <input placeholder="Item" onChange={(e) => setItem({ ...item, name: e.target.value })} />
        </div>
        <div className={styles.inputBox}>
          <label>
            Price<span>*</span>
          </label>
          <input
            placeholder="Price"
            onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) })}
          />
        </div>
        <div className={styles.inputBox}>
          <label>
            Stock<span>*</span>
          </label>
          <input
            placeholder="Stock"
            onChange={(e) => setItem({ ...item, stock: Number(e.target.value) })}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Brand</label>
          <input
            placeholder="Brand"
            onChange={(e) => setItem({ ...item, stock: Number(e.target.value) })}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Color</label>
          <input
            placeholder="Color"
            onChange={(e) => setItem({ ...item, stock: Number(e.target.value) })}
          />
        </div>
        <div className={styles.inputBox}>
          <Select
            className="multi-select"
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            onChange={(e) => {
              const selectedValues = e.map((option: any) => option.value);
              setItem({ ...item, size: selectedValues });
              console.log(selectedValues);
            }}
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
              const selectedValues = e.map((option: any) => option.value);
              setItem({ ...item, categories: selectedValues });
              console.log(selectedValues);
            }}
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
            }}
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
          <button disabled={loading}>{loading ? <LoadingSpinner /> : "Create"}</button>
        </div>
      </div>
    </div>
  );
}
