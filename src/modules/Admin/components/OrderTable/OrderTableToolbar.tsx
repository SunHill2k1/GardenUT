import { Stack, TextField, MenuItem } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type props = {
  // filter
  optionTypeStatus: any[];
  filterTypeValue: any;
  onFilterType: any;
  //filter date
  onChangeFromDate: any;
  fromDate: String;
  onChangeToDate: any;
  toDate: String;
  // search
  onSearch: any;
  onPress: any;
  searchValue: string;
};

function OrderTableToolbar({
  // filter
  optionTypeStatus,
  filterTypeValue,
  onFilterType,
  // filter date
  onChangeFromDate,
  fromDate,
  onChangeToDate,
  toDate,
  //   search
  onSearch,
  onPress,
  searchValue,
}: props) {
  return (
    <Stack
      spacing={1}
      direction={{
        xs: "column",
        sm: "column",
        md: "column",
        lg: "row",
        xl: "row",
      }}
      sx={{
        pb: 1,
        // px: 3,
        alignItems: "center",
        "& .MuiInputBase-input::first-letter": { textTransform: "capitalize" },
      }}
    >
      <TextField
        select
        label="Status"
        value={filterTypeValue}
        onChange={onFilterType}
        SelectProps={{
          MenuProps: {
            sx: { "& .MuiPaper-root": { maxHeight: 260 } },
          },
        }}
        sx={{
          width: "100%",
        }}
      >
        {optionTypeStatus.map((option: any) => (
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
      </TextField>

      <TextField
        sx={{
          width: "100%",
        }}
        value={searchValue}
        onChange={(event) => onSearch(event.target.value)}
        onKeyUp={onPress}
        placeholder="Tìm kiếm"
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <Iconify
        //         icon={'eva:search-fill'}
        //         sx={{ color: 'text.disabled', width: 20, height: 20 }}
        //       />
        //     </InputAdornment>
        //   ),
        // }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* From date */}

        <DesktopDatePicker
          maxDate={new Date()}
          label="From"
          inputFormat="YYYY/MM/DD"
          value={fromDate}
          onChange={onChangeFromDate}
          renderInput={(params: any) => (
            <TextField
              {...params}
              sx={{
                width: "100%",
              }}
            />
          )}
        />

        {/* To date */}

        <DesktopDatePicker
          maxDate={new Date()}
          label="To"
          inputFormat="YYYY/MM/DD"
          value={toDate}
          onChange={onChangeToDate}
          renderInput={(params: any) => (
            <TextField
              {...params}
              sx={{
                width: "100%",
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default OrderTableToolbar;
