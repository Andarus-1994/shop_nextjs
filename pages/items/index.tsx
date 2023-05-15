import styles from "../../styles/Items.module.scss";
import axios from "axios";
import { CSSProperties, useEffect, useId, useState } from "react";
import Image from "next/image";
import JacketImage from "../../public/jacket.jpg";
import Jeans from "../../public/jeans.jpg";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaBoxes } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import stylesUtils from "../../styles/utils/Loading.module.scss";
import CreatableSelect from "react-select/creatable";
import {
  itemsData as itemsDataMock,
  categoryListData,
  optionsBrand,
  optionsColor,
  optionsSize,
  optionsPrice,
} from "../../Components/Data/items";

type Item = {
  id: number;
  name: string;
  price: string;
};
type categoryList = {
  id: number;
  name: string;
  open: boolean;
};

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chosenCategory, setChosenCategory] = useState(0);
  const [categoryList, setCategoryList] = useState<categoryList[]>([]);

  const getMainCategories = async () => {
    try {
      const mainCategories = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/retrieveMainCategories"
      );
      const mainCategoriesData = mainCategories.data;
      setCategoryList(mainCategoriesData);
      console.log(mainCategoriesData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message, "\n api/retrieveMainCategories");
        setCategoryList(categoryListData);
      }
    } finally {
      console.log("end");
    }
  };

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
        setItems(itemsDataMock);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMainCategories();
    fetchItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.categoriesSection}>
        {categoryList.length > 0 &&
          categoryList.map((category, i) => (
            <div key={category.id}>
              <div
                onClick={() => {
                  setCategoryList((prev) => {
                    let updatedArray = [...prev];
                    if (updatedArray.length > 1) {
                      const updatedObject = { ...updatedArray[i], open: !updatedArray[i].open };
                      updatedArray[i] = updatedObject;
                    }
                    return updatedArray;
                  });
                }}
              >
                {" "}
                {category.name} {category.open === false ? <AiOutlinePlus /> : <AiOutlineMinus />}
              </div>
              {category.open === true && (
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
        <div className={styles.filterSection}>
          <div className={styles.itemsCountSort}>
            <div className={styles.count}>{items.length} items found</div>
            <div className={styles.sort}>
              <label>Sort By:</label>{" "}
              <select>
                <option>Popular</option>
                <option>Date Added</option>
              </select>
            </div>
          </div>
          <div className={styles.filters}>
            <div>
              <div className={styles.select}>
                <CreatableSelect
                  isClearable
                  placeholder="Brand"
                  options={optionsBrand}
                  instanceId={useId()}
                />
              </div>
              <div className={styles.select}>
                <CreatableSelect
                  placeholder="Color"
                  isClearable
                  options={optionsColor}
                  instanceId={useId()}
                />
              </div>
              <div className={styles.select}>
                <CreatableSelect
                  placeholder="Size"
                  isClearable
                  options={optionsSize}
                  instanceId={useId()}
                />
              </div>
              <div className={styles.select}>
                <CreatableSelect
                  placeholder="Price"
                  isClearable
                  options={optionsPrice}
                  instanceId={useId()}
                />
              </div>
            </div>
            <div>
              <button>
                Reset Filters <MdOutlineFilterAlt />
              </button>
            </div>
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
