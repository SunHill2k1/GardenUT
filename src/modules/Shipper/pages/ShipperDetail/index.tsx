import { useEffect } from "react";
import classNames from "classnames/bind";
import style from "./ShipperDetail.module.scss";
import hoasn from "~/access/images/hoasn.jpg";
import Button from "~/components/Button";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
//redux
import { dispatch, useSelector } from "~/redux/store";
import { getOrderDetail } from "~/redux/slices/order";
import { product } from "~/@types/product";
import { formatPrice } from "~/utils/formatPrice";
import LoadingScreen from "~/components/LoadingScreen";

const cx = classNames.bind(style);
function ShipperDetail() {
  const navigate = useNavigate();

  const params = useParams();

  const { orderSelected, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetail({ idOrder: params.id }));
    // return () => {
    //   dispatch(getOrderDetail({ idOrder: -1 }));
    // };
  }, [params]);

  const handleOpenMap = () => {
    navigate(
      `/shipper/${params.id}/map/${orderSelected[0]?.idOrderNavigation.addressOrder}`
    );
  };

  return (
    <div className="container">
      <div className={cx("shipper-detail")}>
        {isLoading && <LoadingScreen />}
        {orderSelected && (
          <>
            <div className={cx("user")}>
              <span>Thông tin người nhận</span>
              <div className={cx("name")}>
                <i className="bx bx-user"></i>
                {
                  orderSelected[0]?.idOrderNavigation?.idUserNavigation
                    ?.fullName
                }
              </div>
              <div>
                <i className="bx bxs-phone"></i>
                {
                  orderSelected[0]?.idOrderNavigation?.idUserNavigation
                    ?.phoneNumber
                }
              </div>
              <Box
                sx={{ "&:hover": { cursor: "pointer", opacity: "0.7" } }}
                onClick={handleOpenMap}
              >
                <i className="bx bxs-map"></i>
                {orderSelected[0]?.idOrderNavigation?.addressOrder}
              </Box>
            </div>
            <div className={cx("order")}>
              <div className={cx("product-list")}>
                {orderSelected?.map((order: any, index: number) => (
                  <div
                    key={order?.idOrder + index}
                    className={cx("product-item")}
                  >
                    <div className={cx("image")}>
                      <img
                        src={order?.idProductNavigation?.linkImageDisplay}
                        alt="product-img"
                      />
                    </div>
                    <div className={cx("infor")}>
                      <div className={cx("infor-name")}>
                        {order?.idProductNavigation?.name}
                      </div>
                      <div className={cx("infor-price")}>
                        {formatPrice(order?.idProductNavigation?.price)}
                      </div>
                    </div>
                    <div className={cx("amount")}>x{order?.amountOrder}</div>
                  </div>
                ))}
                {/* <div className={cx("product-item")}>
                <div className={cx("image")}>
                  <img src={hoasn} />
                </div>
                <div className={cx("infor")}>
                  <div className={cx("infor-name")}>Cây thần tài</div>
                  <div className={cx("infor-price")}>150.000</div>
                </div>
                <div className={cx("amount")}>x2</div>
              </div>
              <div className={cx("product-item")}>
                <div className={cx("image")}>
                  <img src={hoasn} />
                </div>
                <div className={cx("infor")}>
                  <div className={cx("infor-name")}>Cây thần tài</div>
                  <div className={cx("infor-price")}>150.000</div>
                </div>
                <div className={cx("amount")}>x2</div>
              </div> */}
              </div>
            </div>
            <div className={cx("costs")}>
              <div className={cx("cost")}>
                <span>Tổng tiền hàng</span>
                <span>
                  {formatPrice(
                    Number(orderSelected[0]?.idOrderNavigation?.totalCost)
                  )}
                </span>
              </div>
              <div className={cx("cost")}>
                <span>Phí vận chuyển</span>
                <span>
                  {formatPrice(
                    Number(orderSelected[0]?.idOrderNavigation?.shipCost)
                  )}
                </span>
              </div>
              <div className={cx("cost", "total")}>
                <span>Tổng</span>
                <span>
                  {formatPrice(
                    Number(orderSelected[0]?.idOrderNavigation?.totalCost) +
                      Number(orderSelected[0]?.idOrderNavigation?.shipCost)
                  )}
                </span>
              </div>
              <div className={cx("btn-accept")}>
                <Button
                  to={`/shipper/${params.id}/map/${orderSelected[0]?.idOrderNavigation.addressOrder}`}
                  primary
                >
                  Xem bản đồ
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShipperDetail;
