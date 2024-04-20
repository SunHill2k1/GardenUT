import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Shipping.module.scss";
import Card from "../../components/Card";
import { dispatch, useSelector } from "~/redux/store";
import { getAllOrderList } from "~/redux/slices/order";

const cx = classNames.bind(style);

function ShippingDone() {
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrderList({ filter: 9, OrderBy: "DateOrder", AES: false }));
  }, []);

  return (
    <div className={cx("shipper")}>
      {orderList &&
        orderList.map((order, index) => <Card key={index} orderData={order} />)}
    </div>
  );
}

export default ShippingDone;
