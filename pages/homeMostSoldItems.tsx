import styles from "../styles/Home.module.scss";
import JacketImage from "../public/jacket.jpg";
import CostumeImage from "../public/costume.jpg";
import Image from "next/image";
export default function homeMostSoldItems() {
  return (
    <div className={styles.containerHomeMostSold1}>
      <h2>Most Sold Collections</h2>
      <div className={styles.containerHomeMostSold}>
        <div className={styles.soldItem}>
          <Image src={JacketImage} alt="Jacket" />{" "}
          <p>
            Jacket <span>22.00 $</span>
          </p>
        </div>
        <div className={styles.soldItem}>
          <Image src={CostumeImage} alt="Jacket" />{" "}
          <p>
            Costume <span>15.00 $</span>
          </p>
        </div>
        <div className={styles.soldItem}>
          <Image src={JacketImage} alt="Jacket" />{" "}
          <p>
            Jacket <span>13.00 $</span>
          </p>
        </div>
        <div className={styles.soldItem}>
          <Image src={JacketImage} alt="Jacket" />{" "}
          <p>
            Jacket <span>12.00 $</span>
          </p>
        </div>
        <div className={styles.soldItem}>
          <Image src={JacketImage} alt="Jacket" />{" "}
          <p>
            Jacket <span>24.00 $</span>
          </p>
        </div>
      </div>
    </div>
  );
}
