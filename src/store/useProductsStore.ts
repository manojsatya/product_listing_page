import { create } from "zustand";
import { Response, Product } from "../types";
import { fetchData } from "../services/fetchData";

const getRandomNumber = (min: number = 100, max: number = 200): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateRandomLetter = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const generateRandomColors = (): string[] => {
  return [0, 1, 2, 3].map((e) => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  });
};

interface ProductStore {
  pageNum: number;
  products: Product[];
  loading: boolean;
  showComparison: boolean;
  myBasket: boolean;
  brandFilters: string[];
  filterPage: boolean;
  alert: boolean;
  colors: string[];
  fetchProducts: (pageNum: number) => void;
  setPageNum: () => void;
  toggleCompare: (productId: number) => void;
  addToBasket: (productId: number) => void;
  showComparisonDialog: () => void;
  showMyBasket: () => void;
  setFilter: (brand: string) => void;
  showFilterPage: () => void;
  showAlert: () => void;
}

export const useProductsStore = create<ProductStore>((set, get) => ({
  pageNum: 1,
  products: [],
  loading: true,
  showComparison: false,
  myBasket: false,
  brandFilters: [],
  filterPage: false,
  alert: false,
  colors: [],
  setPageNum: () => {
    set({ pageNum: get().pageNum + 1 });
  },
  fetchProducts: async (pageNum: number) => {
    const response = await fetchData<Response[]>(
      `https://jsonplaceholder.typicode.com/photos?_page=${pageNum}`
    );
    const newResponse = response.map((product) => ({
      ...product,
      compare: false,
      inBasket: false,
      price: getRandomNumber(),
      brand: generateRandomLetter(),
      url: `https://source.unsplash.com/random/300×300/?shoe}`,
      colors: generateRandomColors(),
    }));

    const prevProducts = get().products;
    set({ products: [...prevProducts, ...newResponse], loading: false });
  },
  toggleCompare: (productId) => {
    const compareLength = get().products.filter(
      (product) => product.compare
    ).length;

    const getCompareStatus = get().products.find(
      (product) => product.id === productId
    )?.compare;

    if (compareLength < 4 || getCompareStatus) {
      const updatedProducts = get().products.map((product) => {
        if (product.id === productId) {
          product.compare = !product.compare;
        }
        return product;
      });
      set({ products: updatedProducts });
    }

    if (compareLength === 4) {
      set({ alert: !get().alert });
    }
    // if (compareLength > 4) {
    // }
  },
  addToBasket: (productId) => {
    const updatedProducts = get().products.map((product) => {
      if (product.id === productId) {
        product.inBasket = !product.inBasket;
      }
      return product;
    });

    set({ products: updatedProducts });
  },
  showComparisonDialog: () => {
    set({ showComparison: !get().showComparison });
  },
  showMyBasket: () => {
    set({ myBasket: !get().myBasket });
  },
  setFilter: (brand) => {
    const filterBrands = get().brandFilters;

    if (!filterBrands.includes(brand)) {
      set({ brandFilters: [...get().brandFilters, brand] });
    }

    if (filterBrands.includes(brand)) {
      const ne = filterBrands.filter((e) => brand !== e);
      set({ brandFilters: ne });
    }
  },
  showFilterPage: () => {
    set({ filterPage: !get().filterPage });
  },
  showAlert: () => {
    set({ alert: !get().alert });
  },
}));
