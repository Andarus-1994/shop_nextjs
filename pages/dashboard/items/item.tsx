import styles from "../../../styles/Dashboard/Items.module.scss";
import Image from "next/image";
import BackpackImage from "../../../public/backpack.png";
import { MdEditNote } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import LoadingSpinner from "../../../Components/Loading";
import { useEffect, useMemo, useState } from "react";

interface ItemProps {
  name?: string;
  itemObject?: ItemType;
  action1?: Function;
  action2?: Function;
  index?: number;
  loading?: boolean;
}

type ItemType = {
  id: number;
  name: string;
  price: number;
  stock: number;
  brand: string;
  color: string;
  size: OptionSelectSize[];
  image: string;
  sold: number;
  categories: Category[];
};

type Category = {
  label: string;
  value: number;
};

type OptionSelectSize = { label: string; value: string };

export default function Item({ name, itemObject, action1, action2, index, loading }: ItemProps) {
  const [item, setItem] = useState({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    brand: "",
    color: "",
    size: [] as OptionSelectSize[],
    image: "",
    categories: [] as Category[],
  });

  useEffect(() => {
    if (itemObject) {
      setItem(itemObject);
    }
  }, [itemObject]);

  const getAnimationDelay = useMemo(() => {
    return {
      animationDelay: (index ? index : 0.2) * 0.15 + "s",
    };
  }, [index]);

  return itemObject !== undefined && action1 !== undefined && action2 !== undefined ? (
    <tr className={styles.item}>
      <td style={getAnimationDelay}>{itemObject.id}</td>
      <td style={getAnimationDelay}>
        <h3>{itemObject.name}</h3>
      </td>
      <td style={getAnimationDelay}>
        <Image
          src={itemObject.image && itemObject.image !== "" ? itemObject.image : BackpackImage}
          width={50}
          height={50}
          alt="item"
        />
      </td>
      <td style={getAnimationDelay}>None</td>
      <td style={getAnimationDelay}>S</td>
      <td style={getAnimationDelay}>
        <span>{itemObject.price.toFixed(2)}</span> $
      </td>
      <td style={getAnimationDelay}>{itemObject.stock ?? 0}</td>
      <td style={getAnimationDelay}>{itemObject.sold ?? 0}</td>
      <td style={getAnimationDelay}>
        <button
          onClick={() => {
            action1(itemObject);
          }}
        >
          <MdEditNote />
          Edit
        </button>
        <button
          onClick={() => {
            action2(itemObject.id);
          }}
        >
          <BsTrash />
          Delete
        </button>
      </td>
    </tr>
  ) : (
    <tr className={styles.item}>
      <td style={getAnimationDelay}>{loading === true && <LoadingSpinner />}</td>
      <td style={getAnimationDelay}>
        <h3>{name}</h3>
      </td>
      <td style={getAnimationDelay}></td>
      <td style={getAnimationDelay}></td>
      <td style={getAnimationDelay}></td>
      <td style={getAnimationDelay}></td>
      <td style={getAnimationDelay}></td>
      <td style={getAnimationDelay}></td>
      <td style={getAnimationDelay}></td>
    </tr>
  );
}
