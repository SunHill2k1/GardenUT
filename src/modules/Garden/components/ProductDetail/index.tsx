import classNames from "classnames/bind";
import style from "./ProductDetail.module.scss";

//Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Quantity from "~/components/Quantity";
import Button from "~/components/Button";
import { dispatch, useSelector } from "~/redux/store";
import { getProductDetail, getProducts } from "~/redux/slices/product";
import { formatPrice } from "~/utils/formatPrice";
import { authGetInfor, UpdateProductInCart } from "~/redux/slices/auth";
import ProductItem from "../ProductItem";
import {
  addToFavorite,
  getFavoriteList,
  removeFromFavorite,
} from "~/redux/slices/favorite";
import { product } from "~/@types/product";
import LoadingScreen from "~/components/LoadingScreen";
import { useSnackbar } from "notistack";

const cx = classNames.bind(style);

const navTab = [
  { title: "Kho hàng", content: "" },
  { title: "Đánh giá", content: "" },
];

function ProductDetail() {
  const { enqueueSnackbar } = useSnackbar();

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<any>(0);
  let { id }: any = useParams();

  const { productSelected, productList, isLoading } = useSelector(
    (state) => state.product
  );

  const { inCart } = useSelector((state) => state.auth);

  const getProductInCart = () => {
    const result = inCart.find(
      (product) => product.productInfor.idProduct === productSelected?.idProduct
    );

    return result;
  };

  const productInCart = getProductInCart();

  const [amountToCart, setAmountToCart] = useState<number>(1);

  const handeAddToCart = () => {
    if (productSelected) {
      console.log(amountToCart);
      dispatch(UpdateProductInCart(productSelected, amountToCart));
      enqueueSnackbar("Đã thêm vào giỏ", {
        variant: "info",
        anchorOrigin: {
          horizontal: "left",
          vertical: "bottom",
        },
      });
      console.log(inCart);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(getProductDetail(id));
  }, [id]);

  /////////////////////////////////////product related
  // useEffect(() => {
  //   if (productSelected) {
  //     let params = {
  //       idType: productSelected?.idType,
  //     };

  //     dispatch(getProducts(params));
  //   }
  // }, [productSelected?.idType]);

  // =========================================================FAVORITE==============================================
  const { productList: favoriteList, isLoading: favorLoading } = useSelector(
    (state) => state.favorite
  );
  const { userInfor } = useSelector((state) => state.auth);

  // console.log(userInfor);

  const navigate = useNavigate();

  const isInFavoriteList = () => {
    let isExist = favoriteList.findIndex((product: product) => {
      if (product?.idProduct === productSelected?.idProduct) {
        return true;
      }
    });
    return isExist;
  };

  const check = isInFavoriteList();

  const handleAddToFavorite = async () => {
    if (userInfor) {
      const params = {
        IdProduct: productSelected?.idProduct,
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
        IdProduct: productSelected?.idProduct,
      };
      await dispatch(removeFromFavorite(params)).then(() => {
        dispatch(getFavoriteList());
      });
    }
  };

  return (
    <div className="container">
      {(favorLoading || isLoading) && <LoadingScreen />}
      {productSelected && (
        <>
          {" "}
          <div className={cx("product-detail")}>
            <div className="swiper-product-detail">
              <div className="gallery-top">
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                >
                  {productSelected?.images.map((image, index) => (
                    <SwiperSlide>
                      <img src={image.link} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="gallery-thumbs">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  direction="horizontal"
                  watchSlidesProgress={true}
                  modules={[Thumbs]}
                >
                  {productSelected?.images.map((image, index) => (
                    <SwiperSlide className={cx("image-item")}>
                      <img src={image.link} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className={cx("detail")}>
              <h3 className={cx("title")}>{productSelected?.name}</h3>
              <div className={cx("price")}>
                {productSelected?.price && formatPrice(productSelected?.price)}
              </div>
              <div className={cx("desc")}>{productSelected?.description}</div>
              <div className={cx("quantity")}>
                Số lượng
                <Quantity
                  // product={productSelected}
                  number={amountToCart}
                  onChangeNumber={setAmountToCart}
                  maxNumber={
                    productInCart
                      ? productSelected?.amount - productInCart.amountInCart
                      : productSelected?.amount
                  }
                />
              </div>
              <div className={cx("add-favor")}>
                <Button
                  disabled={
                    productInCart &&
                    productInCart.amountInCart >=
                      productInCart.productInfor.amount
                  }
                  primary
                  className={cx("add-to-cart")}
                  onClick={handeAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>

                {check !== -1 ? (
                  <div
                    className={cx("btn-favor")}
                    onClick={() => handleRemoveFromFavorite()}
                  >
                    <div className={cx("icon")}>
                      <i className="bx bxs-heart"></i>
                    </div>
                    <span>Bỏ yêu thích</span>
                  </div>
                ) : (
                  <div
                    className={cx("btn-favor")}
                    onClick={() => handleAddToFavorite()}
                  >
                    <div className={cx("icon")}>
                      <i className="bx bx-heart"></i>
                    </div>
                    <span>Thêm vào yêu thích</span>
                  </div>
                )}
              </div>
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
        </>
      )}

      <div className={cx("tabs")}>
        <div className={cx("nav")}>
          {navTab.map((nav, i) => (
            <div
              key={i}
              className={
                i == activeTab ? cx("nav-item", "active") : cx("nav-item")
              }
              onClick={() => setActiveTab(i)}
            >
              {nav.title}
            </div>
          ))}
        </div>
        <div className={cx("content")}>
          {navTab[activeTab].title === "Kho hàng" ? (
            <p>Số lượng trong kho: {productSelected?.amount}</p>
          ) : (
            navTab[activeTab].content
          )}
        </div>
      </div>

      {productList && (
        <div className={cx("related")}>
          <div className={cx("title")}>
            <h4>Sản phẩm liên quan</h4>
          </div>
          <div className={cx("list-products")}>
            {productList.slice(0, 9).map((item, index) => (
              <div key={index}>
                <ProductItem data={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
