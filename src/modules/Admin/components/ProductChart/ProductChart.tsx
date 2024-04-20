import { useEffect, useState } from "react";
// Mui
import { MenuItem, Select, TextField, Typography } from "@mui/material";
// Chart
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// services
import * as chartServices from "~/services/chartServices";
//format
import { formatPrice } from "~/utils/formatPrice";
// component

const MONTH_LIST = [
  {
    name: "All month",
    id: -1,
  },
  {
    name: "1",
    id: 1,
  },
  {
    name: "2",
    id: 2,
  },
  {
    name: "3",
    id: 3,
  },
  {
    name: "4",
    id: 4,
  },
  {
    name: "5",
    id: 5,
  },
  {
    name: "6",
    id: 6,
  },
  {
    name: "7",
    id: 7,
  },
  {
    name: "8",
    id: 8,
  },
  {
    name: "9",
    id: 9,
  },
  {
    name: "10",
    id: 10,
  },
  {
    name: "11",
    id: 11,
  },
  {
    name: "12",
    id: 12,
  },
];

function ProductChart() {
  const [labelList, setLabelList] = useState<string[]>([]);

  const [dataChart, setDataChart] = useState<any[]>(() => {
    return [
      {
        name: "sales",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ];
  });

  const date = new Date();
  const currentMonth = date.getMonth() + 1;

  const [month, setMonth] = useState<number>(currentMonth);
  const handleChangeMonth = (e: any) => {
    setMonth(e.target.value);
  };

  const fetchSalesData = async () => {
    try {
      const response = await chartServices.getProductSalesOfMonth({ month });
      const labels = response.map((product: any) => product?.product?.name);
      const sales = response.map((product: any) => product?.sumAmount);

      setLabelList(labels);
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
  }, [month]);

  const options: ApexOptions = {
    labels: [...labelList],
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
        horizontal: true,
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
    <>
      <Typography variant="h6" mt={4}>
        Số lượng bán ra từng sản phẩm theo tháng
      </Typography>
      {/* filter */}
      <Select
        label="Chọn tháng"
        value={month}
        onChange={handleChangeMonth}
        MenuProps={{ disableScrollLock: true }}
        sx={{
          maxWidth: { sm: 240 },
          flex: 1,
        }}
      >
        {MONTH_LIST.map((option: any) => (
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
      {/* chart */}
      <ReactApexChart options={options} series={dataChart} type="bar" />
    </>
  );
}

export default ProductChart;
