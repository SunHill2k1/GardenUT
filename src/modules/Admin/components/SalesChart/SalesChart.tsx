import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import * as chartServices from "~/services/chartServices";
import { formatPrice } from "~/utils/formatPrice";
import { Typography } from "@mui/material";

function SalesChart() {
  const [dataChart, setDataChart] = useState<any[]>(() => {
    return [
      {
        name: "sales",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ];
  });

  const fetchSalesData = async () => {
    try {
      const response = await chartServices.getSalesOfMonth();
      const sales = response.map((monthData: any) => monthData?.totolCost);
      setDataChart([
        {
          name: "sales",
          data: [...sales],
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const options: ApexOptions = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    // colors: ["#BABABA", "#FFAA44", "#13A103", "#00529C"],
    dataLabels: {
      formatter(val) {
        return formatPrice(val);
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 400,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },
  };
  // plotOptions: {
  //   pie: {
  //     donut: {
  //       labels: {
  //         show: true,

  //         total: {
  //           show: true,
  //           label: "Tổng hồ sơ",
  //         },
  //       },
  //     },
  //   },
  // },

  return (
    <div>
      <Typography variant="h4" mt={4}>
        Doanh số từng tháng
      </Typography>
      <ReactApexChart
        options={options}
        series={dataChart}
        type="bar"
        height={320}
        width="100%"
      />
    </div>
  );
}

export default SalesChart;
