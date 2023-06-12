import axios from "axios";
import { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface SelectMainCategoryProps {
  showCategoryModal: () => void;
  changeCategory: (option: CategoryOption) => void;
  category: CategoryOption | string;
  triggerRefresh: boolean;
}

type CategoryOption = { value: number; label: string };

export default function SelectCategory({
  showCategoryModal,
  changeCategory,
  category,
  triggerRefresh,
}: SelectMainCategoryProps) {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const animatedComponents = makeAnimated();

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
      if (itemsData.length) {
        changeCategory(itemsData[0]);
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
  }, [changeCategory]);

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
