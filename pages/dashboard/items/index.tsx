import { useState, useEffect, useCallback } from "react";
import { IndexLayout } from "../../../Components/LayoutDashboard";
import styles from "../../../styles/Dashboard/Items.module.scss";
import { itemsDashboard } from "../../../Components/Data/items";
import NewMainCategory from "./newMainCategoryModal";
import NewCategory from "./newCategoryModal";
import axios from "axios";
import NewOrEditItem from "./newItemModal";
import { Pagination } from "@nextui-org/react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import SelectMainCategory from "./selectMainCategory";
import SelectCategory from "./selectCategory";
import TableItems from "./tableItems";
import { CategoryType, ItemType, OptionSelect } from "../../../Components/Types/ItemsTypes";

interface Category {
  mainCategory: OptionSelect | string;
  category: OptionSelect | string;
}

export default function Items() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    brand: "",
    color: "",
    size: [] as OptionSelect[],
    image: "",
    categories: [] as CategoryType[],
  });
  const [showMainCategoryModal, setShowMainCategoryModal] = useState(false);
  const [refreshMainCateg, setRefreshMainCateg] = useState(false);
  const [refreshCateg, setRefreshCateg] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [savedCategories, setSavedCategories] = useState<Category>({
    mainCategory: "",
    category: "",
  });

  const changeMainCategory = useCallback((categoryOption: OptionSelect) => {
    setSavedCategories((prev) => ({ ...prev, mainCategory: categoryOption }));
  }, []);

  const changeCategory = useCallback((categoryOption: OptionSelect | string) => {
    setSavedCategories((prev) => ({ ...prev, category: categoryOption }));
  }, []);

  const editItem = (Item: ItemType) => {
    console.log(Item);
    setSelectedItem(Item);
    setShowItemModal(true);
  };
  const deleteItem = (i: number) => {
    console.log(i);
  };
  const [items, setItems] = useState<ItemType[]>([]);
  const [filterItem, setFilterItem] = useState("");

  const getItems = useCallback(async () => {
    console.log("get items");
    const categoryId = savedCategories.category;
    if (categoryId === "") {
      const dummyData = process.env.NEXT_PUBLIC_API_URL === undefined ? itemsDashboard : [];
      setLoadingItems(false);
      setItems(dummyData);
      return;
    }
    setLoadingItems(true);
    let errorMessage = "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const items = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/dashboard/getItems",
        { categoryId: categoryId },
        config
      );
      const itemsData = items.data;
      setItems(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMessage = e.message;
        console.log(errorMessage);
        setItems(itemsDashboard);
      }
    } finally {
      setLoadingItems(false);
    }
  }, [savedCategories.category]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const closeModalCategory = () => {
    setShowCategoryModal(false);
  };

  const closeModalItem = () => {
    setShowItemModal(false);
    setSelectedItem({
      id: 0,
      name: "",
      price: 0,
      stock: 0,
      brand: "",
      color: "",
      size: [] as OptionSelect[],
      image: "",
      categories: [] as CategoryType[],
    });
  };

  const closeModalMainCategory = () => {
    setShowMainCategoryModal(false);
  };

  return (
    <div className={styles.items}>
      {showMainCategoryModal && (
        <NewMainCategory
          closeModal={closeModalMainCategory}
          refreshMainCategories={() => setRefreshMainCateg(!refreshMainCateg)}
        />
      )}
      {showCategoryModal && (
        <NewCategory
          closeModal={closeModalCategory}
          refreshCategories={() => setRefreshCateg(!refreshCateg)}
        />
      )}
      {showItemModal &&
        (selectedItem.name ? (
          <NewOrEditItem
            closeModal={closeModalItem}
            itemObjectProp={selectedItem}
            refreshItems={getItems}
          />
        ) : (
          <NewOrEditItem closeModal={closeModalItem} refreshItems={getItems} />
        ))}
      <section>
        <h3>Items control</h3>
        <h4>Add new items or modify the existing ones</h4>
      </section>
      <div className={styles.topMenu}>
        <div>
          <input
            placeholder="Search item..."
            value={filterItem}
            onChange={(e) => setFilterItem(e.target.value)}
          />
        </div>
        <SelectMainCategory
          changeMainCategory={changeMainCategory}
          mainCategory={savedCategories.mainCategory}
          triggerRefresh={refreshMainCateg}
          showMainCategoryModal={() => setShowMainCategoryModal(true)}
        />
        <SelectCategory
          changeCategory={changeCategory}
          category={savedCategories.category}
          triggerRefresh={refreshCateg}
          showCategoryModal={() => setShowCategoryModal(true)}
          mainCategory={savedCategories.mainCategory}
        />
      </div>
      <div>
        <div className={styles.newItemSide}>
          <button onClick={() => setShowItemModal(true)}>
            <AiOutlineAppstoreAdd /> New Item
          </button>
        </div>

        <TableItems
          items={items}
          loading={loadingItems}
          editItem={editItem}
          deleteItem={deleteItem}
        />

        {loadingItems === false && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "40px",
            }}
            className={styles.fadeIn}
          >
            <Pagination
              bordered
              size={"lg"}
              total={1}
              color={"secondary"}
              onChange={(e) => {
                console.log(e);
              }}
              page={1}
              initialPage={1}
            />
          </div>
        )}
      </div>
    </div>
  );
}

Items.PageLayout = IndexLayout;
