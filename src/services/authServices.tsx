import * as httpRequest from "../utils/httpRequest";

export const authLogin = async (params: any) => {
  const { username, password } = params;

  const response = await httpRequest.post("/api/User/Login", {
    name: username,
    password: password,
  });
  return response.data;
};

export const refreshToken = async (params: any) => {
  const { accessToken, refreshToken } = params;

  const response = await httpRequest.post("/api/User/RefreshToken", {
    AccessToken: accessToken,
    RefreshToken: refreshToken,
  });
  return response.data;
};

export const authRegister = async (params: any) => {
  const { Name, Address, PhoneNumber, Password, Role, Email, FullName } =
    params;

  try {
    const response = await httpRequest.post("/api/User/Register", {
      Name,
      Address,
      PhoneNumber,
      Password,
      // Role: Role || "Buyer",
      Email,
      FullName,
    });
    console.log(response);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return {
      status: "fail",
      message: error?.response?.data.message,
    };
  }
};

export const authGetInfor = async () => {
  try {
    const response = await httpRequest.get("/api/User/GetInforUser", {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (params: any) => {
  const { oldPassword, newPassword, confirmNewPassword } = params;

  try {
    const response = await httpRequest.put("/api/User/ChangePassword", {
      OldPassword: oldPassword,
      NewPassword: newPassword,
      ConfirmNewPassword: confirmNewPassword,
    });
    console.log(response);

    return response;
  } catch (error: any) {
    console.log(error);
    const { response } = error;
    return {
      status: "fail",
      message: response.data.message,
    };
  }
};

export const changeInfor = async (params: any) => {
  const { fullName, phoneNumber, address, email } = params;

  try {
    const response = await httpRequest.patch("/api/User/UpdateUser", {
      FullName: fullName,
      PhoneNumber: phoneNumber,
      Address: address,
      Email: email,
    });

    return response;
  } catch (error) {
    console.log(error);
    return "fail";
  }
};

export const resetPassword = async (params: any) => {
  const { username, email } = params;
  try {
    const response = await httpRequest.get(
      `/api/User/ResetPassword?name=${username}&email=${email}`
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return {
      status: "fail",
      message: error.response.data.message,
    };
  }
};
