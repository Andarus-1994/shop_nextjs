import { useState } from "react";
import { IndexLayout } from "../../../Components/LayoutDashboard";
import styles from "../../../styles/Dashboard/Items.module.scss";

export default function Items() {
  const [categories, setCategories] = useState([
    { id: "1", name: "Pants" },
    { id: "2", name: "Shirts" },
    { id: "3", name: "Backpacks" },
  ]);
  const [category, setCategory] = useState(categories[0].name);
  const [filterItem, setFilterItem] = useState("");
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
        <h4>Test 2 {category}</h4>
      </div>
    </div>
  );
}

Items.PageLayout = IndexLayout;
