import { useState, useEffect } from "react";
import { IndexLayout } from "../../../Components/LayoutDashboard";
import styles from "../../../styles/Dashboard/Items.module.scss";
import Item from "./item";

export default function Items() {
  const [categories, setCategories] = useState([
    { id: "2", name: "Shirts" },
    { id: "3", name: "Backpacks" },
  ]);
  const editItem = (i: number) => {
    console.log(i);
  };
  const deleteItem = (i: number) => {
    console.log(i);
  };
  const [items, setItems] = useState([
    {
      id: 1,
      name: "BackPack",
      image: "",
      price: 23,
      stock: 3,
      sold: 10,
      action1: editItem,
      action2: deleteItem,
    },
    {
      id: 22,
      name: "Double BackPack",
      image: "",
      price: 43,
      stock: 6,
      sold: 5,
      action1: editItem,
      action2: deleteItem,
    },
    {
      id: 41,
      name: "Small BackPack",
      image: "",
      price: 33,
      stock: 2,
      sold: 1,
      action1: editItem,
      action2: deleteItem,
    },
    ,
  ]);
  const [category, setCategory] = useState(categories[0].name);
  const [filterItem, setFilterItem] = useState("");

  useEffect(() => {
    if (category === "Backpacks") {
      setItems([
        {
          id: 1,
          name: "BackPack",
          image: "",
          price: 23,
          stock: 3,
          sold: 10,
          action1: editItem,
          action2: deleteItem,
        },
        {
          id: 22,
          name: "Double BackPack",
          image: "",
          price: 43,
          stock: 6,
          sold: 5,
          action1: editItem,
          action2: deleteItem,
        },
        {
          id: 41,
          name: "Small BackPack",
          image: "",
          price: 33,
          stock: 2,
          sold: 1,
          action1: editItem,
          action2: deleteItem,
        },
        {
          id: 46,
          name: "Small BackPack TWO",
          image: "",
          price: 33,
          stock: 2,
          sold: 3,
          action1: editItem,
          action2: deleteItem,
        },
        {
          id: 49,
          name: "One Pack",
          image: "",
          price: 50,
          stock: 2,
          sold: 1,
          action1: editItem,
          action2: deleteItem,
        },
        ,
      ]);
    } else {
      setItems([
        {
          id: 38,
          name: "Shirt",
          image: "",
          price: 23,
          stock: 5,
          sold: 4,
          action1: editItem,
          action2: deleteItem,
        },
        {
          id: 4,
          name: "Tag Shirt",
          image: "",
          price: 5,
          stock: 2,
          sold: 5,
          action1: editItem,
          action2: deleteItem,
        },
        {
          id: 15,
          name: "T Shirt 22",
          image: "",
          price: 13,
          stock: 6,
          sold: 19,
          action1: editItem,
          action2: deleteItem,
        },
        ,
      ]);
    }
  }, [category]);

  return (
    <div className={styles.items}>
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
          <button>Add Category +</button>
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
