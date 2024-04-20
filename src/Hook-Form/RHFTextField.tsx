import React from "react";
import {
  TextField,
  TextFieldProps,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  name: string;
  label?: string;
  isPassword?: boolean;
};

type Props = IProps & TextFieldProps;

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

function RHFTextField({ name, label, isPassword, ...other }: Props) {
  const { control } = useFormContext();

  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          defaultValue={""}
          type={
            isPassword ? (values.showPassword ? "text" : "password") : "text"
          }
          label={label}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          inputProps={{
            ...other.inputProps,
          }}
          InputProps={{
            ...other.InputProps,
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? (
                    <i className="bx bxs-show"></i>
                  ) : (
                    <i className="bx bxs-hide"></i>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            ...other.InputLabelProps,
          }}
        />
      )}
    />
  );
}

export default RHFTextField;
