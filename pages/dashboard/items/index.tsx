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

export default function Items() {
  const [categories, setCategories] = useState([
    { id: "2", name: "Shirts" },
    { id: "3", name: "Backpacks" },
  ]);
  const [mainCategories, setMainCategories] = useState([]);
  const [showMainCategoryModal, setShowMainCategoryModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [loadingMainCategories, setLoadingMainCategories] = useState(false);
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
      console.log(itemsData);
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

  return (
    <div className={styles.items}>
      {showMainCategoryModal && <NewMainCategory closeModal={closeModalMainCategory} />}
      {showCategoryModal && <NewCategory closeModal={closeModalCategory} />}
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
              console.log(e);
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
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCategory(e.target.value);
            }}
          >
            {categories.map((categ) => {
              return <option key={categ.id}>{categ.name}</option>;
            })}
          </select>
        </div>

        <div>
          <button onClick={() => setShowCategoryModal(true)}>Create Category</button>
        </div>
      </div>
      <div>
        <h4>Products for {category}</h4>
        <table className={styles.itemList}>
          <thead>
            <tr className={styles.itemListRow}>
              <th className={styles.itemId}>Id</th>
              <th className={styles.itemName}>Name</th>
              <th className={styles.itemImage}>Image</th>
              <th className={styles.itemPrice}>Price</th>
              <th className={styles.itemStock}>Stock</th>
              <th className={styles.itemSold}>Sold</th>
              <th className={styles.itemAction}>Action</th>
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
      </div>
    </div>
  );
}

Items.PageLayout = IndexLayout;
