import React from "react";
//style
import style from "./SearchResult.module.scss";
import classNames from "classnames/bind";
//type
import { product } from "~/@types/product";
//ultil
import { formatPrice } from "~/utils/formatPrice";
//router
import { Link } from "react-router-dom";

//component
import ImageComponent from "~/components/ImageComponent";

const cx = classNames.bind(style);

type props = {
  resultList: product[];
};

function SearchResult({ resultList }: props) {
  console.log(resultList);

  return (
    <>
      <div className={cx("wrapper")}>
        {resultList &&
          resultList.map((result) => (
            <ResultItem key={result.idProduct} product={result} />
          ))}
      </div>
    </>
  );
}

export default SearchResult;

type resultProps = {
  product: product;
};

const ResultItem = ({ product }: resultProps) => {
  return (
    <Link to={`/products/${product.idProduct}`}>
      <div className={cx("result")}>
        <div className={cx("result-img")}>
          <ImageComponent src={product.linkImageDisplay} alt="result-img" />
        </div>
        <div className={cx("content")}>
          <h5>{product.name}</h5>
          <p> {formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
};
