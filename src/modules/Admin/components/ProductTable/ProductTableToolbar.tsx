import { Stack, TextField, MenuItem } from "@mui/material";

type props = {
  // filter
  optionTypeProduct: any[];
  filterTypeValue: any;
  onFilterType: any;
  // search
  onSearch: any;
  onPress: any;
  searchValue: string;
};

function ProductTableToolbar({
  // filter
  optionTypeProduct,
  filterTypeValue,
  onFilterType,
  //   search
  onSearch,
  onPress,
  searchValue,
}: props) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{
        pb: 1,
        // px: 3,
        alignItems: "center",
        "& .MuiInputBase-input::first-letter": { textTransform: "capitalize" },
      }}
    >
      <TextField
        select
        label="Product Type"
        value={filterTypeValue}
        onChange={onFilterType}
        SelectProps={{
          MenuProps: {
            sx: { "& .MuiPaper-root": { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          flex: 1,
        }}
      >
        {optionTypeProduct.map((option: any) => (
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
        sx={{ flex: 1 }}
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
    </Stack>
  );
}

export default ProductTableToolbar;
