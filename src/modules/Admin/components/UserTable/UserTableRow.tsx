import { TableRow, TableCell } from "@mui/material";
import Button from "~/components/Button";
import { formatPrice } from "~/utils/formatPrice";

type props = {
  row: any;
  tableHead: any[];
  handleClick: any;
  onRemove?: any;
};

function UserTableRow({ row, tableHead, handleClick, onRemove }: props) {
  const newRow = tableHead.map((title) => title.id);

  const renderRow = (item: string, key: number) => {
    if (item === "removeButton") {
      return (
        <TableCell
          key={key}
          align="left"
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "red",
            },
          }}
        >
          <i className="bx bx-trash" onClick={onRemove}></i>
        </TableCell>
      );
    } else if (item === "idType") {
      return (
        <TableCell key={key} align="left">
          {row?.idTypeNavigation?.nameType}
        </TableCell>
      );
    } else if (item === "Price") {
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

export default UserTableRow;
