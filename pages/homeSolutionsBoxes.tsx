import styles from "../styles/Home.module.scss";
import { BsBagCheck } from "react-icons/bs";
import { GiTravelDress } from "react-icons/gi";
export default function HomeSolutionsBoxes() {
  return (
    <div className={styles.containerHomeSolutions}>
      <div className={styles.box1}>
        <BsBagCheck />
        <p>
          Linen is an extremely strong, lightweight fabric made from the flax
          plant, part of the genus Linum in the family Linaceae. The word
          “linen” comes from the Latin name for flax, “linum usitatissimum.”
        </p>
      </div>
      <div className={styles.box2}>
        <GiTravelDress />
        <p>
          Linen is known as the world&apos;s strongest natural fiber and is far
          more durable than cotton. The strength of the fiber directly
          contributes to the strength of the fabric the garment is made of.
        </p>
      </div>
    </div>
  );
}
