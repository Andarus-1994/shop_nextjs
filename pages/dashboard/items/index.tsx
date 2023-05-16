import { useState, useEffect } from "react";
import { IndexLayout } from "../../../Components/LayoutDashboard";
import styles from "../../../styles/Dashboard/Items.module.scss";
import Item from "./item";
import { itemsDashboard, itemsDashboard2 } from "../../../Components/Data/items";
import NewCategory from "./newCategoryModal";

export default function Items() {
  const [categories, setCategories] = useState([
    { id: "2", name: "Shirts" },
    { id: "3", name: "Backpacks" },
  ]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const editItem = (i: number) => {
    console.log(i);
  };
  const deleteItem = (i: number) => {
    console.log(i);
  };
  const [items, setItems] = useState(itemsDashboard);
  const [category, setCategory] = useState(categories[0].name);
  const [filterItem, setFilterItem] = useState("");

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

  return (
    <div className={styles.items}>
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
          <select>
            <option>test</option>
          </select>
        </div>
        <div>
          <button>Create Main Category</button>
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
