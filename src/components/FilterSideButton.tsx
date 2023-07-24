import { useProductsStore } from "../store/useProductsStore";

const FilterSideButton = () => {
  const showFilterPage = useProductsStore((state) => state.showFilterPage);
  return (
    <div
      style={{
        position: "fixed",
        left: "0px",
        zIndex: "5",
        top: "0px",
        padding: "20px",
        cursor: "pointer",
      }}
      onClick={() => showFilterPage()}
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 18L20 18"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 12L20 12"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 6L20 6"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default FilterSideButton;
