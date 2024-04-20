import { useState } from "react";
//style
import style from "./Auth.module.scss";
import classNames from "classnames/bind";

//MUI
//redux
import { dispatch, useSelector } from "~/redux/store";
//react-router-dom
//component
import {
  authChangeInfor,
  authChangePassword,
  authDoLogOut,
  authGetInfor,
  authRefreshToken,
} from "~/redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

//react-hook-form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProvider from "~/Hook-Form/FormProvider";
import RHFTextField from "~/Hook-Form/RHFTextField";

// component
import LoadingScreen from "~/components/LoadingScreen";
import { useSnackbar } from "notistack";
import { auth } from "~/@types/auth";

const cx = classNames.bind(style);
type Props = {
  setShowModal: Function;
};
function AuthSetting({ setShowModal }: Props) {
  const { userInfor } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<String>("infor");

  return (
    <div className="container">
      <div className={cx("settings")}>
        <div className={cx("title")}>Cài đặt</div>
        <div className={cx("tabs")}>
          <div
            className={
              activeTab == "infor" ? cx("tab-item", "active") : cx("tab-item")
            }
            onClick={() => setActiveTab("infor")}
          >
            Thông tin chung
          </div>
          <div
            className={
              activeTab == "changePW"
                ? cx("tab-item", "active")
                : cx("tab-item")
            }
            onClick={() => setActiveTab("changePW")}
          >
            Đổi mật khẩu
          </div>
        </div>
        {activeTab === "infor" && userInfor && (
          <ChangeAuthInfor authInfor={userInfor} setShowModal={setShowModal} />
        )}
        {activeTab === "changePW" && (
          <ChangePasswordModal setShowModal={setShowModal} />
        )}
      </div>
    </div>
  );
}

export default AuthSetting;

// =========================================== PASSWORD ==================================================

const ChangePasswordModal = ({ setShowModal }: Props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  type formChangePassword = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  const changePasswordSchema = yup.object({
    oldPassword: yup.string().required("Password required"),
    newPassword: yup.string().required("Password required").min(6),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password must match")
      .required("Confirm password required"),
  });

  const methods = useForm<formChangePassword>({
    mode: "onSubmit",
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: formChangePassword) => {
    const { oldPassword, newPassword, confirmNewPassword } = data;
    const params = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };
    try {
      const response = await dispatch(authChangePassword(params));
      if (response === "fail") {
        enqueueSnackbar("Thất bại", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } else {
        enqueueSnackbar("Thành công", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        dispatch(authDoLogOut);
      }

      // navigate("/login");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Thất bại", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
    setShowModal(false);
  };

  const {
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
  } = methods;

  return (
    <>
      {isSubmitting && <LoadingScreen />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack display="row" spacing={2}>
          {/* old password */}
          <div className={cx("input-field")}>
            <RHFTextField name="oldPassword" label="Mật khẩu cũ" isPassword />
          </div>
          {/* new password */}
          <div className={cx("input-field")}>
            <RHFTextField name="newPassword" label="Mật khẩu mới" isPassword />
          </div>
          {/* confirm password */}
          <div className={cx("input-field")}>
            <RHFTextField
              name="confirmNewPassword"
              label="Xác nhận mật khẩu"
              isPassword
            />
          </div>
          <button className={cx("login-btn")} type="submit">
            Đổi mật khẩu
          </button>
        </Stack>
      </FormProvider>
    </>
  );
};

// =========================================== INFORMATION ==================================================
type changeInforProp = {
  authInfor: auth;
  setShowModal: Function;
};
const ChangeAuthInfor = ({ authInfor, setShowModal }: changeInforProp) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  type formAuthInfor = {
    fullName: string;
    phoneNumber: string;
    address: string;
    email: string;
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const authInforSchema = yup.object({
    fullName: yup.string().required("Full name required"),
    phoneNumber: yup.string().matches(phoneRegExp, "Invalid phone number"),
    address: yup.string().required("Address name required"),
    email: yup.string().email().required("Email required"),
  });

  const defaultValues = {
    fullName: authInfor.Fullname || "",
    phoneNumber: authInfor.PhoneNumber || "",
    address: authInfor.Address || "",
    email: authInfor.Email || "",
  };

  const methods = useForm<formAuthInfor>({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(authInforSchema),
  });

  const onSubmit = async (data: formAuthInfor) => {
    const { fullName, phoneNumber, address, email } = data;

    const params = {
      fullName,
      phoneNumber,
      address,
      email,
    };
    try {
      const response = await dispatch(authChangeInfor(params));
      if (response === "fail") {
        enqueueSnackbar("Thất bại", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } else {
        enqueueSnackbar("Thành công", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        await dispatch(authRefreshToken());
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Thất bại", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
    setShowModal(false);
  };

  const {
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
  } = methods;

  return (
    <>
      {isSubmitting && <LoadingScreen />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} my={2}>
          {/* fullname */}

          <div className={cx("input-field")}>
            <RHFTextField name="fullName" label="Họ và tên" />
          </div>
          {/* email */}
          {/* <div className={cx("input-field")}>
            <RHFTextField name="email" label="Email" />
          </div> */}
          {/* phone number */}
          <div className={cx("input-field")}>
            <RHFTextField name="phoneNumber" label="Số điện thoại" />
          </div>
          {/*  address */}
          <div className={cx("input-field")}>
            <RHFTextField name="address" label="Địa chỉ" />
          </div>

          <button className={cx("login-btn")} type="submit">
            Cập nhật thông tin
          </button>
        </Stack>
      </FormProvider>
    </>
  );
};
