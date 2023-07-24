import { useState, useEffect, Fragment } from "react";
import { useProductsStore } from "../store/useProductsStore";
import "./Filter.css";

type BrandCheckboxProps = {
  brand: string;
};

const BrandCheckbox = (props: BrandCheckboxProps) => {
  const { brand } = props;
  const brandFilters = useProductsStore((state) => state.brandFilters);
  const setFilter = useProductsStore((state) => state.setFilter);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.id);
  };
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      <input
        type="checkbox"
        id={brand}
        name={brand}
        checked={brandFilters.includes(brand)}
        style={{ cursor: "inherit" }}
        onChange={handleChange}
      />
      <label htmlFor={brand} style={{ cursor: "inherit" }}>
        Brand {brand}
      </label>
    </div>
  );
};

const Filter = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const products = useProductsStore((state) => state.products);
  const filterPage = useProductsStore((state) => state.filterPage);
  const showFilterPage = useProductsStore((state) => state.showFilterPage);
  const brands = new Set(products.map((product) => product.brand));
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterPage) {
        setEntered(true);
      }
      if (!filterPage) {
        setEntered(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [filterPage]);

  return (
    <div
      style={{
        transform: entered ? "translate(0,0)" : "translate(-130%,0)",
      }}
      className="filter-page-wrapper"
    >
      <h3 style={{ marginTop: "40px" }}>Filter products to your choice</h3>
      <div
        style={{
          display: "grid",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {Array.from(brands)
          .sort()
          .map((brand) => (
            <Fragment key={brand}>
              <BrandCheckbox brand={brand} />
            </Fragment>
          ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: "0px",
          top: "0px",
          padding: "20px",
          cursor: "pointer",
          pointerEvents: "all",
        }}
        onClick={() => {
          showFilterPage();
        }}
      >
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 94.926 94.926"
        >
          <g>
            <path
              d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
		c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
		c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
		c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
		s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Filter;
