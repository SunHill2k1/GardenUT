import { useEffect, useState } from "react";
//style
import style from "./Auth.module.scss";
import classNames from "classnames/bind";
import backgroundAuth from "~/access/images/backgroundAuth.png";
//redux
import { dispatch, useSelector } from "~/redux/store";
//react-router-dom
//component
import AvatarCustom from "../../Components/Avatar/AvatarCustom";
import { useNavigate } from "react-router-dom";
import {
  authCancelOrder,
  getAuthOrderList,
  updateStatusOrder,
} from "~/redux/slices/order";
//format
import { fDateTimeSuffix } from "~/utils/formatDate";
import { formatPrice } from "~/utils/formatPrice";
//MUI
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// component
import LoadingScreen from "~/components/LoadingScreen";
import ModalAuthOrder from "../../Components/ModalAuthOrder";
import { getFavoriteList } from "~/redux/slices/favorite";
import AuthFavorite from "../../Components/AuthFavorite";
import * as orderService from "~/services/orderServices";
import { order } from "~/@types/order";

const cx = classNames.bind(style);

function Auth() {
  const navigate = useNavigate();
  const { userInfor } = useSelector((state) => state.auth);
  const { orderList: authOrderList, isLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAuthOrderList());
    dispatch(getFavoriteList());
  }, []);

  const [orderSelected, setOrderSelected] = useState<any>(null);

  const [showOrderDetail, setShowOrderDetail] = useState<boolean>(false);
  const handleOrderSelected = (order: any) => {
    setOrderSelected(order);
    setShowOrderDetail(true);
  };

  const handleCancelOrder = (idOrder: number) => {
    const params = {
      idOrder,
    };
    dispatch(authCancelOrder(params));
    dispatch(getAuthOrderList());
    setShowOrderDetail(false);
  };

  const [activeTab, setActiveTab] = useState<string>("orders");

  // ==============================================FAVORITE===============================================
  const { productList: favoriteList, isLoading: favorLoading } = useSelector(
    (state) => state.favorite
  );

  useEffect(() => {
    dispatch(getFavoriteList());
  }, []);

  const renderColorStatus = (status: number) => {
    if (status === 6) {
      return "info";
    } else if (status === 5) {
      return "warning";
    } else if (status === 7) {
      return "error";
    } else if (status === 8) {
      return "primary";
    } else if (status === 9) {
      return "success";
    }
  };

  const renderStatus = (status: number) => {
    if (status === 6) {
      return "Xác nhận";
    } else if (status === 5) {
      return "Đang chờ";
    } else if (status === 7) {
      return "Hủy";
    } else if (status === 8) {
      return "Đang giao";
    } else if (status === 9) {
      return "Đã giao";
    }
  };

  // order?.status === 6
  // ? "success"
  // : order?.status === 5
  // ? "warning"
  // : "error"

  const [orderCancelList, setOrderCancelList] = useState<order[]>([]);

  const fetchCancelList = async () => {
    try {
      const response = await orderService.getOrderCancelList();
      setOrderCancelList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTab === "cancel") {
      fetchCancelList();
    }
  }, [activeTab]);

  console.log(orderCancelList);

  return (
    <>
      {!userInfor ? (
        navigate("/login")
      ) : (
        <>
          {showOrderDetail && orderSelected && (
            <ModalAuthOrder
              order={orderSelected}
              onClose={() => setShowOrderDetail(false)}
              orderSelectProps={orderSelected}
              onDenyOrder={handleCancelOrder}
            />
          )}
          <div
            className={cx("user-infor")}
            style={{ background: `url(${backgroundAuth}), rgba(0,0,0,0.3)` }}
          >
            <div className={`container ${cx("user-infor-container")}`}>
              <div className={cx("avatar")}>
                <div className={cx("avatar-img")}>
                  {userInfor?.Fullname && (
                    <AvatarCustom fullName={userInfor?.Fullname} />
                  )}
                </div>
                <p>{userInfor?.Fullname}</p>
              </div>
              <div className={cx("infor")}>
                <p>Điện thoại: {userInfor?.PhoneNumber}</p>
                <p>Email: {userInfor?.Email}</p>
                <p>Địa chỉ: {userInfor?.Address}</p>
              </div>
            </div>
          </div>
          <div className={cx("container")}>
            <div className={cx("tabs")}>
              <div
                className={
                  activeTab == "orders"
                    ? cx("tab-item", "active")
                    : cx("tab-item")
                }
                onClick={() => setActiveTab("orders")}
              >
                Đơn hàng
              </div>

              <div
                className={
                  activeTab == "cancel"
                    ? cx("tab-item", "active")
                    : cx("tab-item")
                }
                onClick={() => setActiveTab("cancel")}
              >
                Đơn đã hủy
              </div>
              <div
                className={
                  activeTab == "favorite"
                    ? cx("tab-item", "active")
                    : cx("tab-item")
                }
                onClick={() => setActiveTab("favorite")}
              >
                Yêu thích
              </div>
            </div>
            {/* information */}
            {activeTab == "orders" && (
              <div className={cx("user")}>
                <div className={cx("user-orders")}>
                  {isLoading && <LoadingScreen />}
                  <TableContainer sx={{ maxHeight: "400px" }}>
                    <Table aria-label="simple table">
                      <TableHead
                        sx={{ backgroundColor: "var(--primary-color2)" }}
                      >
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Địa chỉ</TableCell>
                          <TableCell>Ngày</TableCell>
                          <TableCell>Tổng giá</TableCell>
                          <TableCell>Trạng thái</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {authOrderList.length &&
                          authOrderList.map((order, index) => (
                            <TableRow
                              key={index}
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleOrderSelected(order)}
                            >
                              <TableCell># {order?.idOrder}</TableCell>
                              <TableCell>{order?.addressOrder}</TableCell>
                              <TableCell>
                                {fDateTimeSuffix(order?.dateOrder)}
                              </TableCell>
                              <TableCell>
                                {formatPrice(order?.totalCost)}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant={
                                    order?.status === 7
                                      ? "contained"
                                      : "outlined"
                                  }
                                  color={renderColorStatus(order?.status)}
                                  sx={{
                                    fontWeight: "600",
                                  }}
                                >
                                  {renderStatus(order?.status)}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            )}

            {/* Favorite List */}
            {activeTab === "favorite" && (
              <div className={cx("user-favorite")}>
                <AuthFavorite favoriteList={favoriteList} />
              </div>
            )}

            {/* Cancel */}
            {activeTab === "cancel" && (
              <div className={cx("user")}>
                <div className={cx("user-orders")}>
                  {isLoading && <LoadingScreen />}
                  <TableContainer sx={{ maxHeight: "400px" }}>
                    <Table aria-label="simple table">
                      <TableHead
                        sx={{ backgroundColor: "var(--primary-color2)" }}
                      >
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Địa chỉ</TableCell>
                          <TableCell>Ngày</TableCell>
                          <TableCell>Tổng giá</TableCell>
                          <TableCell>Trạng thái</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderCancelList?.map((order, index) => (
                          <TableRow
                            key={index}
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleOrderSelected(order)}
                          >
                            <TableCell># {order?.idOrder}</TableCell>
                            <TableCell>{order?.addressOrder}</TableCell>
                            <TableCell>
                              {fDateTimeSuffix(order?.dateOrder)}
                            </TableCell>
                            <TableCell>
                              {formatPrice(order?.totalCost)}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant={
                                  order?.status === 7 ? "contained" : "outlined"
                                }
                                color={renderColorStatus(order?.status)}
                                sx={{
                                  fontWeight: "600",
                                }}
                              >
                                {renderStatus(order?.status)}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Auth;
