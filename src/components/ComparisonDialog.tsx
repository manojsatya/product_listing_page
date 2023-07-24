import { Fragment } from "react";
import { useProductsStore } from "../store/useProductsStore";
import "./ComparisonDialog.css";

type ComparisonRowProps = {
  categoryValues: string[] | number[];
  category: string;
};

const ComparisonRow = (props: ComparisonRowProps) => {
  const { category, categoryValues } = props;

  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        gridTemplateColumns: `repeat(${categoryValues.length + 1}, 1fr)`,
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: category ? "antiquewhite" : "",
        }}
        className="comparison-category"
      >
        {category}
      </div>
      {categoryValues.map((product) => (
        <Fragment key={product}>
          <div className="category-values-row">{product}</div>
        </Fragment>
      ))}
    </div>
  );
};

const ComparisonDialog = () => {
  const compareProducts = useProductsStore((state) => {
    return state.products.filter((product) => product.compare);
  });

  const ids = compareProducts.map((product) => product.id);
  const prices = compareProducts.map((product) => product.price);
  const titles = compareProducts.map((product) => product.title);
  const showComparisonDialog = useProductsStore(
    (state) => state.showComparisonDialog
  );

  return (
    <div className="comparison-dialog-layout">
      <div
        style={{
          width: "80%",
          height: "60%",
          backgroundColor: "white",
          padding: "20px",
          position: "relative",
        }}
      >
        <h2>Product Comparison page</h2>
        <ComparisonRow category="Product ID" categoryValues={ids} />
        <ComparisonRow category="Title" categoryValues={titles} />
        <ComparisonRow category="Price" categoryValues={prices} />
        <div
          style={{ display: "flex", justifyContent: "end" }}
          onClick={() => showComparisonDialog()}
        >
          <button style={{ width: "20%", height: "30px" }}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonDialog;
