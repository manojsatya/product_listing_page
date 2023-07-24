import { useState, useEffect } from "react";
import { useProductsStore } from "../store/useProductsStore";
import "./Alert.css";

const Alert = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const showAlert = useProductsStore((state) => state.showAlert);
  const alert = useProductsStore((state) => state.alert);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alert) {
        setEntered(true);
        setTimeout(() => {
          setEntered(false);
          showAlert();
        }, 2500);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [alert, showAlert]);

  return (
    <div
      style={{
        transform: entered ? "translate(0,0)" : "translate(150%,0)",
      }}
      className="alert"
    >
      You can add only 4 items to compare
    </div>
  );
};

export default Alert;
