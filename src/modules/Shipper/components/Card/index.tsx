import classNames from "classnames/bind";
import style from "./Card.module.scss";
//type
import { order } from "~/@types/order";
//component
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import { formatPrice } from "~/utils/formatPrice";
import { Box } from "@mui/material";

const cx = classNames.bind(style);

type cardProps = {
  orderData: order;
};

function Card({ orderData }: cardProps) {
  const {
    addressOrder,
    idOrder,
    status,
    totalCost,
    dateOrder,
    Buyer,
    orderDetails,
    idUserNavigation,
  } = orderData;

  return (
    <Link to={`/shipper/${idOrder}`} className={cx("card")}>
      <div className={cx("content")}>
        <div className={cx("order")}>
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                lineHeight: "35px",
              }}
            >
              <div className={cx("icon")}>
                <i className="bx bxs-package"></i>
              </div>
              <div className={cx("code")}>Đơn hàng: #{idOrder}</div>
            </Box>
          </div>
          <div className={cx("price")}><i className='bx bx-money' ></i> {formatPrice(totalCost)}</div>
        </div>
        <div className={cx("info-user")}>
          <div className={cx("name")}>
            <i className="bx bx-user"></i> {idUserNavigation?.fullName}
          </div>
          <div>
            <i className="bx bxs-phone"></i> {idUserNavigation?.phoneNumber}
          </div>
        </div>
        {/* <div className={cx("km")}>5km</div> */}
        <div className={cx("address")}>
          <i className="bx bxs-map"></i>
          {addressOrder}
        </div>
      </div>
      <div className={cx("ship-cost")}>
        <Button primary>Chi tiết đơn hàng</Button>
      </div>
    </Link>
  );
}

export default Card;
