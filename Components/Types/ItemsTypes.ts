export type ItemType = {
  id?: number;
  name: string;
  price: number | null;
  stock: number | null;
  brand: string;
  color: string;
  size: OptionSelect[];
  sold?: number;
  image: string | File;
  categories: CategoryType[];
};

export interface CategoryType extends OptionSelect {
  id: number;
  name: string;
  main_category_id: number;
}

export type OptionSelect = {
  label: string;
  value: string | number;
};
