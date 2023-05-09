import styles from "../../styles/Items.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import JacketImage from "../../public/jacket.jpg";
import Jeans from "../../public/jeans.jpg";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaBoxes } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import stylesUtils from "../../styles/utils/Loading.module.scss";

interface Item {
  id: number;
  name: string;
  price: number;
}

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([
    {
      id: 1,
      name: "Clothing",
    },
    {
      id: 2,
      name: "Bags",
    },
    {
      id: 3,
      name: "Beauty",
    },
    {
      id: 4,
      name: "Accessories",
    },
  ]);
  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.get(process.env.NEXT_PUBLIC_API_URL + "api/getItems", config);
      const itemsData = items.data;
      setItems(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        {categoryList.length > 0 &&
          categoryList.map((category) => (
            <div key={category.id}>
              <div>
                {" "}
                {category.name} {category.id !== 2 ? <AiOutlinePlus /> : <AiOutlineMinus />}
              </div>
              {category.id === 2 && (
                <ul>
                  <li>New bags</li>
                  <li>Old bags</li>
                  <li>Test bags</li>
                </ul>
              )}
            </div>
          ))}
      </div>
      <div className={styles.containerItems}>
        <div className={styles.filter}>
          <div>
            <label>Filters</label>
            <button>Pants</button>
            <button>Shirts</button>
            <button className={styles.active}>Jackets</button>
            <button>Blussons</button>
            <button>Jackets</button>
            <button>Jackets</button>
            <AiOutlineSearch />
            <input placeholder={" Search"} />
          </div>
        </div>
        {isLoading ? (
          <div className={stylesUtils.simpleLoading}>
            <AiOutlineLoading3Quarters />
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", margin: "100px 0" }}>
            <FaBoxes size={90} />
            <h3 style={{ fontSize: "44px" }}> Empty Stocks</h3>
          </div>
        ) : (
          <div className={styles.containerHomeMostSold}>
            {items.map((item: Item, index: number) => {
              return (
                <div key={index} className={styles.soldItem}>
                  <div className={styles.imageBox}>
                    {index % 2 === 0 && <Image src={JacketImage} alt="Jacket" />}
                    {index % 2 === 1 && <Image src={Jeans} alt="Jacket" />}
                    <h4>More sizes</h4>
                  </div>
                  <div className={styles.detailsBox}>
                    <div className={styles.sale}>Sale</div>
                    <p>{item.name}</p>
                    <span>{item.price} $</span>
                    <h4>Free Shipping</h4>
                    <h5>
                      <button>Add to Cart</button>213 sold
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
