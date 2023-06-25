import axios from "axios";
import { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { OptionSelect } from "../../../Components/Types/ItemsTypes";

interface SelectMainCategoryProps {
  showMainCategoryModal: () => void;
  changeMainCategory: (option: OptionSelect) => void;
  mainCategory: OptionSelect | string;
  triggerRefresh: boolean;
}

export default function SelectMainCategory({
  changeMainCategory,
  mainCategory,
  triggerRefresh,
  showMainCategoryModal,
}: SelectMainCategoryProps) {
  const [loadingMainCategories, setLoadingMainCategories] = useState(true);
  const [mainCategories, setMainCategories] = useState([]);
  const animatedComponents = makeAnimated();

  const getMainCategories = useCallback(async () => {
    setLoadingMainCategories(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const mainCategories = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/getMainCategories",
        config
      );
      const mainCategoriesData = mainCategories.data;
      setMainCategories(mainCategoriesData);
      if (mainCategoriesData.length) {
        changeMainCategory(mainCategoriesData[0]);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMessage = e.message;
        console.log(errorMessage);
        setMainCategories([]);
      }
    } finally {
      setLoadingMainCategories(false);
    }
  }, [changeMainCategory]);

  useEffect(() => {
    getMainCategories();
  }, [getMainCategories, triggerRefresh]);

  return (
    <Fragment>
      <div>
        <label>Main Category</label>
        <Select
          backspaceRemovesValue={true}
          captureMenuScroll={true}
          isLoading={loadingMainCategories}
          loadingMessage={() => "Loading"}
          onChange={(e) => {
            const selectedOption = e as { value: number; label: string };
            changeMainCategory(selectedOption);
          }}
          value={mainCategory}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "250px",
              margin: "5px 0 0 0",
              padding: "0px 10px",
              border: "none",
              borderRadius: "15px",
              boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
            }),
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
              position: "absolute",
            }),
          }}
          placeholder="Main Categories"
          components={animatedComponents}
          options={mainCategories}
        />
      </div>
      <div>
        <button onClick={showMainCategoryModal}>Create Main Category</button>
      </div>
    </Fragment>
  );
}
