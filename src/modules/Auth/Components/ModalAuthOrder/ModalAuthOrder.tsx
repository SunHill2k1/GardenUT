import { useEffect } from "react";
//type
//style
import classNames from "classnames/bind";
import style from "./ModalOrder.module.scss";
// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
//components
import { default as ButtonComponent } from "~/components/Button";
import { getOrderDetail } from "~/redux/slices/order";
import { dispatch, useSelector } from "~/redux/store";
import { formatPrice } from "~/utils/formatPrice";
import { order } from "~/@types/order";

type productProps = {
  product: any;
};

function ProductItem({ product }: productProps) {
  const { idProduct, amountOrder, idProductNavigation } = product;

  return (
    <TableRow>
      <TableCell>{idProduct}</TableCell>
      <TableCell>{idProductNavigation?.name}</TableCell>
      <TableCell>{formatPrice(idProductNavigation?.price)}</TableCell>
      <TableCell>{amountOrder}</TableCell>
      <TableCell>
        {formatPrice(idProductNavigation?.price * amountOrder)}
      </TableCell>
    </TableRow>
  );
}

type props = {
  onClose: any;
  order: order;
  onDenyOrder?: any;
  orderSelectProps?: any;
};

const cx = classNames.bind(style);

function ModalAuthOrder({
  order,
  onClose,
  onDenyOrder,
  orderSelectProps,
}: props) {
  const { orderSelected } = useSelector((state) => state.order);

  useEffect(() => {
    const params = {
      idOrder: order.idOrder,
    };
    dispatch(getOrderDetail(params));

    return () => {
      dispatch(getOrderDetail({ idOrder: -1 }));
    };
  }, [order]);

  console.log(order);

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
      return "Đã xác nhận";
    } else if (status === 5) {
      return "Đang chờ";
    } else if (status === 7) {
      return "Đã hủy";
    } else if (status === 8) {
      return "Đang giao";
    } else if (status === 9) {
      return "Đã giao";
    }
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("Modal")}>
          <div className={cx("header")}>
            <Button
              variant={order?.status === 7 ? "contained" : "outlined"}
              color={renderColorStatus(order?.status)}
              sx={{
                fontWeight: "600",
              }}
            >
              {renderStatus(order?.status)}
            </Button>
            <i className="bx bx-x" onClick={onClose}></i>
          </div>
          <div>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Khách: </span>
              {order?.idUserNavigation.fullName}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> sđt: </span>
              {order?.idUserNavigation.phoneNumber}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Địa chỉ: </span>
              {order?.addressOrder}
            </Typography>
          </div>
          <TableContainer sx={{ margin: "16px 0", border: "1px solid" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "var(--primary-color2)" }}>
                <TableCell>ID</TableCell>
                <TableCell>Khách</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell></TableCell>
              </TableHead>
              <TableBody>
                {orderSelected &&
                  orderSelected?.map((detail: any, index: number) => (
                    <ProductItem key={index} product={detail} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography>
            Phí vận chuyển: {formatPrice(Number(order?.shipCost))}
          </Typography>
          <h3>
            Tổng tiền:
            {formatPrice(Number(order?.shipCost) + Number(order?.totalCost))}
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

          <ButtonComponent
            disabled={
              orderSelectProps.status >= 7 || orderSelectProps.status === 6
            }
            className={cx("deny-btn", "btn")}
            onClick={() => onDenyOrder(orderSelectProps.idOrder)}
          >
            Hủy
          </ButtonComponent>
        </div>
      </div>
    </>
  );
}

export default ModalAuthOrder;
