import { TableRow, TableCell, Button } from "@mui/material";
// import Button from "~/components/Button";
import { formatPrice } from "~/utils/formatPrice";
import { convertDate, fDateTimeSuffix } from "~/utils/formatDate";

type props = {
  row: any;
  tableHead: any[];
  handleClick: any;
  onRemove?: any;
};

function OrderTableRow({ row, tableHead, handleClick, onRemove }: props) {
  const newRow = tableHead.map((title) => title.id);

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
      return "Xác nhận";
    } else if (status === 5) {
      return "Đang chờ";
    } else if (status === 7) {
      return "Hủy";
    } else if (status === 8) {
      return "Đang giao";
    } else if (status === 9) {
      return "Đã giao";
    }
  };

  const renderRow = (item: string, key: number) => {
    if (item === "fullName") {
      return <TableCell key={key}>{row?.idUserNavigation?.fullName}</TableCell>;
    } else if (item === "status") {
      return (
        <TableCell key={key} align="center">
          <Button
            variant="outlined"
            // color={
            //   row[item] === 6
            //     ? "success"
            //     : row[item] === 5
            //     ? "warning"
            //     : "error"
            // }
            color={renderColorStatus(row[item])}
            sx={{
              fontWeight: "600",
            }}
          >
            {renderStatus(row[item])}
          </Button>
        </TableCell>
      );
    } else if (item === "phoneNumber") {
      return <TableCell>0{row?.idUserNavigation?.phoneNumber}</TableCell>;
    } else if (item === "dateOrder") {
      return (
        <TableCell key={key} align="left">
          {fDateTimeSuffix(row[item])}
        </TableCell>
      );
    } else if (item === "totalCost") {
      return (
        <TableCell key={key} align="left">
          {formatPrice(row[item])}
        </TableCell>
      );
    } else {
      return (
        <TableCell key={key} align="left">
          {row[item]}
        </TableCell>
      );
    }
  };

  return (
    <TableRow
      hover
      onClick={handleClick}
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "var( --primary-linear-color2)",
        },
      }}
    >
      {newRow.map((row, index) => renderRow(row, index))}
    </TableRow>
  );
}

export default OrderTableRow;
