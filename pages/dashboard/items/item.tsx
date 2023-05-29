import { useState } from "react";
import styles from "../../../styles/Dashboard/Items.module.scss";
import Image from "next/image";
import BackpackImage from "../../../public/backpack.png";
import { MdEditNote } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

interface ItemProps {
  id: number;
  name: string;
  image: string | File;
  price: number;
  stock: number;
  sold: number;
  action1: Function;
  action2: Function;
  index: number;
}

export default function Item({
  id,
  name,
  image,
  price,
  stock,
  sold,
  action1,
  action2,
  index,
}: ItemProps) {
  const getAnimationDelay = () => {
    return {
      animationDelay: index * 0.15 + "s",
    };
  };
  return (
    <tr className={styles.item}>
      <td style={getAnimationDelay()}>{id}</td>
      <td style={getAnimationDelay()}>
        <h3>{name}</h3>
      </td>
      <td style={getAnimationDelay()}>
        <Image src={BackpackImage} alt="item" />
      </td>
      <td style={getAnimationDelay()}>
        <span>{price.toFixed(2)}</span> $
      </td>
      <td style={getAnimationDelay()}>{stock}</td>
      <td style={getAnimationDelay()}>{sold}</td>
      <td style={getAnimationDelay()}>
        <button
          onClick={() => {
            action1(id);
          }}
        >
          <MdEditNote />
          Edit
        </button>
        <button
          onClick={() => {
            action2(id);
          }}
        >
          <BsTrash />
          Delete
        </button>
      </td>
    </tr>
  );
}
