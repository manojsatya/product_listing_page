import { useEffect, useState } from "react";
import "./Compare.css";
import { useProductsStore } from "../store/useProductsStore";

const Compare = () => {
  const compareProductsLength = useProductsStore((state) => {
    return state.products.filter((product) => product.compare).length;
  });
  const [entered, setEntered] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (compareProductsLength > 0) {
        setEntered(true);
      }
      if (compareProductsLength === 0) {
        setEntered(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [compareProductsLength]);

  const showComparisonDialog = useProductsStore(
    (state) => state.showComparisonDialog
  );

  return (
    <>
      {compareProductsLength > 0 && (
        <div
          style={{
            transform: entered ? "translate(0,0)" : "translate(110%,0)",
          }}
          onClick={() => showComparisonDialog()}
          className="compare-button"
        >
          Compare ({compareProductsLength})
        </div>
      )}
    </>
  );
};

export default Compare;
