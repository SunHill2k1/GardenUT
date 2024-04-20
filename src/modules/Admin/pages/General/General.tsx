import { useEffect, useState } from "react";
//style
import classNames from "classnames/bind";
import style from "./Chart.module.scss";
// MUI
import { Box, Grid, Stack } from "@mui/material";
// router
import { useNavigate } from "react-router-dom";

//redux
import { dispatch, useSelector } from "~/redux/store";
import * as orderServices from "~/services/orderServices";
// component
import { getProducts } from "~/redux/slices/product";
import { getUserList } from "~/redux/slices/user";
import GeneralCard from "../../components/GeneralCard";
import ProductChart from "../../components/ProductChart";
import SalesChart from "../../components/SalesChart";
import TypeProductChart from "../../components/TypeProductChart/TypeProductChart";
import TypeByMonthChart from "../../components/TypeByMonthChart";

const cx = classNames.bind(style);

function General() {
  const navigate = useNavigate();

  // ========================================= REDUX

  const { totalRecord: totalUser } = useSelector((state) => state.user);
  const { totalRecord: totalProduct } = useSelector((state) => state.product);
  const [waitingOrderCount, setWaitingOrderCount] = useState<number>(0);
  const [denyOrderCount, setDenyOrderCount] = useState<number>(0);

  const fetchWaitingOrder = async () => {
    try {
      const params = { filter: 5 };
      const response = await orderServices.getAllOrderList(params);
      setWaitingOrderCount(response?.totalRecord);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDenyOrder = async () => {
    try {
      const params = { filter: 7 };
      const response = await orderServices.getAllOrderList(params);
      setDenyOrderCount(response?.totalRecord);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWaitingOrder();
    fetchDenyOrder();
    dispatch(getUserList({}));
    dispatch(getProducts({ idType: -1 }));
  }, []);

  return (
    <>
      <div className={cx("dashboard")}>
        <Grid
          container
          columnSpacing={{
            xs: 4,
            lg: 2,
          }}
          rowSpacing={4}
          mb={2}
        >
          <Grid item xs={6} lg={3}>
            <GeneralCard
              color={"#00529C"}
              count={totalUser}
              status={"Người dùng"}
              icon={<i style={{ fontSize: "50px" }} className="bx bx-user"></i>}
              onClick={() => navigate("/admin/users")}
            />
          </Grid>

          <Grid item xs={6} lg={3}>
            <GeneralCard
              color={"#13A10E"}
              count={totalProduct}
              status={"Sản phẩm"}
              icon={
                <i style={{ fontSize: "50px" }} className="bx bxs-florist"></i>
              }
              onClick={() => navigate("/admin/products")}
            />
          </Grid>

          <Grid item xs={6} lg={3}>
            <GeneralCard
              color={"#ef880d"}
              count={waitingOrderCount}
              status={"Đơn hàng chờ"}
              icon={
                <i style={{ fontSize: "50px" }} className="bx bx-receipt"></i>
              }
              onClick={() => navigate("/admin/orders")}
            />
          </Grid>

          <Grid item xs={6} lg={3}>
            <GeneralCard
              color={"#ED2224"}
              count={denyOrderCount}
              status={"Đơn hàng hủy"}
              icon={
                <i
                  style={{ fontSize: "50px" }}
                  className="bx bx-message-square-x"
                ></i>
              }
              onClick={() => navigate("/admin/orders")}
            />
          </Grid>
        </Grid>
      </div>
      <Stack direction="column" justifyContent="space-between" mt={4}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={3}
          // display="flex"
          // alignItems="center"
        >
          <Box flex={1}>
            <TypeByMonthChart />
          </Box>
          <Box flex={1}>
            <TypeProductChart />
          </Box>
        </Stack>

        <SalesChart />

        <ProductChart />
      </Stack>
    </>
  );
}

export default General;
