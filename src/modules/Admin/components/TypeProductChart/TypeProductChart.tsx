import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
//services
import * as chartServices from "~/services/chartServices";
import typeProduct from "~/redux/slices/typeProduct";
import { Typography } from "@mui/material";

function TypeProductChart() {
  const [dataChart, setDataChart] = useState<number[]>([]);
  const [labelList, setLabelList] = useState<string[]>([]);

  const fethDataTypeProduct = async () => {
    try {
      const response = await chartServices.getReportTypeProduct();

      const labelData = response.map(
        (typeProduct: any) => typeProduct.type.nameType
      );

      const data = response.map((typeProduct: any) => typeProduct.amountOrder);

      setLabelList(labelData);

      setDataChart(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fethDataTypeProduct();
  }, []);

  const options: ApexOptions = {
    labels: [...labelList],
    dataLabels: {
      formatter(val) {
        return Number(val).toFixed(0) + "%";
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 400,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,

            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <div style={{ borderLeft: "2px solid #dadada" }}>
      <Typography variant="h5" mt={4} mb={5}>
        Số lượng bán ra của tất cả loại sản phẩm
      </Typography>
      <ReactApexChart
        options={options}
        series={dataChart}
        type="donut"
        height={320}
        width="100%"
      />
    </div>
  );
}

export default TypeProductChart;
