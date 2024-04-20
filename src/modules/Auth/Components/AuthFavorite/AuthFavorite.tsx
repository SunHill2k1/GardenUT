import react from "react";
//type
import { product } from "~/@types/product";
//style
import style from "./AuthFavorite.module.scss";
import classNames from "classnames/bind";
//router
import { Link } from "react-router-dom";
//component
import { formatPrice } from "~/utils/formatPrice";

type props = {
  favoriteList: product[];
};

const cx = classNames.bind(style);

function AuthFavorite({ favoriteList }: props) {
  return (
    <div className={cx("list-favorite")}>
      {favoriteList &&
        favoriteList.map((product) => {
          const { idProduct, images, price, description, name } = product;
          return (
            <Link to={`/products/${idProduct}`} className={cx("product-item")}>
              <div className={cx("image")}>
                <img src={images[0]?.link} alt="" />
              </div>
              <div className={cx("content")}>
                <div className={cx("name")}>{name}</div>
                <div className={cx("price")}>$ {formatPrice(price)}</div>
                <div className={cx("desc")}>{description}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default AuthFavorite;
