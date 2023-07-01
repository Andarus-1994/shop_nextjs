export const itemsData = [
  { id: 1, name: "Jacket 1", price: "10", category_id: 1 },
  { id: 2, name: "T-Shirt 2", price: "31", category_id: 1 },
  { id: 3, name: "T-Shirt 4", price: "77", category_id: 1 },
  { id: 4, name: "T-Shirt 4", price: "41", category_id: 2 },
  { id: 5, name: "Jeans 77", price: "150", category_id: 2 },
  { id: 6, name: "Jeans 91", price: "550", category_id: 2 },
];
export const itemsDashboard = [
  {
    id: 1,
    name: "Backpack Old",
    price: 10.99,
    stock: 20,
    brand: "Brand A",
    color: "Red",
    size: [
      { label: "S", value: "S" },
      { label: "M", value: "M" },
    ],
    image: "",
    sold: 3,
    categories: [
      { label: "Category Jeans", value: 1, name: "test", id: 34, main_category_id: 2 },
      { label: "Category Test", value: 2, name: "test", id: 324, main_category_id: 24 },
    ],
  },
  {
    id: 2,
    name: "BackPack new",
    price: 19.99,
    stock: 15,
    brand: "Brand B",
    color: "Blue",
    size: [
      { label: "S", value: "S" },
      { label: "L", value: "L" },
    ],
    image: "",
    sold: 4,
    categories: [
      { label: "BackPacks categ", value: 2, name: "test2332", id: 347, main_category_id: 2 },
      { label: "BackPacks categ 2", value: 3, name: "test4", id: 342, main_category_id: 32 },
    ],
  },
  {
    id: 4,
    name: "BackPack new3",
    price: 5.99,
    stock: 25,
    brand: "Brand B",
    color: "Blue",
    size: [
      { label: "S", value: "S" },
      { label: "L", value: "L" },
    ],
    image: "",
    sold: 4,
    categories: [
      { label: "Cat1", value: 2, name: "test2332", id: 347, main_category_id: 2 },
      { label: "Cat2", value: 3, name: "test4", id: 342, main_category_id: 32 },
    ],
  },
];

export const itemsDashboard2 = [
  {
    id: 38,
    name: "Test",
    label: "Test",
    value: 38,
    image: "",
    price: 23,
    stock: 5,
    sold: 4,
  },
  {
    id: 4,
    name: "Test",
    label: "Test",
    value: 4,
    image: "",
    price: 5,
    stock: 2,
    sold: 5,
  },
  {
    id: 15,
    name: "Shirt Green",
    label: "Shirt Green",
    value: 15,
    image: "",
    price: 13,
    stock: 6,
    sold: 19,
  },
  {
    id: 157,
    name: "T Shirt 2244",
    label: "T Shirt 2244",
    value: 157,
    image: "",
    price: 13,
    stock: 6,
    sold: 19,
  },
];
export const categoryListData = [
  {
    id: 1,
    name: "Clothing",
    open: true,
    categories: [
      {
        id: 654,
        name: "Male Jeans",
        created_at: null,
        updated_at: "2023-05-22T16:13:30.000000Z",
        main_category_id: 122,
      },
    ],
  },
  {
    id: 2,
    name: "Bags",
    open: true,
    categories: [
      {
        id: 44,
        name: "Winter Bags",
        created_at: null,
        updated_at: "2023-05-22T16:13:30.000000Z",
        main_category_id: 12,
      },
      {
        id: 22,
        name: "Fall Bags",
        created_at: "2023-05-22T15:54:15.000000Z",
        updated_at: "2023-05-22T16:13:30.000000Z",
        main_category_id: 12,
      },
      {
        id: 9,
        name: "Vacation Bags",
        created_at: "2023-05-22T16:03:28.000000Z",
        updated_at: "2023-05-22T16:13:30.000000Z",
        main_category_id: 12,
      },
    ],
  },
  {
    id: 3,
    name: "Beauty",
    open: false,
    categories: [],
  },
  {
    id: 4,
    name: "Accessories",
    open: false,
    categories: [
      {
        id: 2,
        name: "Something",
        created_at: null,
        updated_at: "2023-05-22T16:13:30.000000Z",
        main_category_id: 14,
      },
      {
        id: 3,
        name: "Jewelery",
        created_at: "2023-05-22T15:54:15.000000Z",
        updated_at: "2023-05-22T16:13:30.000000Z",
        main_category_id: 14,
      },
      {
        id: 4,
        name: "Watches",
        created_at: "2023-05-22T16:03:28.000000Z",
        updated_at: "2023-05-22T16:13:30.000000Z",
        main_category_id: 14,
      },
    ],
  },
];

type Option = {
  value: string | number;
  label: string | number;
};

export const optionsBrand: Option[] = [
  { value: "Adidas", label: "Adidas" },
  { value: "Puma", label: "Puma" },
  { value: "Crocs", label: "Crocs" },
];
export const optionsColor: Option[] = [
  { value: "Red", label: "Red" },
  { value: "Green", label: "Green" },
  { value: "Black", label: "Black" },
];
export const optionsSize: Option[] = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
];
export const optionsPrice: Option[] = [
  { value: "50", label: "Under 50 $" },
  { value: "100", label: "Under 100 $" },
  { value: "200", label: "Under 200 $" },
];
