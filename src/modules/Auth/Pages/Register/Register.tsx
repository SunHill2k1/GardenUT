//style
import classNames from "classnames/bind";
import style from "./Register.module.scss";
import { Snackbar } from "@mui/material";
//react-hook-form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProvider from "~/Hook-Form/FormProvider";
import RHFTextField from "~/Hook-Form/RHFTextField";

//redux
import { authDoRegister } from "~/redux/slices/auth";
import { dispatch } from "~/redux/store";

//components
import LoadingScreen from "~/components/LoadingScreen";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";
import { Stack } from "@mui/system";
import image5 from "src/access/images/image5.png";
import { httpRequest } from "~/utils/httpRequest";
import { useState } from "react";
import Modal from "~/components/Modal";

type FormData = {
  fullName: string;
  email: string;
  userName: string;
  userPassword: string;
  confirmPassword: string;
  address: string;
  phoneNumber: string;
};

const phoneRegExp = /(^$|(09|03|07|08|05)+([0-9]{8})\b)/g;
// Schema
const registerSchema = yup.object({
  fullName: yup.string().required(" Trường này là bắt buộc"),
  email: yup.string().email().required(" Trường này là bắt buộc"),
  userName: yup.string().required(" Trường này là bắt buộc"),
  userPassword: yup
    .string()
    .required(" Trường này là bắt buộc")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required(" Trường này là bắt buộc")
    .max(12, "Mật khẩu tối đa 20 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("userPassword"), null], "Xác thực mật khẩu không đúng")
    .required("Yêu cầu xác nhận mật khẩu"),
  address: yup.string().required(" Trường này là bắt buộc"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .required("Yêu cầu số điện thoại"),
});

const cx = classNames.bind(style);

function Register() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const methods = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
  });

  const {
    reset,
    clearErrors,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [userRegisterName, setUserRegisterName] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    const {
      fullName,
      email,
      userName,
      userPassword,
      confirmPassword,
      address,
      phoneNumber,
    } = data;
    const params = {
      Name: userName,
      Address: address,
      PhoneNumber: phoneNumber,
      Password: userPassword,
      Email: email,
      FullName: fullName,
    };

    try {
      const response = await dispatch(authDoRegister(params));
      console.log(response);

      if (response?.status === "fail") {
        enqueueSnackbar(response?.message, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } else {
        setUserRegisterName(userName);
        setShowModalConfirm(true);
        // enqueueSnackbar("Thành công", {
        //   variant: "success",
        //   anchorOrigin: {
        //     horizontal: "right",
        //     vertical: "top",
        //   },
        // });
        // navigate("/login");
        reset();
      }
      clearErrors();
    } catch {}
  };

  return (
    <div className={cx("register")}>
      <div className={cx("left")}>
        <div></div>
        <img src={image5} alt="img" />
      </div>
      <div className={cx("container")}>
        <h1 className={cx("title")}>Tạo tài khoản mới</h1>
        <div className={cx("content")}>
          Đã có tài khoản?
          <Button to="/login" className={cx("login-btn")}>
            Đăng nhập
          </Button>
        </div>
        <div className={cx("register-form")}>
          {isSubmitting && <LoadingScreen />}
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
              {/* fullname */}
              <div className={cx("input-field")}>
                <RHFTextField name="fullName" label="Họ và tên" />
              </div>
              {/* email */}
              <div className={cx("input-field")}>
                <RHFTextField name="email" label="Email" />
              </div>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2 }}
              >
                {/*   username  */}
                <div className={cx("input-field")}>
                  <RHFTextField name="userName" label="Tài khoản" />
                </div>
                {/* phone number */}
                <div className={cx("input-field")}>
                  <RHFTextField name="phoneNumber" label="Số điện thoại" />
                </div>
              </Stack>

              {/*  address */}
              <div className={cx("input-field")}>
                <RHFTextField name="address" label="Địa chỉ" />
              </div>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2 }}
              >
                {/* password */}
                <div className={cx("input-field")}>
                  <RHFTextField
                    name="userPassword"
                    label="Mật khẩu"
                    isPassword
                  />
                </div>
                {/* confirm password */}
                <div className={cx("input-field")}>
                  <RHFTextField
                    name="confirmPassword"
                    label="Nhập lại mật khẩu"
                    isPassword
                  />
                </div>
              </Stack>
              {/* button submit */}
              <button className={cx("register-btn")} type="submit">
                Đăng ký
              </button>
            </Stack>
          </FormProvider>
        </div>
      </div>

      {showModalConfirm && (
        <Modal setShowModal={setShowModalConfirm}>
          <ConfirmRegister userRegisterName={userRegisterName} />
        </Modal>
      )}
    </div>
  );
}

export default Register;

type confirmRegisterProp = {
  userRegisterName: string;
};

const ConfirmRegister = ({ userRegisterName }: confirmRegisterProp) => {
  const { enqueueSnackbar } = useSnackbar();

  type confirmForm = {
    userName: string;
    confirmCode: number;
  };

  const confirmRegisterSchema = yup.object({
    userName: yup.string().required(),
    confirmCode: yup.number().required(),
  });

  const defaultValues = {
    userName: userRegisterName || "",
  };

  const methods = useForm<confirmForm>({
    defaultValues,
    resolver: yupResolver(confirmRegisterSchema),
  });
  const {
    reset,
    clearErrors,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data: confirmForm) => {
    const { userName, confirmCode } = data;

    try {
      const response = await httpRequest.post(
        `/api/User/ConfirmEmailRegister?userName=${userName}&num=${confirmCode}`
      );

      if (response?.data?.message === "Mã xác nhận không chính xác") {
        enqueueSnackbar(response?.data?.message, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } else if (response?.data?.message === "Xác nhận tài khoản thành công") {
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error);

      if (error?.response?.data?.message === "Mã xác nhận không chính xác") {
        enqueueSnackbar(error?.response?.data?.message, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } else if (
        error?.response?.data?.message === "Xác nhận tài khoản thành công"
      ) {
        enqueueSnackbar(error?.response?.data?.message, {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        navigate("/login");
      }
    }
  };

  return (
    <>
      {isSubmitting && <LoadingScreen />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ width: "400px" }} px="8px">
          <h2>Xác thực đăng ký</h2>
          <p>(Mã xác thực đã được gửi tới Email của bạn)</p>
          <RHFTextField name="userName" label="Tài khoản" />
          <RHFTextField name="confirmCode" label="Mã xác thực " />
          {/* ===============================BUTTON======================= */}
          <button className={cx("confirm-btn")} type="submit">
            Xác thực
          </button>
        </Stack>
      </FormProvider>
    </>
  );
};
