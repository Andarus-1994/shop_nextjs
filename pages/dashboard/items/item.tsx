import { useState } from "react";
import styles from "../../../styles/Dashboard/Items.module.scss";
import Image from "next/image";
import BackpackImage from "../../../public/backpack.png";
import { MdEditNote } from "react-icons/md";

interface ItemProps {
  id: number;
  name: string;
  image: string | File;
  price: number;
  stock: number;
  sold: number;
  action: Function;
}

export default function Item({ id, name, image, price, stock, sold, action }: ItemProps) {
  return (
    <tr className={styles.item}>
      <td>{id}</td>
      <td>
        <h3>{name}</h3>
      </td>
      <td>
        <Image src={BackpackImage} alt="item" />
      </td>
      <td>
        <span>{price}</span> $
      </td>
      <td>{stock}</td>
      <td>{sold}</td>
      <td>
        <button
          onClick={() => {
            action(id);
          }}
        >
          <MdEditNote />
          Edit
        </button>
      </td>
    </tr>
  );
}
