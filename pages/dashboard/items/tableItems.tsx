import styles from "../../../styles/Dashboard/Items.module.scss";
import { Fragment, useEffect } from "react";
import Item from "./item";
import { ItemType } from "../../../Components/Types/ItemsTypes";
import LoadingSpinner from "../../../Components/Loading";

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
    <div className={styles.containerTable}>
      {loading === true && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
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
          {items.length ? (
            items.map((item: ItemType, index: number) => {
              return (
                <Item
                  key={item?.id + " " + index}
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
    </div>
  );
}
