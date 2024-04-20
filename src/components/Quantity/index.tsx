/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { product } from "~/@types/product";
import { useSelector } from "~/redux/store";
import style from "./Quantity.module.scss";

const cx = classNames.bind(style);

type props = {
  product?: product;
  number?: number;
  onChangeNumber?: any;
  maxNumber?: any;
};

function Quantity({
  number,
  onChangeNumber,
  product,
  maxNumber = 9999,
}: props) {
  const [value, setValue] = useState<any>(number || 1);

  const { inCart } = useSelector((state) => state.auth);

  const getProductInCart = () => {
    const result = inCart.find(
      (productInCart) =>
        productInCart.productInfor.idProduct === product?.idProduct
    );

    return result;
  };

  const handlePreValue = () => {
    if (value > 1) {
      setValue(value * 1 - 1);
    }
  };

  const handleAddValue = () => {
    const productInCart = getProductInCart();

    if (
      value >= maxNumber
      // ||value + productInCart?.amountInCart >= maxNumber
    ) {
      setValue(maxNumber);
    } else {
      setValue(value * 1 + 1);
    }
  };

  const handleInputValue = (newValue: any) => {
    if (newValue >= maxNumber) {
      setValue(maxNumber);
    } else if (newValue <= 0 || isNaN(newValue)) {
      setValue(1);
    } else {
      setValue(newValue);
    }
  };

  useEffect(() => {
    if (product) {
      onChangeNumber(product, value);
    } else {
      onChangeNumber(value);
    }
  }, [value]);

  return (
    <div className={cx("quantity")}>
      <button onClick={handlePreValue}>
        <i className="bx bx-minus"></i>
      </button>
      <input
        type="number"
        disabled
        defaultValue={1}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <button onClick={handleAddValue}>
        <i className="bx bx-plus"></i>
      </button>
    </div>
  );
}

export default Quantity;
