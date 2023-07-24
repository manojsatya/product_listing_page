import { useRef, useCallback, useState } from "react";
import { Product } from "../types";
import { useProductsStore } from "../store/useProductsStore";
import "./ProductItem.css";

interface ProductItemProps
  extends Pick<
    Product,
    | "id"
    | "url"
    | "title"
    | "compare"
    | "price"
    | "inBasket"
    | "brand"
    | "colors"
  > {
  productIndex: number;
}

const ProductItem = (props: ProductItemProps) => {
  const {
    title,
    url,
    id,
    productIndex,
    compare,
    price,
    inBasket,
    brand,
    colors,
  } = props;
  const setPageNum = useProductsStore((state) => state.setPageNum);
  const loading = useProductsStore((state) => state.loading);
  const products = useProductsStore((state) => state.products);
  const toggleCompare = useProductsStore((state) => state.toggleCompare);
  const addToBasket = useProductsStore((state) => state.addToBasket);
  const lastProductObserver = useRef<IntersectionObserver>();
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const lastProductRef = useCallback(
    (lastProduct) => {
      if (loading) return;

      if (lastProductObserver.current) lastProductObserver.current.disconnect();

      lastProductObserver.current = new IntersectionObserver((products) => {
        if (products[0].isIntersecting) {
          setPageNum();
        }
      });

      if (lastProduct) lastProductObserver.current.observe(lastProduct);
    },
    [loading, setPageNum]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleCompare(parseInt(event.currentTarget.id));
  };

  if (productIndex + 1 === products.length) {
    return (
      <div className="product-wrapper" ref={lastProductRef}>
        <img
          src={url}
          alt={url}
          style={{ width: "100%", transition: "200ms all ease" }}
        />
        <span style={{ position: "absolute", left: 0 }}>{id}</span>
        <p className="product-title">{title}</p>
        <div style={{ position: "absolute" }}>
          <input
            type="checkbox"
            id={id.toString()}
            name={id.toString()}
            checked={compare}
            onChange={handleChange}
          />
          <label htmlFor={id.toString()}>Add to compare</label>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-wrapper"
      onMouseOver={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <img
        src={url}
        alt={url}
        style={{
          width: "100%",
          transition: "200ms all ease",
          scale: showInfo ? "1.03" : "1",
          filter: showInfo ? "brightness(0.7) saturate(0.5)" : "none",
        }}
      />

      <span className="product-brand">Brand - {brand}</span>
      <div
        style={{
          position: "absolute",
          color: "white",
          zIndex: 1,
          bottom: showInfo ? "20%" : "0%",
          height: showInfo ? "100px" : "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          fontStyle: "italic",
          transition: "300ms all ease",
        }}
      >
        <div style={{ display: "grid" }}>
          <span>{showInfo && title}</span>
          {showInfo && (
            <div className="product-color-wrapper">
              {colors.map((color) => (
                <div
                  style={{
                    backgroundColor: color,
                  }}
                  className="product-color"
                  key={color}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="product-add-to-compare" onClick={() => toggleCompare(id)}>
        <input
          type="checkbox"
          id={id.toString()}
          name={id.toString()}
          checked={compare}
          style={{ cursor: "inherit" }}
          onChange={handleChange}
        />
        <label htmlFor={id.toString()} style={{ cursor: "inherit" }}>
          Add to compare
        </label>
      </div>
      <div className="product-price-add-to-bucket-wrapper ">
        <span style={{ margin: "20px" }}>&#8364; {price}</span>

        {!inBasket && (
          <span style={{ margin: "20px" }} onClick={() => addToBasket(id)}>
            &#8853;
          </span>
        )}
        {inBasket && (
          <span style={{ margin: "20px" }} onClick={() => addToBasket(id)}>
            Remove
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
