/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
//style
import classNames from "classnames/bind";
import style from "./ProductItem.module.scss";

//type
import { product } from "~/@types/product";

//components
import ModalItem from "../ModalItem";
import Button from "~/components/Button";
import { formatPrice } from "~/utils/formatPrice";
import { Link, useNavigate } from "react-router-dom";
import { dispatch, useSelector } from "~/redux/store";
import { UpdateProductInCart } from "~/redux/slices/auth";
import {
  addToFavorite,
  getFavoriteList,
  removeFromFavorite,
} from "~/redux/slices/favorite";
import Modal from "~/components/Modal";
import QRCode from "qrcode.react";
import { useSnackbar } from "notistack";
import * as productServices from "~/services/productServices";

const cx = classNames.bind(style);

type props = {
  data: product;
};

function ProductItem({ data }: props) {
  const { enqueueSnackbar } = useSnackbar();

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
    images,
    idStatus,
    rate,
  } = data;
  const [showModal, setShowModal] = useState<any>(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const handleSelectModal = () => {
    setShowModal(true);
  };

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
      dispatch(UpdateProductInCart(data, 1));
      enqueueSnackbar("Added", {
        variant: "info",
        anchorOrigin: {
          horizontal: "left",
          vertical: "bottom",
        },
      });
    }
  };
  // console.log(inCart);

  // ======================================================== FAVORITE ==============================================
  // =========================================================FAVORITE==============================================
  const { productList: favoriteList, isLoading: favorLoading } = useSelector(
    (state) => state.favorite
  );
  const { userInfor } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const isInFavoriteList = () => {
    if (userInfor) {
      let isExist = favoriteList.findIndex((product: product) => {
        if (product?.idProduct === idProduct) {
          return true;
        }
      });
      return isExist;
    }
  };

  const check = isInFavoriteList();

  const handleAddToFavorite = async () => {
    if (userInfor) {
      const params = {
        IdProduct: idProduct,
      };
      await dispatch(addToFavorite(params)).then(() => {
        dispatch(getFavoriteList());
      });
    } else {
      navigate("/login");
    }
  };

  const handleRemoveFromFavorite = async () => {
    if (userInfor) {
      const params = {
        IdProduct: idProduct,
      };
      await dispatch(removeFromFavorite(params)).then(() => {
        dispatch(getFavoriteList());
      });
    }
  };

  const [showQRCodeModal, setShowQRCodeModal] = useState<boolean>(false);

  return (
    <>
      <div className={cx("product-item")}>
        <div className={cx("image")}>
          <img src={images[0]?.link} alt="" />
        </div>
        <Link to={`/products/${idProduct}`} className={cx("content")}>
          <div className={cx("name")}>{name}</div>
          <div className={cx("price")}>{formatPrice(price)} </div>
        </Link>
        <Button
          className={cx("add-to-cart")}
          primary
          small
          onClick={handleAddToCart}
        >
          <i className="bx bx-plus"></i>
        </Button>
        <div className={cx("btn-list")}>
          {check !== -1 && check !== undefined ? (
            <div
              className={cx("btn")}
              onClick={() => handleRemoveFromFavorite()}
              style={{ color: "var(--primary-color)" }}
            >
              <i className="bx bxs-heart"></i>
            </div>
          ) : (
            <div className={cx("btn")} onClick={() => handleAddToFavorite()}>
              <i className="bx bx-heart"></i>
            </div>
          )}

          <div className={cx("btn")} onClick={handleSelectModal}>
            <i className="bx bx-show"></i>
          </div>
          <div className={cx("btn")} onClick={() => setShowQRCodeModal(true)}>
            <i className="bx bx-share-alt"></i>
          </div>
        </div>
      </div>
      {!matches && showModal && (
        <ModalItem setShowModal={setShowModal} product={data} />
      )}

      {showQRCodeModal && (
        <Modal setShowModal={setShowQRCodeModal}>
          <QRCode
            id="qrcode"
            value={`$https://garden.hahaho.xyz/products/${idProduct}`}
            size={350}
            level={"H"}
            includeMargin={true}
          />
        </Modal>
      )}
    </>
  );
}

export default ProductItem;
