/* eslint-disable jsx-a11y/alt-text */
import classNames from "classnames/bind";
import style from "./ModalItem.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useEffect, useState } from "react";
//Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { dispatch, useSelector } from "~/redux/store";
import { getProductDetail } from "~/redux/slices/product";
import { product } from "~/@types/product";
import Quantity from "~/components/Quantity";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import LoadingScreen from "~/components/LoadingScreen";
import { formatPrice } from "~/utils/formatPrice";
import { UpdateProductInCart } from "~/redux/slices/auth";
import { useSnackbar } from "notistack";

const cx = classNames.bind(style);

type modalItemProps = {
  setShowModal: any;
  product: product;
};

function ModalItem({ setShowModal, product }: modalItemProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const { enqueueSnackbar } = useSnackbar();

  const { productSelected, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetail(product.idProduct));
  }, []);

  const [ProductDetail, setProductDetail] = useState<
    product | null | undefined
  >(null);

  useEffect(() => {
    if (!isLoading) {
      setProductDetail(productSelected);
    }

    return () => {
      setProductDetail(null);
    };
  }, [isLoading, productSelected]);

  const [amountToCart, setAmountToCart] = useState<number>(1);

  const handeAddToCart = () => {
    dispatch(UpdateProductInCart(productSelected!, amountToCart));
    enqueueSnackbar("Đã thêm vào giỏ", {
      variant: "info",
      anchorOrigin: {
        horizontal: "left",
        vertical: "bottom",
      },
    });
  };

  const { inCart } = useSelector((state) => state.auth);

  const getProductInCart = () => {
    const result = inCart.find(
      (product) => product.productInfor.idProduct === productSelected?.idProduct
    );

    return result;
  };

  const productInCart = getProductInCart();

  return (
    <Modal setShowModal={setShowModal}>
      <>
        {isLoading && <LoadingScreen />}
        <div className={cx("modal-item")}>
          <div className="swiper-detail">
            <div className="gallery-top">
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {ProductDetail?.images?.map((img) => (
                  <SwiperSlide>
                    <img src={img?.link} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="gallery-thumbs">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                direction="horizontal"
                breakpoints={{
                  1024: {
                    direction: "vertical",
                  },
                }}
                watchSlidesProgress={true}
                modules={[Thumbs]}
              >
                {ProductDetail?.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img?.link} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={cx("detail")}>
            <h3 className={cx("title")}>{ProductDetail?.name}</h3>
            <div className={cx("price")}>
              {ProductDetail?.price && formatPrice(ProductDetail?.price)}
            </div>
            <div className={cx("desc")}>{ProductDetail?.description}</div>
            <div className={cx("quantity")}>
              Số lượng
              <Quantity
                number={amountToCart}
                onChangeNumber={setAmountToCart}
                maxNumber={
                  productInCart && ProductDetail
                    ? ProductDetail?.amount - productInCart.amountInCart
                    : ProductDetail?.amount
                }
              />
            </div>
            <Button
              primary
              className={cx("add-to-cart")}
              onClick={handeAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default ModalItem;
