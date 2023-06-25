import styles from "../../../styles/Dashboard/Items.module.scss";
import { useEffect } from "react";
import Item from "./item";
import { ItemType } from "../../../Components/Types/ItemsTypes";

interface ItemProps {
  loading?: boolean;
  items: ItemType[];
  editItem: (Item: ItemType) => void;
  deleteItem: (Item: number) => void;
}

export default function TableItems({ loading, items, editItem, deleteItem }: ItemProps) {
  useEffect(() => {
    console.log("created table");
  }, []);

  return (
    <table className={styles.itemList}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th>Brand</th>
          <th>Size</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Sold</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Item name={"Loading..."} loading={true} />
        ) : items.length ? (
          items.map((item: ItemType, index: number) => {
            return (
              <Item
                key={item?.id}
                itemObject={item}
                action1={editItem}
                action2={deleteItem}
                index={index}
              />
            );
          })
        ) : (
          <Item name={"No Items"} loading={false} />
        )}
      </tbody>
    </table>
  );
}
