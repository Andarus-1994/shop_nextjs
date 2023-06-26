import axios from "axios";
import { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { OptionSelect } from "../../../Components/Types/ItemsTypes";

interface SelectMainCategoryProps {
  showCategoryModal: () => void;
  changeCategory: (option: OptionSelect | string) => void;
  category: OptionSelect | string;
  triggerRefresh: boolean;
  mainCategory: OptionSelect | string;
}

export default function SelectCategory({
  showCategoryModal,
  changeCategory,
  category,
  triggerRefresh,
  mainCategory,
}: SelectMainCategoryProps) {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<OptionSelect[]>([]);
  const animatedComponents = makeAnimated();

  const getCategories = useCallback(async () => {
    setLoadingCategories(true);
    let errorMessage = "";
    const mainCategoryId = typeof mainCategory === "object" ? mainCategory.value : mainCategory;
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/getCategories",
        { categoryId: mainCategoryId },
        config
      );
      const itemsData = items.data;
      setCategories(itemsData);
      if (itemsData.length) {
        changeCategory(itemsData[0]);
      } else {
        changeCategory("");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMessage = e.message;
        console.log(errorMessage);
        setCategories([
          { value: 2, label: "Shirts" },
          { value: 3, label: "Backpacks" },
        ]);
      }
    } finally {
      setLoadingCategories(false);
    }
  }, [changeCategory, mainCategory]);

  useEffect(() => {
    getCategories();
  }, [triggerRefresh, getCategories]);

  return (
    <Fragment>
      <div>
        <label>Category</label>
        <Select
          backspaceRemovesValue={true}
          captureMenuScroll={true}
          isLoading={loadingCategories}
          loadingMessage={() => "Loading"}
          onChange={(e) => {
            const selectedOption = e as { value: number; label: string };
            changeCategory(selectedOption);
          }}
          value={category}
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
          }}
          placeholder="Categories"
          components={animatedComponents}
          options={categories}
        />
      </div>

      <div>
        <button onClick={() => showCategoryModal()}>Create Category</button>
      </div>
    </Fragment>
  );
}
