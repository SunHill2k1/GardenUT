import classNames from "classnames/bind";
import style from "../Products/Products.module.scss";

import ProductList from "../../components/ProductList";

import image1 from "~/access/images/image1.png";
import image4 from "~/access/images/image4.png";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import { dispatch, useSelector } from "~/redux/store";
import { getTypeProductList } from "~/redux/slices/typeProduct";
import { useParams } from "react-router-dom";

const cx = classNames.bind(style);

function Search() {
  const [listGrid, setlistGrid] = useState<boolean>(false);
  const { search } = useParams();

  const { typeProductList } = useSelector((state) => state.typeProduct);
  useEffect(() => {
    dispatch(getTypeProductList());
  }, []);

  ////////////////FILTER
  const categories = typeProductList.map((type) => ({
    id: type?.idType,
    name: type?.nameType,
  }));

  const [filterChange, setFilterChange] = useState<any>([]);

  const handleFilterChange = (filter: any) => {
    setFilterChange(filter);
  };

  const [priceRange, setPriceRange] = useState<any>({
    priceFrom: -1,
    priceTo: -1,
  });

  const handleSetPriceRange = (range: any) => {
    setPriceRange({
      priceFrom: range.priceFrom,
      priceTo: range.priceTo,
    });
  };

  return (
    <div className="container">
      <div className={cx("products-head")}>
        <div className={cx("image")}>
          <img src={image1} alt="" />
        </div>
        <div className={cx("content")}>
          <span>Get Biggest offers on Plants</span>
          <h3>Buy Plants Online</h3>
          <div className={cx("sale")}>Sale up to 80% off</div>
        </div>
        <div className={cx("image")}>
          <img src={image4} alt="" />
        </div>
      </div>
      <div className={cx("products-content")}>
        <div className={cx("filter")}>
          <Filter
            categories={categories}
            filterChange={filterChange}
            handleFilterChange={handleFilterChange}
            handleSetPrice={handleSetPriceRange}
          />
        </div>
        <div className={cx("product-list")}>
          <Sort />

          <div className={cx("pro-list-grid")}>
            <div
              className={!listGrid ? cx("pro-grid", "active") : cx("pro-grid")}
              onClick={() => setlistGrid(false)}
            >
              <i className="bx bx-grid-alt"></i>
            </div>
            <div
              className={listGrid ? cx("pro-list", "active") : cx("pro-list")}
              onClick={() => setlistGrid(true)}
            >
              <i className="bx bx-list-ul"></i>
            </div>
          </div>

          <ProductList
            listGrid={listGrid}
            setListGrid={setlistGrid}
            filterChange={filterChange}
            search={search}
            priceRangeChange={priceRange}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
