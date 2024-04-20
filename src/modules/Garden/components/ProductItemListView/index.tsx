/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
//style
import classNames from "classnames/bind";
import style from "./ProductItemListView.module.scss";

//type
import { product } from "~/@types/product";

//components
import ModalItem from "../ModalItem";
import Button from "~/components/Button";
import Quantity from "~/components/Quantity";
import { formatPrice } from "~/utils/formatPrice";
import { UpdateProductInCart } from "~/redux/slices/auth";
import { dispatch, useSelector } from "~/redux/store";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const cx = classNames.bind(style);

type props = {
  data: product;
};

function ProductItemListView({ data }: props) {
  const {
    idProduct,
    idType,
    name,
    description,
    price,
    amount,
    priceDiscount,
    dateGen,
    linkImageDisplay,
    idStatus,
    images,
    rate,
  } = data;
  const { enqueueSnackbar } = useSnackbar();

  const [showModal, setShowModal] = useState<any>(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  const [amountToCart, setAmountToCart] = useState<number>(1);

  const { inCart } = useSelector((state) => state.auth);

  const getProductInCart = (idProduct: number) => {
    const result = inCart.find(
      (product) => product.productInfor.idProduct === idProduct
    );

    return result;
  };

  const handleAddToCart = () => {
    const product = getProductInCart(idProduct);

    if (product?.amountInCart! >= product?.productInfor.amount!) {
      enqueueSnackbar("Đã đạt số lượng tối đa", {
        variant: "error",
        anchorOrigin: {
          horizontal: "left",
          vertical: "bottom",
        },
      });
    } else {
      dispatch(UpdateProductInCart(data, amountToCart));

      enqueueSnackbar("Đã thêm vào giỏ", {
        variant: "info",
        anchorOrigin: {
          horizontal: "left",
          vertical: "bottom",
        },
      });
    }
  };

  useEffect(() => {
    window.matchMedia("(max-width: 768px)").addEventListener("change", (e) => {
      setMatches(e.matches);
    });
  }, []);
  return (
    <>
      <Link to={`/products/${idProduct}`} className={cx("product-item")}>
        <div className={cx("image")}>
          <img src={images[0]?.link} alt="" />
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>{name}</div>
          <div className={cx("price")}> {formatPrice(price)}</div>
          <div className={cx("desc")}>{description}</div>

          <div className={cx("quantity-cart")}>
            <Quantity
              number={amountToCart}
              onChangeNumber={setAmountToCart}
              maxNumber={amount}
            />
            <Button
              className={cx("add-to-cart")}
              primary
              small
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>

          {/* <div className={cx("btn-list")}>
            <div className={cx("btn")}>
              <i className="bx bx-heart"></i>
            </div>
            <div className={cx("btn")} onClick={() => setShowModal(true)}>
              <i className="bx bx-show"></i>
            </div>
            <div className={cx("btn")}>
              <i className="bx bx-share-alt"></i>
            </div>
          </div> */}
        </div>
      </Link>
      {/* {!matches && showModal && (
        <ModalItem setShowModal={setShowModal} product={data} />
      )} */}
    </>
  );
}

export default ProductItemListView;
