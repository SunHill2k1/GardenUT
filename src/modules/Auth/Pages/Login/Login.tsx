//style
import classNames from "classnames/bind";
import style from "./Login.module.scss";
import backgroundLogin from "src/access/images/backgroundLogin-2.jpg";

//RHF
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

//redux
import {
  authDoLogin,
  authGetInfor,
  authResetPassword,
} from "~/redux/slices/auth";
import { dispatch, useSelector } from "~/redux/store";
import * as authServices from "~/services/authServices";

//components
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";
import LoadingScreen from "~/components/LoadingScreen";
import FormProvider from "~/Hook-Form/FormProvider";
import RHFTextField from "~/Hook-Form/RHFTextField";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Modal from "~/components/Modal";
import { getAuthOrderList } from "~/redux/slices/order";
import { getFavoriteList } from "~/redux/slices/favorite";

const cx = classNames.bind(style);

type FormData = {
  userName: string;
  userPassword: string;
};

const loginSchema = yup
  .object({
    userName: yup.string().required("required"),
    userPassword: yup.string().required("required"),
  })
  .required();

function Login() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const method = useForm<FormData>({ resolver: yupResolver(loginSchema) });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = method;

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const { userName, userPassword } = data;
    const params = {
      username: userName,
      password: userPassword,
    };
    try {
      const response = await authServices.authLogin(params);
      const { data } = response;

      // store to localstorage

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data?.refreshToken);
      localStorage.setItem(
        "expTime",
        JSON.stringify(Date.parse(data.timestamp))
      );

      const userInfor = {
        Email: data?.email,
        Fullname: data?.fullname,
        Address: data?.address,
        PhoneNumber: data?.phoneNumber,
      };
      localStorage.setItem("userInfor", JSON.stringify(userInfor));

      // store to redux
      dispatch(authDoLogin({ ...userInfor, ...data }));

      enqueueSnackbar("Thành công", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });

      if (data?.role === "Admin") {
        navigate("/admin");
      } else if (data?.role === "Shipper") {
        navigate("/shipper");
      } else {
        navigate("/");
      }
    } catch (e) {
      enqueueSnackbar("Thất bại", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

  return (
    <div
      className={cx("container")}
      style={{
        backgroundImage: `url(${backgroundLogin})`,
        backgroundSize: "cover",
      }}
    >
      {!showResetPassword && (
        <div className={cx("login-form")}>
          <div className={cx("title")}>Chào mừng</div>
          <div className={cx("content")}>Đăng nhập của bạn</div>
          <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
            {isSubmitting && <LoadingScreen />}
            <Stack spacing={2} sx={{ width: "400px" }}>
              <RHFTextField
                name="userName"
                label="username"
                sx={{
                  input: { color: "#fff" },
                  label: {
                    color: "#d8eadd",
                    background: "#46a81f",
                    padding: "0 5px",
                    borderRadius: "5px",
                  },
                }}
              />
              <RHFTextField
                name="userPassword"
                label="password"
                isPassword
                sx={{
                  input: { color: "#fff" },
                  label: {
                    color: "#d8eadd",
                    background: "#46a81f",
                    padding: "0 5px",
                    borderRadius: "5px",
                  },
                }}
              />
              {/* forgot */}
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className={cx("forgot-btn")}
              >
                Quên mật khẩu?
              </button>
              {/* ===============================BUTTON======================= */}
              <button className={cx("login-btn")} type="submit">
                Đăng nhập
              </button>

              <Button to="/register" className={cx("register-btn")}>
                Không có tài khoản? Tạo mới
              </Button>
            </Stack>
          </FormProvider>
        </div>
      )}

      {showResetPassword && (
        <Modal setShowModal={setShowResetPassword}>
          <ResetPasswordModal />
        </Modal>
      )}
    </div>
  );
}

export default Login;

function ResetPasswordModal() {
  const { enqueueSnackbar } = useSnackbar();

  type formReset = {
    username: string;
    email: string;
  };

  const resetPasswordSchema = yup.object({
    username: yup.string().required("required"),
    email: yup.string().email().required("Email required"),
  });

  const methods = useForm<formReset>({
    mode: "onSubmit",
    resolver: yupResolver(resetPasswordSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data: formReset) => {
    const { username, email } = data;
    const params = {
      username,
      email,
    };
    try {
      const response = await dispatch(authResetPassword(params));
      if (response.status === "fail") {
        enqueueSnackbar(`${response.message}`, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } else {
        enqueueSnackbar("Success", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Fail", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  return (
    <>
      {isSubmitting && <LoadingScreen />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ width: "400px" }} px="8px">
          <h2>Reset Mật khẩu</h2>
          <RHFTextField name="username" label="username" />
          <RHFTextField name="email" label="email" />
          {/* ===============================BUTTON======================= */}
          <button className={cx("login-btn")} type="submit">
            Reset
          </button>
        </Stack>
      </FormProvider>
    </>
  );
}
