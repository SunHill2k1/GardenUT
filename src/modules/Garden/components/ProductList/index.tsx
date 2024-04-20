/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
//style
import classNames from "classnames/bind";
import style from "./ProductList.module.scss";

//type
import { product } from "~/@types/product";

//redux
import { useDispatch, useSelector } from "~/redux/store";

//components
import { useParams } from "react-router-dom";
import LoadingScreen from "~/components/LoadingScreen";
import Pagination from "~/components/Pagination";
import { getProducts } from "~/redux/slices/product";
import ProductItem from "../ProductItem";
import ProductItemListView from "../ProductItemListView";

const cx = classNames.bind(style);

type Props = {
  listGrid: boolean;
  setListGrid: Function;
  search?: string;
  filterChange?: any;
  sortChange?: any;
  priceRangeChange: any;
};

function ProductList({
  listGrid,
  setListGrid,
  search,
  filterChange,
  sortChange,
  priceRangeChange,
}: Props) {
  const { productList, totalRecord, isLoading } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  //==================================================================RESPONSIVE
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window.matchMedia("(max-width: 768px)").addEventListener("change", (e) => {
      setMatches(e.matches);
      setListGrid(false);
    });
  }, []);

  // ======================================================================== SORT ===========================================

  const [sort, setSort] = useState<any>({
    orderBy: "IdType",
    isAes: false,
  });

  useEffect(() => {
    if (sortChange === "ascending" || sortChange === "descending") {
      setSort({
        orderBy: "Price",
        isAes: sortChange === "ascending" ? true : false,
      });
    }
    setPagination({ ...pagination, pageIndex: 0 });
  }, [sortChange]);

  // ========================================================================PAGINATION
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleChangePageIndex = (page: number) => {
    setPagination({ ...pagination, pageIndex: page });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangePageSize = (pageSize: number) => {
    setPagination({ pageIndex: 0, pageSize: pageSize });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let params = {};
    if (search) {
      params = {
        idType: filterChange.length ? filterChange : -1,
        orderBy: sort?.orderBy,
        isAes: sort?.isAes,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search: search,
        priceFrom: priceRangeChange.priceFrom || -1,
        priceTo: priceRangeChange.priceTo || -1,
      };
    } else {
      params = {
        idType: filterChange.length ? filterChange : -1,
        orderBy: sort?.orderBy,
        isAes: sort?.isAes,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        priceFrom: priceRangeChange.priceFrom || -1,
        priceTo: priceRangeChange.priceTo || -1,
      };
    }
    dispatch(getProducts(params));
  }, [pagination, search, sort]);

  // ===================================================================== FILTER ===========================================

  useEffect(() => {
    let params = {
      pageIndex: 0,
      pageSize: pagination.pageSize,
      idType: filterChange.length ? filterChange : -1,
      search: search || "",
      priceFrom: priceRangeChange.priceFrom || -1,
      priceTo: priceRangeChange.priceTo || -1,
    };

    dispatch(getProducts(params));
    setPagination({ ...pagination, pageIndex: 0 });
  }, [filterChange, priceRangeChange]);

  // useEffect(() => {
  //   let params = {};
  //   if (sortChange === "ascending" || sortChange === "descending")
  //     params = {
  //       pageIndex: 0,
  //       pageSize: pagination.pageSize,
  //       idType: filterChange.length ? filterChange : -1,
  //       search: search || "",
  //       orderBy: "Price",
  //       AES: sortChange === "ascending" ? true : false,
  //     };
  //   dispatch(getProducts(params));
  //   setPagination({ ...pagination, pageIndex: 0 });
  // }, [sortChange]);

  return (
    <>
      {!listGrid ? (
        <div className={cx("product-grid")}>
          {isLoading && <LoadingScreen />}
          {productList &&
            productList.map((product: product, index) => (
              <ProductItem key={index} data={product} />
            ))}
        </div>
      ) : (
        <div className={cx("product-list")}>
          {isLoading && <LoadingScreen />}
          {productList &&
            productList.map((product: product, index) => (
              <ProductItemListView key={index} data={product} />
            ))}
        </div>
      )}

      <Pagination
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        totalRecord={totalRecord}
        onChangePageIndex={handleChangePageIndex}
        onChangePageSize={handleChangePageSize}
      />
    </>
  );
}
export default ProductList;
