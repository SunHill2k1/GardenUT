/* eslint-disable react-hooks/exhaustive-deps */
//style
import style from "./Products.module.scss";
//type
import { product } from "~/@types/product";

// MUI
import {
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";

//redux
import { useSelector, dispatch } from "~/redux/store";

//component
import Button from "~/components/Button";
import ProductTableToolbar from "../../components/ProductTable/ProductTableToolbar";
import ProductTableRow from "../../components/ProductTable/ProductTableRow";
import TableHeadCustom from "../../components/ProductTable/TableHeadCustom";
import LoadingScreen from "~/components/LoadingScreen";
import { useEffect, useState } from "react";
import { getProducts } from "~/redux/slices/product";
import { getTypeProductList } from "~/redux/slices/typeProduct";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { removeProduct } from "~/redux/slices/product";

const PRODUCT_HEAD_TABLE = [
  // { id: "", label: "TT", align: "center", width: 80 },
  {
    id: "idProduct",
    label: "ID",
    sortLabel: "IdProduct",
    align: "center",
    width: 80,
  },
  {
    id: "idType",
    label: "Loại",
    sortLabel: "IdType",
    align: "center",
    width: 170,
  },
  {
    id: "name",
    label: "Sản phẩm",
    sortLabel: "Name",
    align: "left",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Giá",
    sortLabel: "Price",
    align: "center",
    minWidth: 100,
  },
  {
    id: "amount",
    label: "Số lượng",
    sortLabel: "Amount",
    align: "center",
    minWidth: 100,
  },
  // {
  //   id: "removeButton",
  //   label: "execute",
  //   sortLabel: "Amount",
  //   align: "center",
  //   minWidth: 100,
  // },
];

const NO_SORT = [];

const cx = classNames.bind(style);

function Products() {
  // REDUX
  const { productList, isLoading, totalRecord } = useSelector(
    (state) => state.product
  );

  const { typeProductList } = useSelector((state) => state.typeProduct);

  let optiontypeProduct: any = typeProductList.map((type) => ({
    ...type,
    id: type?.idType,
    name: type?.nameType,
  }));
  optiontypeProduct = [{ id: -1, name: "Khác" }, ...optiontypeProduct];

  useEffect(() => {
    dispatch(getTypeProductList());
  }, []);

  //======================================================== PAGINATION ==============================================================

  type pagination = {
    pageSize: number;
    pageIndex: number;
  };
  const [pagination, setPagination] = useState<pagination>({
    pageIndex: 0,
    pageSize: 5,
  });

  const handleChangePage = (_: any, newPage: number) => {
    setPagination({ ...pagination, pageIndex: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({
      pageSize: Number(event.target.value),
      pageIndex: 0,
    });
  };

  useEffect(() => {
    const params = {
      ...pagination,
      ...sort,
      idType: filterTypeProduct,
      search: searchValue,
    };
    dispatch(getProducts(params));
  }, [pagination]);

  // ===================================================================== FILTER =============================================
  const [filterTypeProduct, setFilterTypeProduct] = useState<any>(-1);

  const onFilterTypeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({ ...pagination, pageIndex: 0 });
    // setSeachValue("");
    setFilterTypeProduct(event.target.value);
  };

  // ===================================================================== SORT ==============================================
  const [sort, setSort] = useState<any>({
    orderBy: "IdType",
    isAes: false,
  });

  const handleSort = (sortLabel: number) => {
    if (sort.orderBy === sortLabel) {
      setSort({ ...sort, isAes: !sort.isAes });
    } else {
      setSort({ orderBy: sortLabel, isAes: false });
    }
    // setFilterTypeProduct(-1);
    // setSeachValue("");
    setPagination({ ...pagination, pageIndex: 0 });
  };

  useEffect(() => {
    const params = {
      ...pagination,
      search: searchValue,
      idType: filterTypeProduct,
      ...sort,
    };
    dispatch(getProducts(params));
  }, [sort, filterTypeProduct]);

  // ===================================================================== SEARCH =============================================

  const [searchValue, setSeachValue] = useState<string>("");
  const handleSearch = (searchTitle: string) => {
    setSeachValue(searchTitle);
  };

  const handleKeyUp = (event: any) => {
    const inputValue = event.target.value;
    if (event.key === "Enter" || inputValue.length === 0) {
      const { pageIndex, pageSize } = pagination;
      setPagination({ pageSize, pageIndex: 0 });
      setSort({
        orderBy: "IdType",
        order: false,
      });
      setFilterTypeProduct(-1);

      const params = {
        ...sort,
        ...pagination,
        idType: filterTypeProduct,
        search: searchValue,
      };
      dispatch(getProducts(params));
    }
  };

  // ===================================================================== SELECTED ============================================
  const navigate = useNavigate();
  const handleSelectedProduct = (e: product) => {
    navigate("/admin/product/edit/" + e?.idProduct);
  };

  // ===================================================================== REMOVE ===============================================

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <h1 style={{ fontWeight: 500 }}>Quản lý sản phẩm</h1>
        <Link
          className={cx("create-btn")}
          style={{
            padding: "5px 10px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            fontSize: "20px",
            cursor: "pointer",
          }}
          to="/admin/products/upload"
        >
          Thêm sản phẩm
        </Link>
      </Stack>
      <ProductTableToolbar
        // filter
        optionTypeProduct={optiontypeProduct}
        filterTypeValue={filterTypeProduct}
        onFilterType={onFilterTypeProduct}
        // search
        onSearch={handleSearch}
        onPress={handleKeyUp}
        searchValue={searchValue}
      />

      <TableContainer
        sx={{
          minHeight: "350px",
          maxHeight: "calc(100vh - 308px)",
          overflowY: "overlay",
        }}
      >
        {isLoading && <LoadingScreen />}
        <Table stickyHeader aria-label="sticky table">
          <TableHeadCustom
            order={sort.orderBy ? "desc" : "asc"}
            orderBy={sort.label}
            headLabel={PRODUCT_HEAD_TABLE}
            onSort={handleSort}
          />
          <TableBody>
            {productList?.map((product) => (
              <ProductTableRow
                tableHead={PRODUCT_HEAD_TABLE}
                key={product?.idProduct}
                row={product}
                handleClick={() => handleSelectedProduct(product)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        labelRowsPerPage="Số dòng hiển thị"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} trên tổng số ${count}`
        }
        component="div"
        count={totalRecord}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Products;
