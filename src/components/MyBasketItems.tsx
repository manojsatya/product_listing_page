import { Fragment, useEffect, useState } from "react";
import { useProductsStore } from "../store/useProductsStore";
import "./MyBasketItems.css";

const MyBasketItems = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const basketProducts = useProductsStore((state) => {
    return state.products.filter((product) => product.inBasket);
  });
  const myBasket = useProductsStore((state) => state.myBasket);
  const showMyBasket = useProductsStore((state) => state.showMyBasket);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (myBasket) {
        setEntered(true);
      }
      if (!myBasket) {
        setEntered(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [myBasket]);

  const total = basketProducts
    .map((product) => product.price)
    .reduce((a, b) => a + b, 0);

  return (
    <div
      style={{
        transform: entered ? "translate(0,0)" : "translate(110%,0)",
      }}
      className="bucket-items-wrapper"
    >
      <h2>My Basket ({basketProducts.length})</h2>
      <hr></hr>
      {basketProducts.length === 0 && <h4>Your bucket is empty</h4>}
      {basketProducts.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <b>Title</b>
            <b>Product ID</b>
            <b>Price</b>
          </div>
          {basketProducts.map((product) => {
            return (
              <Fragment key={product.id}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <p>{product.title}</p>
                  <p>{product.id}</p>
                  <p>&#8364;{product.price}</p>
                </div>
              </Fragment>
            );
          })}
          <hr></hr>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <p>Total</p>
            <p>{""}</p>
            <p>&#8364;{total}</p>
          </div>
        </>
      )}
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
          showMyBasket();
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

export default MyBasketItems;
