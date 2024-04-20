// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Autocomplete, TextField } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options: any;
  variant?: "filled" | "outlined" | "standard";
  handleChangeValue?: any;

  [key: string]: any;
};

export default function RHFAutocomplete({
  name,
  label,
  placeholder,
  options,
  variant = "outlined",
  handleChangeValue,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label || ""}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={value}
          {...other}
          onBlur={onBlur}
          onChange={(_: any, value: any) => {
            handleChangeValue && handleChangeValue((value && value.id) || "");
            onChange(value);
            return value;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant={variant}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
        />
      )}
      name={name}
      control={control}
    />
  );
}
