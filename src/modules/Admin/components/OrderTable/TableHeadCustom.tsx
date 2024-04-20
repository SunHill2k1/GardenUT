// @mui
import { Theme } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  SxProps,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
} as const;

// ----------------------------------------------------------------------

type Props = {
  order?: "asc" | "desc";
  orderBy?: string;
  headLabel: any[];
  rowCount?: number;
  numSelected?: number;
  noSortFields?: string[];
  onSort?: (id: number) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  sx?: SxProps<Theme>;
};

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  noSortFields = [],
  onSort,
  onSelectAllClick,
  sx,
}: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllClick && (
          <TableCell
            padding="checkbox"
            sx={{
              padding: 0,
              "&.MuiSvgIcon-root": {
                width: "20px",
              },
            }}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
            {numSelected !== 0 && (
              <Box sx={{ fontSize: "11px" }}>{numSelected}</Box>
            )}
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.sortLabel}
            sortDirection={orderBy === headCell.sortLabel ? order : false}
            sx={{
              width: headCell.width,
              minWidth: headCell.minWidth,
              color: headCell.color,
              textAlign: "left",
            }}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.sortLabel}
                direction={orderBy === headCell.sortLabel ? order : "asc"}
                onClick={() => onSort(headCell.sortLabel)}
              >
                {headCell.label}

                {orderBy === headCell.sortLabel ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
