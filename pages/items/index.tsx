import styles from "../../styles/Items.module.scss";
import axios from "axios";
import { useEffect, useId, useState } from "react";
import Image from "next/image";
import JacketImage from "../../public/jacket1.jpg";
import Jeans from "../../public/jeans.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaBoxes, FaCartPlus } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import stylesUtils from "../../styles/utils/Loading.module.scss";
import ReactPaginate from "react-paginate";

import {
  itemsData as itemsDataMock,
  categoryListData,
  optionsBrand,
  optionsColor,
  optionsSize,
  optionsPrice,
} from "../../Components/Data/items";
import SelectCustom from "../../Components/UI/select";
import Link from "next/link";

type Item = {
  id: number;
  name: string;
  price: string;
};
type MainCategoryList = {
  id: number;
  name: string;
  open: boolean;
  categories: Array<Category>;
};

type Category = {
  id: number;
  name: string;
  main_category_id: number;
};

export default function Items() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainCategoryList, setMainCategoryList] = useState<MainCategoryList[]>([]);
  const [displayedCategory, setDisplayedCategory] = useState<number | null>(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [missingCategoryMessage, setMissingCategoryMessage] = useState("");
  const [filter, setFilter] = useState({
    brand: null,
    color: null,
    size: null,
    price: null,
  });
  const [error, setError] = useState("");
  const getMainCategories = async () => {
    setCategoryLoading(true);
    try {
      const mainCategories = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/retrieveMainCategories"
      );
      const mainCategoriesData = mainCategories.data;
      mainCategoriesData.map((mainCategory: MainCategoryList) => {
        if (mainCategory.open && mainCategory.categories.length) {
          setDisplayedCategory(mainCategory.categories[0].id);
        }
      });
      setMainCategoryList(mainCategoriesData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message, "\n api/retrieveMainCategories");
        setError(e.message);
        setMainCategoryList(categoryListData);
        setDisplayedCategory(categoryListData[0].id);
      }
    } finally {
      setCategoryLoading(false);
    }
  };

  const fetchItems = async (categoryId: number) => {
    setIsLoading(true);
    setItems([]);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/getItems/",
        {
          categoryId: categoryId,
          filters: {},
        },
        config
      );
      const itemsData = items.data;
      if (itemsData.length && Array.isArray(itemsData)) setItems(itemsData);
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
  }, []);

  useEffect(() => {
    if (displayedCategory !== null) {
      fetchItems(displayedCategory);
    } else {
      setIsLoading(false);
      setItems([]);
      setMissingCategoryMessage("Choose a category from the left");
    }
  }, [displayedCategory]);

  const handleFilter = (
    selectedOption: { value: string | number; label: string | number },
    filterName: string
  ) => {
    setFilter({ ...filter, [filterName]: selectedOption });
  };

  const handlePageChange = (e: { selected: number }) => {
    const selected = e.selected + 1;
    setPage(selected);
  };

  return (
    <div className={styles.container}>
      {error && (
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            width: "100%",
            top: " 105px",
            color: "red",
          }}
        >
          {error}. Using mocked data for testing...
        </div>
      )}
      <div className={styles.categoriesSection}>
        <h3>Choose Category</h3>
        {categoryLoading ? (
          <div className={stylesUtils.simpleLoading}>
            <AiOutlineLoading3Quarters />
          </div>
        ) : mainCategoryList.length > 0 ? (
          mainCategoryList.map(
            (mainCategory, i) =>
              mainCategory.categories.length > 0 && (
                <div key={mainCategory.id}>
                  <div
                    onClick={() => {
                      setMainCategoryList((prev) => {
                        let updatedArray = [...prev];
                        if (updatedArray.length > 0) {
                          const updatedObject = { ...updatedArray[i], open: !updatedArray[i].open };
                          updatedArray[i] = updatedObject;
                        }
                        return updatedArray;
                      });
                    }}
                  >
                    {" "}
                    {mainCategory.name}{" "}
                    {mainCategory.open === false ? <AiOutlinePlus /> : <AiOutlineMinus />}
                  </div>
                  {mainCategory.open === true && (
                    <ul>
                      {mainCategory.categories.map((categ) => (
                        <li
                          className={displayedCategory === categ.id ? styles.active : ""}
                          key={categ.id}
                          onClick={() => setDisplayedCategory(categ.id)}
                        >
                          <BiRightArrow /> {categ.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
          )
        ) : (
          <div>No categories configured</div>
        )}
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
                <SelectCustom
                  options={optionsBrand}
                  handleSelect={handleFilter}
                  placeholder="Brand"
                  filterName="brand"
                  chosenValue={filter.brand}
                />
              </div>
              <div className={styles.select}>
                <SelectCustom
                  options={optionsColor}
                  handleSelect={handleFilter}
                  placeholder="Color"
                  filterName="color"
                  chosenValue={filter.color}
                />
              </div>
              <div className={styles.select}>
                <SelectCustom
                  options={optionsSize}
                  handleSelect={handleFilter}
                  placeholder="Size"
                  filterName="size"
                  chosenValue={filter.size}
                />
              </div>
              <div className={styles.select}>
                <SelectCustom
                  options={optionsPrice}
                  handleSelect={handleFilter}
                  placeholder="Price"
                  filterName="price"
                  chosenValue={filter.price}
                />
              </div>
            </div>
            <div>
              <button
                onClick={() =>
                  setFilter({
                    ...filter,
                    brand: null,
                    color: null,
                    size: null,
                    price: null,
                  })
                }
              >
                Reset Filters <MdOutlineFilterAlt />
              </button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className={stylesUtils.simpleLoading} style={{ minHeight: "60vh" }}>
            <AiOutlineLoading3Quarters />
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", margin: "250px 0" }} className="fade-in-general">
            {missingCategoryMessage ? (
              <p style={{ fontSize: "25px", color: "gray" }}>
                {" "}
                <FaBoxes size={90} /> <br />
                {missingCategoryMessage}
              </p>
            ) : (
              <div>
                <br />
                <FaBoxes size={90} />
                <h3 style={{ fontSize: "44px" }}> Empty Stocks</h3>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.containerItem}>
            {items.map((item: Item, index: number) => {
              return (
                <div key={index} className={styles.soldItem}>
                  <div className={styles.imageBox}>
                    {index % 2 === 0 && <Image src={JacketImage} alt="Jacket" />}
                    {index % 4 === 1 && <Image src={Jeans} alt="Jacket" />}
                  </div>
                  <div className={styles.detailsBox}>
                    <div className={styles.sale}>Sale 10%</div>
                    <Link href={"/"}>{item.name}</Link>
                    <span>{item.price} $</span>
                    <h4>Free Shipping</h4>
                    <h5>
                      <button>
                        <FaCartPlus /> Add to Cart
                      </button>
                      213 sold
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.paginationRow}>
          <label>Page {page} of 1</label>
          <ReactPaginate
            breakLabel="..."
            nextLabel="NEXT >"
            pageRangeDisplayed={5}
            pageCount={1}
            onPageChange={handlePageChange}
            previousLabel="< PREVIOUS"
            renderOnZeroPageCount={null}
            activeClassName={styles.selected}
            disabledClassName={styles.disabled}
          />
        </div>
      </div>
    </div>
  );
}
