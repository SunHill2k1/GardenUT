/* eslint-disable jsx-a11y/alt-text */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { product } from "~/@types/product";
import Button from "~/components/Button";
import Quantity from "~/components/Quantity";
import {
  addProductToCheckout,
  removeProductInCart,
  UpdateProductInCart,
} from "~/redux/slices/auth";
import { dispatch, useSelector } from "~/redux/store";
import { formatPrice } from "~/utils/formatPrice";
import style from "./Cart.module.scss";

const cx = classNames.bind(style);

const listProducts = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
];

function Cart() {
  const [products, setProducts] = useState<any>(() => {
    return JSON.parse(localStorage.getItem("inCart")!) ?? [];
  });

  const { inCart } = useSelector((state) => state.auth);

  let productToCheckout = products.filter((item: any) => item?.isChecked);

  useEffect(() => {
    setProducts(inCart);
  }, [inCart]);

  const handleChangeSelectAll = (e: any) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempProducts = products.map((item: any) => {
        return { ...item, isChecked: checked };
      });
      setProducts(tempProducts);
    } else {
      let tempProducts = products.map((item: any) => {
        return item.productInfor.idProduct == name
          ? { ...item, isChecked: checked }
          : item;
      });
      setProducts(tempProducts);
    }
  };

  const handleRemoveProduct = (indexInCart: number) => {
    dispatch(removeProductInCart(indexInCart));
  };

  const handleDeleteAll = () => {
    dispatch(removeProductInCart(1, "deleteAll"));
  };

  const updateAmountProductInCart = (
    product: product,
    newAmountValue: number
  ) => {
    // console.log(product);
    // console.log(newAmountValue);
    dispatch(UpdateProductInCart(product, newAmountValue, true));
  };

  const { userInfor } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!userInfor) {
      return navigate("/login");
    }
    dispatch(addProductToCheckout(productToCheckout));
    navigate("/checkout");
  };

  return (
    <div className="container">
      <div className={cx("cart")}>
        <div className={cx("list-product")}>
          <div className={cx("title-cart")}>
            <div className={cx("btn-check")}>
              <input
                type="checkbox"
                name="allSelect"
                checked={
                  products.filter((item: any) => item?.isChecked !== true)
                    .length < 1
                }
                onChange={handleChangeSelectAll}
              />
              <span>Tất cả</span>
            </div>

            <div>
              <Button
                iconOnly
                rightIcon={<i className="bx bx-trash"></i>}
                className={cx("btn-delete")}
                onClick={handleDeleteAll}
              ></Button>
            </div>
          </div>
          <div>
            {products.map((item: any, index: any) => {
              const { productInfor, amountInCart } = item;
              //
              return (
                <div className={cx("item")} key={index}>
                  <div className={cx("btn-check")}>
                    <input
                      type="checkbox"
                      name={item.productInfor.idProduct}
                      checked={item?.isChecked || false}
                      onChange={handleChangeSelectAll}
                    />
                  </div>
                  <div className={cx("image")}>
                    <img src={productInfor?.images[0].link} />
                  </div>
                  <div className={cx("desc")}>
                    <div className={cx("title")}>{productInfor?.name}</div>

                    <div className={cx("price")}>
                      {formatPrice(productInfor?.price)}
                    </div>
                    <div>
                      <Quantity
                        number={amountInCart}
                        product={productInfor}
                        onChangeNumber={updateAmountProductInCart}
                        maxNumber={productInfor?.amount}
                      />
                    </div>
                    <div className={cx("total")} style={{ width: "100px" }}>
                      {formatPrice(amountInCart * productInfor?.price)}
                    </div>
                  </div>
                  <div>
                    <Button
                      iconOnly
                      rightIcon={<i className="bx bx-trash"></i>}
                      className={cx("btn-delete")}
                      onClick={() => handleRemoveProduct(index)}
                    ></Button>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/" className={cx("continue-shopping")}>
            <i className="bx bx-chevron-left"></i>
            Tiếp tục mua hàng
          </Link>
        </div>

        <div className={cx("side-bar")}>
          <div className={cx("title")}>
            <div className={cx("total")}>
              {productToCheckout.length > 0
                ? productToCheckout.reduce(
                    (acc: any, item: any) => acc + item.amountInCart,
                    0
                  )
                : 0}{" "}
              sản phẩm
            </div>
            <div className={cx("price")}>
              {productToCheckout.length > 0
                ? formatPrice(
                    productToCheckout.reduce(
                      (acc: any, item: any) =>
                        acc + item.amountInCart * item.productInfor.price,
                      0
                    )
                  )
                : 0}
            </div>
          </div>

          <div className={cx("total")}>
            <span>Tổng</span>
            <div className={cx("price")}>
              {productToCheckout.length > 0
                ? formatPrice(
                    productToCheckout.reduce(
                      (acc: any, item: any) =>
                        acc + item.amountInCart * item.productInfor.price,
                      0
                    )
                  )
                : 0}
            </div>
          </div>
          {productToCheckout.length > 0 ? (
            <Button primary onClick={handleCheckout}>
              Tiến hành thanh toán
            </Button>
          ) : (
            <Button primary disabled>
              Tiến hành thanh toán
            </Button>
          )}
          <div className={cx("policies")}>
            <div className={cx("item")}>
              <div className={cx("icon")}>
                <i className="bx bx-lock"></i>
              </div>
              <span>Chính sách bảo mật</span>
            </div>
            <div className={cx("item")}>
              <div className={cx("icon")}>
                <i className="bx bxs-truck"></i>
              </div>
              <span>Chính sách giao hàng</span>
            </div>
            <div className={cx("item")}>
              <div className={cx("icon")}>
                <i className="bx bxs-package"></i>
              </div>
              <span>Chính sách hoàn trả</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
