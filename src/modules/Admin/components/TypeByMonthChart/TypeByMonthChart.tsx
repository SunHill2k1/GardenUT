import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
//services
import * as chartServices from "~/services/chartServices";
import typeProduct, { getTypeProductList } from "~/redux/slices/typeProduct";
// mui
import { MenuItem, Select, Typography } from "@mui/material";
//redux
import { dispatch, useSelector } from "~/redux/store";

function TypeByMonthChart() {
  const [dataChart, setDataChart] = useState<any[]>([]);

  const { typeProductList } = useSelector((state) => state.typeProduct);

  let optiontypeProduct: any = typeProductList.map((type) => ({
    ...type,
    id: type?.idType,
    name: type?.nameType,
  }));
  optiontypeProduct = [...optiontypeProduct];

  useEffect(() => {
    dispatch(getTypeProductList());
  }, []);

  const [idType, setIdType] = useState<any>(1);

  const handleChangeIdType = (e: any) => {
    console.log(e);
    setIdType(e.target.value);
  };

  const fethDataTypeProduct = async () => {
    try {
      const response = await chartServices.getTypeProductByMonth({
        idType,
      });

      // console.log(response);

      const dataAmount = response.map(
        (typeProduct: any) => typeProduct?.amountOrder
      );

      const dataSales = response.map(
        (typeProduct: any) => typeProduct?.totalCost
      );

      // console.log(dataAmount);
      // console.log(dataSales);
      setDataChart([
        {
          name: "Số lượng",
          type: "column",
          data: dataAmount,
        },
        {
          name: "Doanh số",
          type: "line",
          data: dataSales,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fethDataTypeProduct();
  }, [idType]);

  const options: ApexOptions = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],

    // dataLabels: {
    //   formatter(val) {
    //     return Number(val).toFixed(0) + "%";
    //   },
    // },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 400,
    },
    yaxis: [
      {
        opposite: true,
        title: {
          text: "Số lượng",
        },
      },
      {
        title: {
          text: "Doanh số",
        },
      },
    ],
    // plotOptions: {
    //   pie: {
    //     donut: {
    //       labels: {
    //         show: true,

    //         total: {
    //           show: true,
    //         },
    //       },
    //     },
    //   },
    // },
  };

  return (
    <div style={{ borderLeft: "2px solid #dadada" }}>
      <Typography variant="h5" mt={4}>
        Doanh số và Số lượng từng loại sản phẩm
      </Typography>
      {/* filter */}
      <Select
        label="Chọn loại sản phẩm"
        value={idType}
        onChange={handleChangeIdType}
        MenuProps={{ disableScrollLock: true }}
        sx={{
          maxWidth: { sm: 240 },
          flex: 1,
        }}
      >
        {optiontypeProduct.map((option: any) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <ReactApexChart
        options={options}
        series={dataChart}
        type="line"
        height={320}
        width="100%"
      />
    </div>
  );
}

export default TypeByMonthChart;
