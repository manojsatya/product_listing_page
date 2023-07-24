import { useEffect, Fragment, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Compare from "./components/Compare";
import Basket from "./components/Basket";
import { useProductsStore } from "./store/useProductsStore";
import ProductItem from "./components/ProductItem";
import ComparisonDialog from "./components/ComparisonDialog";
import MyBasketItems from "./components/MyBasketItems";
import Filter from "./components/Filter";
import { Product } from "./types";
import FilterSideButton from "./components/FilterSideButton";
import Alert from "./components/Alert";

function App() {
  const [fixedHeader, setFixedHeader] = useState<boolean>(false);
  const pageNum = useProductsStore((state) => state.pageNum);
  const products = useProductsStore((state) => state.products);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);
  const showComparison = useProductsStore((state) => state.showComparison);
  const brandFilters = useProductsStore((state) => state.brandFilters);

  useEffect(() => {
    fetchProducts(pageNum);
    const App = document.getElementById("AppWrapper");

    window.addEventListener("scroll", () => {
      if (App) {
        const AppRectTop = -1 * App?.getBoundingClientRect().top;

        if (AppRectTop > 0) {
          setFixedHeader(true);
        } else {
          setFixedHeader(false);
        }
      }
    });
  }, [pageNum, fetchProducts]);

  const getFilterProducts = (): Product[] => {
    if (brandFilters.length === 0) return products;
    if (brandFilters.length !== 0) {
      return products.filter((product) => brandFilters.includes(product.brand));
    }
    return products;
  };

  return (
    <div className="App">
      <div
        style={{
          position: fixedHeader ? "fixed" : "relative",
        }}
        className="product-basket-wrapper"
      >
        <Basket />
      </div>

      <Compare />

      <div className="product-list-wrapper" id="AppWrapper">
        {products &&
          getFilterProducts().map((e, index) => (
            <Fragment key={e.id}>
              <ProductItem
                title={e.title}
                id={e.id}
                url={e.url}
                productIndex={index}
                compare={e.compare}
                price={e.price}
                inBasket={e.inBasket}
                brand={e.brand}
                colors={e.colors}
              />
            </Fragment>
          ))}
      </div>

      {ReactDOM.createPortal(
        showComparison && <ComparisonDialog />,
        document.getElementById("root") ?? document.body
      )}
      <MyBasketItems />
      <Filter />
      <FilterSideButton />
      <Alert />
    </div>
  );
}

export default App;
