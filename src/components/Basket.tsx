import { useProductsStore } from "../store/useProductsStore";

const Basket = () => {
  const basketProductsLength = useProductsStore((state) => {
    return state.products.filter((product) => product.inBasket).length;
  });
  const showMyBasket = useProductsStore((state) => state.showMyBasket);
  return (
    <div
      style={{
        width: "70px",
        height: "70px",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => showMyBasket()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="#000"
        className="bi bi-cart"
        viewBox="0 0 16 16"
        style={{ padding: "10px" }}
      >
        {" "}
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
      </svg>
      {basketProductsLength > 0 && (
        <span
          style={{
            position: "absolute",
            right: "0px",
            margin: "5px",
            backgroundColor: "red",
            padding: "5px",
            borderRadius: "50%",
            width: "15px",
            height: "15px",
          }}
        >
          {basketProductsLength}
        </span>
      )}
    </div>
  );
};

export default Basket;
