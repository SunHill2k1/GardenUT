import { useEffect } from "react";
//type
//style
import classNames from "classnames/bind";
import style from "./ModalOrder.module.scss";
// MUI
import {
  fabClasses,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
//components
import Button from "~/components/Button";
import { getOrderDetail } from "~/redux/slices/order";
import { dispatch, useSelector } from "~/redux/store";
import { order } from "~/@types/order";
import { formatPrice } from "~/utils/formatPrice";

type productProps = {
  product: any;
};

function ProductItem({ product }: productProps) {
  const { idProduct, amountOrder, idProductNavigation, orderPrice } = product;

  return (
    <TableRow>
      <TableCell>{idProduct}</TableCell>
      <TableCell>{idProductNavigation?.name}</TableCell>
      <TableCell>{orderPrice}</TableCell>
      <TableCell>{formatPrice(idProductNavigation?.price)}</TableCell>
      <TableCell>{amountOrder}</TableCell>
      <TableCell>{idProductNavigation?.amount}</TableCell>
    </TableRow>
  );
}

type props = {
  onClose: any;
  orderSelect: order;
  onAcceptOrder: Function;
  onDenyOrder: Function;
};

const cx = classNames.bind(style);

function ModalOrder({
  orderSelect,
  onClose,
  onAcceptOrder,
  onDenyOrder,
}: props) {
  const { orderSelected } = useSelector((state) => state.order);

  console.log(orderSelect);

  useEffect(() => {
    const params = {
      idOrder: orderSelect.idOrder,
    };
    dispatch(getOrderDetail(params));

    return () => {
      dispatch(getOrderDetail({ idOrder: -1 }));
    };
  }, [orderSelect]);

  const checkOverAmount = () => {
    const result = orderSelected.some(
      (order: any) => order?.amountOrder >= order?.idProductNavigation?.amount
    );

    return result;
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("Modal")}>
          <div className={cx("header")}>
            <Typography variant="h5">ID: #{orderSelect?.idOrder}</Typography>
            <i className="bx bx-x" onClick={onClose}></i>
          </div>
          <div>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Khách: </span>
              {orderSelect?.idUserNavigation.fullName}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> sđt: </span>
              {orderSelect?.idUserNavigation.phoneNumber}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Địa chỉ: </span>
              {orderSelect?.addressOrder}
            </Typography>
          </div>
          <TableContainer>
            <div className={cx("body")}>
              <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Giá đặt</TableCell>
                <TableCell>Giá hiện tại</TableCell>
                <TableCell>Số lượng đặt</TableCell>
                <TableCell>Tồn kho</TableCell>
              </TableHead>
              <TableBody>
                {orderSelected &&
                  orderSelected?.map((detail: any, index: number) => (
                    <ProductItem key={index} product={detail} />
                  ))}
              </TableBody>
            </div>
          </TableContainer>
          <Typography>
            Phí vận chuyển: {formatPrice(Number(orderSelect?.shipCost))}
          </Typography>
          <h3>
            Tổng tiền:{" "}
            {formatPrice(
              Number(orderSelect?.shipCost) + Number(orderSelect?.totalCost)
            )}
            {/* {orderSelected
                ? ` $${formatPrice(
                    orderSelected.reduce(
                      (acc: any, item: any) =>
                        acc + item.amountOrder * item.orderPrice,
                      0
                    )
                  )} `
                : 0} */}
          </h3>
          <div className={cx("action")}>
            <Button
              disabled={orderSelect.status !== 5 || checkOverAmount()}
              className={cx("accept-btn", "btn")}
              onClick={() => onAcceptOrder(orderSelect.idOrder)}
            >
              Accept
            </Button>
            <Button
              disabled={orderSelect.status !== 5 || checkOverAmount()}
              className={cx("deny-btn", "btn")}
              onClick={() => onDenyOrder(orderSelect.idOrder)}
            >
              Deny
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalOrder;
