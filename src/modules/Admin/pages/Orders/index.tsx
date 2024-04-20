import react, { useEffect, useState } from "react";
//style
import classNames from "classnames/bind";

//type
import { user } from "~/@types/user";

// MUI
import {
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";

// redux
import { useSelector, dispatch } from "~/redux/store";

//router
import { useNavigate } from "react-router-dom";

// components
import OrderTableToolbar from "../../components/OrderTable/OrderTableToolbar";
import TableHeadCustom from "../../components/OrderTable/TableHeadCustom";
import LoadingScreen from "~/components/LoadingScreen";
import OrderTableRow from "../../components/OrderTable/OrderTableRow";
import {
  getAllOrderList,
  getOrderDetail,
  updateStatusOrder,
} from "~/redux/slices/order";
import { order } from "~/@types/order";
import { Dayjs } from "dayjs";
import { convertDate } from "~/utils/formatDate";
import ModalOrder from "../../components/ModalOrder";

const OPTIONS_STATUS = [
  { id: -1, name: "Tất cả" },
  { id: 6, name: "Đã xác nhận" },
  { id: 5, name: "Chờ xác nhận" },
  { id: 7, name: "Hủy" },
  { id: 8, name: "Đang giao" },
  { id: 9, name: "Đã giao" },
];

const ORDER_HEAD_TABLE = [
  // { id: "", label: "TT", align: "center", width: 80 },
  {
    id: "idOrder",
    label: "ID",
    sortLabel: "IdOrder",
    align: "center",
    width: 80,
  },
  {
    id: "fullName",
    label: "Khách",
    sortLabel: "FullName",
    align: "center",
    width: 150,
  },
  {
    id: "phoneNumber",
    label: "Sđt",
    sortLabel: "PhoneNumber",
    align: "left",
    width: 120,
  },
  {
    id: "addressOrder",
    label: "Địa chỉ",
    sortLabel: "AddressOrder",
    align: "center",
    minWidth: 180,
  },
  {
    id: "dateOrder",
    label: "Ngày đặt",
    sortLabel: "DateOrder",
    align: "center",
    width: 150,
  },
  {
    id: "totalCost",
    label: "Tiền",
    sortLabel: "TotalCost",
    align: "center",
    width: 100,
  },
  {
    id: "status",
    label: "Trạng thái",
    sortLabel: "Status",
    align: "center",
    width: 80,
  },
];

function Orders() {
  const { orderList, isLoading, totalRecord } = useSelector(
    (state) => state.order
  );

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
      fromDate,
      toDate,
      filter: filterStatus,
      search: searchValue,
    };
    dispatch(getAllOrderList(params));
  }, [pagination]);

  // ===================================================================== FILTER =============================================
  const [filterStatus, setFilterStatus] = useState<any>(-1);

  const onfilterStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({ ...pagination, pageIndex: 0 });
    setSeachValue("");
    setFilterStatus(event.target.value);
  };

  // ===================================================================== SORT ==============================================
  const [sort, setSort] = useState<any>({
    orderBy: "DateOrder",
    isAes: false,
  });

  const handleSort = (sortLabel: number) => {
    console.log(sortLabel);
    if (sort.orderBy === sortLabel) {
      setSort({ ...sort, isAes: !sort.isAes });
    } else {
      setSort({ orderBy: sortLabel, isAes: false });
    }
    setSeachValue("");
    setPagination({ ...pagination, pageIndex: 0 });
  };

  // useEffect(() => {
  //   const params = {
  //     ...pagination,
  //     fromDate,
  //     toDate,
  //     search: searchValue,
  //     filter: filterStatus,
  //     ...sort,
  //   };
  //   dispatch(getAllOrderList(params));
  // }, [sort, filterStatus]);

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

      const params = {
        ...sort,
        ...pagination,
        fromDate,
        toDate,
        filter: filterStatus,
        search: searchValue,
      };
      dispatch(getAllOrderList(params));
    }
  };

  // ===================================================================== FILTER DATE ========================================
  const [fromDate, setFromDate] = useState<String>(() => {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return convertDate(firstDay);
  });

  const handleChangeFromDate = (newDate: any) => {
    const date = convertDate(newDate?.$d);
    setFromDate(date);
  };

  const [toDate, setToDate] = useState<String>(() => {
    let date = new Date();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return convertDate(lastDay);
  });

  const handleChangeToDate = (newDate: any) => {
    const date = convertDate(newDate?.$d);
    setToDate(date);
  };

  useEffect(() => {
    const params = {
      ...sort,
      ...pagination,
      fromDate,
      toDate,
      filter: filterStatus,
      search: searchValue,
    };
    setPagination({ ...pagination, pageIndex: 0 });
    // dispatch(getAllOrderList(params));
  }, [fromDate, toDate]);

  // ===================================================================== SELECTED ============================================
  const navigate = useNavigate();

  const [orderSelected, setOrderSelected] = useState<order | null>();
  const handleOrderSelected = (order: order) => {
    setOrderSelected(order);
    setShowModalDetail(true);
  };

  const [showModalDetail, setShowModalDetail] = useState<boolean>(false);

  const handleShowModal = () => {
    setOrderSelected(null);
    setShowModalDetail(false);
  };

  const handleAcceptOrder = (idOrder: number) => {
    const params = {
      idOrder,
      isConfirm: true,
    };
    dispatch(updateStatusOrder(params)).then(() => {
      setShowModalDetail(false);
      setPagination({ ...pagination, pageIndex: 0 });
    });
  };

  const handleDenyOrder = (idOrder: number) => {
    const params = {
      idOrder,
      isConfirm: false,
    };
    dispatch(updateStatusOrder(params)).then(() => {
      setShowModalDetail(false);
      setPagination({ ...pagination, pageIndex: 0 });
    });
  };

  return (
    <>
      <h1 style={{ fontWeight: 500 }}>Quản lý đơn hàng</h1>

      <OrderTableToolbar
        // filter
        optionTypeStatus={OPTIONS_STATUS}
        filterTypeValue={filterStatus}
        onFilterType={onfilterStatus}
        // filter date
        onChangeFromDate={handleChangeFromDate}
        fromDate={fromDate}
        onChangeToDate={handleChangeToDate}
        toDate={toDate}
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
            headLabel={ORDER_HEAD_TABLE}
            onSort={handleSort}
          />
          <TableBody>
            {orderList &&
              orderList?.map((order, index) => (
                <OrderTableRow
                  tableHead={ORDER_HEAD_TABLE}
                  key={index}
                  row={order}
                  handleClick={() => handleOrderSelected(order)}
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

      {orderSelected && showModalDetail && (
        <ModalOrder
          orderSelect={orderSelected}
          onClose={() => handleShowModal()}
          onAcceptOrder={handleAcceptOrder}
          onDenyOrder={handleDenyOrder}
        />
      )}
    </>
  );
}

export default Orders;
