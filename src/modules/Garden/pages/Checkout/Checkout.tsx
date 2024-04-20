/* eslint-disable jsx-a11y/alt-text */
import classNames from "classnames/bind";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import { dispatch, useSelector } from "~/redux/store";
import style from "./Checkout.module.scss";

import { Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { createOrder } from "~/redux/slices/order";
import { formatPrice } from "~/utils/formatPrice";
import { useNavigate } from "react-router-dom";
import Address from "~/components/Address";
import { clearAllProductInCart } from "~/redux/slices/auth";

const cx = classNames.bind(style);

function Checkout() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { productToCheckout } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { userInfor } = useSelector((state) => state.auth);

  const handleCreateOrder = async () => {
    const productConvertList = productToCheckout.map((product) => {
      return {
        [product.productInfor.idProduct]: product.amountInCart,
      };
    });

    const productOrderList = productConvertList.reduce(function (result, item) {
      var key: any = Object.keys(item)[0]; //first property: a, b, c
      result[key] = item[key];
      return result;
    }, {});

    const totalOrderCost =
      productToCheckout.reduce(
        (acc: any, item: any) =>
          acc + item.amountInCart * item.productInfor.price,
        0
      ) + delivery;

    const params = {
      products: productOrderList,
      address: address,
      shipCost: delivery,
    };

    try {
      await dispatch(createOrder(params)).then((resolve) => {
        enqueueSnackbar("Thành công", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        clearAllProductInCart();
        navigate("/auth");
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Thất bại", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const [address, setAddress] = useState<string>(
    () => userInfor?.Address ?? ""
  );

  const [delivery, setDelivery] = useState<number>(() => {
    if (address.includes("Hồ Chí Minh") || address.includes("Quận")) {
      return 20000;
    } else {
      return 35000;
    }
  });

  const handleChangeAddress = (e: any) => {
    console.log(e);
    setAddress(e);
    if (e.includes("Hồ Chí Minh") || e.includes("Quận")) {
      console.log("ok");
      setDelivery(20000);
    } else {
      setDelivery(35000);
    }
  };

  return (
    <div className="container">
      <div className={cx("checkout")}>
        <div className={cx("content")}>
          <Address
            addressValue={address}
            onChangeAddress={handleChangeAddress}
          />

          <div className={cx("product-list")}>
            {productToCheckout.map((item: any, index: number) => (
              <div className={cx("product-item")}>
                <div className={cx("image")}>
                  <img src={item.productInfor?.images[0].link} />
                </div>
                <div className={cx("infor")}>
                  <div className={cx("infor-name")}>
                    {item.productInfor?.name}
                  </div>
                  <div className={cx("infor-price")}>
                    {formatPrice(item.productInfor?.price)}
                  </div>
                </div>
                <div className={cx("amount")}>x{item.amountInCart}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("side-bar")}>
          <div className={cx("title")}>
            <div className={cx("total")}>
              {productToCheckout.length > 0 &&
                productToCheckout.reduce(
                  (acc: any, item: any) => acc + item.amountInCart,
                  0
                )}{" "}
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
          <div className={cx("title")}>
            <div className={cx("total")}>Phí vận chuyển</div>
            <div className={cx("price")}>{formatPrice(delivery)}</div>
          </div>
          <div className={cx("total")}>
            <span style={{ fontSize: "20px" }}>Tổng</span>
            <div className={cx("price")}>
              {productToCheckout.length > 0
                ? formatPrice(
                    productToCheckout.reduce(
                      (acc: any, item: any) =>
                        acc + item.amountInCart * item.productInfor.price,
                      0
                    ) + delivery
                  )
                : 0}
            </div>
          </div>
          <Button primary onClick={() => handleCreateOrder()}>
            Thanh toán
          </Button>
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

export default Checkout;
