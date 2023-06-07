import styles from "../../../styles/Dashboard/Items.module.scss";
import Image from "next/image";
import BackpackImage from "../../../public/backpack.png";
import { MdEditNote } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import LoadingSpinner from "../../../Components/Loading";

interface ItemProps {
  id?: number;
  name: string;
  image?: string | File;
  price?: number;
  stock?: number;
  sold?: number;
  action1?: Function;
  action2?: Function;
  index?: number;
  loading?: boolean;
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
  loading,
}: ItemProps) {
  const getAnimationDelay = () => {
    return {
      animationDelay: (index ? index : 0.2) * 0.15 + "s",
    };
  };

  return name !== undefined &&
    id !== undefined &&
    action1 !== undefined &&
    action2 !== undefined &&
    index !== undefined &&
    price !== undefined ? (
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
  ) : (
    <tr className={styles.item}>
      <td style={getAnimationDelay()}>{loading === true && <LoadingSpinner />}</td>
      <td style={getAnimationDelay()}>
        <h3>{name}</h3>
      </td>
      <td style={getAnimationDelay()}></td>
      <td style={getAnimationDelay()}></td>
      <td style={getAnimationDelay()}></td>
      <td style={getAnimationDelay()}></td>
      <td style={getAnimationDelay()}></td>
    </tr>
  );
}
