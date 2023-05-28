import { useState, useEffect, useCallback } from "react";
import { IndexLayout } from "../../../Components/LayoutDashboard";
import styles from "../../../styles/Dashboard/Items.module.scss";
import Item from "./item";
import { itemsDashboard, itemsDashboard2 } from "../../../Components/Data/items";
import NewCategory from "./newCategoryModal";
import NewMainCategory from "./newMainCategoryModal";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import NewOrEditItem from "./newItemModal";
import { Pagination } from "@nextui-org/react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

export default function Items() {
  const [categories, setCategories] = useState([
    { id: "2", name: "Shirts", value: 2, label: "Shirts" },
    { id: "3", name: "Backpacks", value: 3, label: "Backpacks" },
  ]);
  const [mainCategories, setMainCategories] = useState([]);
  const [showMainCategoryModal, setShowMainCategoryModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [loadingMainCategories, setLoadingMainCategories] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [savedCategories, setSavedCategories] = useState({
    mainCategory: 0,
    category: 0 as number,
  });

  const editItem = (i: number) => {
    console.log(i);
  };
  const deleteItem = (i: number) => {
    console.log(i);
  };
  const [items, setItems] = useState(itemsDashboard);
  const [category, setCategory] = useState(categories[0].name);
  const [filterItem, setFilterItem] = useState("");
  const animatedComponents = makeAnimated();

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
        console.log(errorMessage);
        setCategories([
          { id: "2", name: "Shirts", value: 2, label: "Shirts" },
          { id: "3", name: "Backpacks", value: 3, label: "Backpacks" },
        ]);
      }
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [savedCategories.mainCategory, getCategories]);

  useEffect(() => {
    if (category === "Backpacks") {
      setItems(itemsDashboard);
    } else {
      setItems(itemsDashboard2);
    }
  }, [category]);

  const closeModalCategory = () => {
    setShowCategoryModal(false);
  };

  const closeModalMainCategory = () => {
    setShowMainCategoryModal(false);
  };

  const closeModalItem = () => {
    setShowItemModal(false);
  };

  return (
    <div className={styles.items}>
      {showMainCategoryModal && (
        <NewMainCategory
          closeModal={closeModalMainCategory}
          refreshMainCategories={getMainCategories}
        />
      )}
      {showCategoryModal && <NewCategory closeModal={closeModalCategory} />}
      {showItemModal && <NewOrEditItem closeModal={closeModalItem} />}
      <section>
        <h3>Items control</h3>
        <h4>Add new items or modify the existing ones</h4>
      </section>
      <div className={styles.topMenu}>
        <div>
          <input
            placeholder="Search item..."
            value={filterItem}
            onChange={(e) => setFilterItem(e.target.value)}
          />
        </div>
        <div>
          <label>Main Category</label>
          <Select
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            isLoading={loadingMainCategories}
            loadingMessage={() => "Loading"}
            onChange={(e) => {
              const selectedOption = e as { value: number; label: string };
              setSavedCategories({ ...savedCategories, mainCategory: selectedOption.value });
            }}
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
            placeholder="Main Categories"
            components={animatedComponents}
            options={mainCategories}
          />
        </div>
        <div>
          <button onClick={() => setShowMainCategoryModal(true)}>Create Main Category</button>
        </div>
        <div>
          <label>Category</label>
          <Select
            backspaceRemovesValue={true}
            captureMenuScroll={true}
            isLoading={loadingCategories}
            loadingMessage={() => "Loading"}
            onChange={(e) => {
              const selectedOption = e as { value: string; label: string };
              setCategory(selectedOption.label);
            }}
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
          <button onClick={() => setShowCategoryModal(true)}>Create Category</button>
        </div>
      </div>
      <div>
        <div className={styles.newItemSide}>
          <button onClick={() => setShowItemModal(true)}>
            <AiOutlineAppstoreAdd /> New Item
          </button>
        </div>
        <table className={styles.itemList}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length &&
              items.map((item, index) => {
                return (
                  <Item
                    key={item?.id}
                    id={item?.id ?? 0}
                    name={item?.name ?? ""}
                    image={item?.image ?? ""}
                    price={item?.price ?? 0}
                    stock={item?.stock ?? 0}
                    sold={item?.sold ?? 0}
                    action1={editItem}
                    action2={deleteItem}
                    index={index}
                  />
                );
              })}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "40px",
          }}
          className={styles.fadeIn}
        >
          <Pagination
            bordered
            size={"lg"}
            total={1}
            color={"secondary"}
            onChange={(e) => {
              console.log(e);
            }}
            page={1}
            initialPage={1}
          />
        </div>
      </div>
    </div>
  );
}

Items.PageLayout = IndexLayout;
