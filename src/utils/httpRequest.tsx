import axios from "axios";
import { dispatch } from "~/redux/store";
import { authDoLogin, authDoLogOut } from "~/redux/slices/auth";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
  },
});

export const get = async (path: string, option: any = {}) => {
  const response = await httpRequest.get(path, option);
  return response.data;
};

export const post = async (path: string, data: any = {}) => {
  const response = await httpRequest.post(path, data);
  return response;
};

export const deleteReq = async (path: string, data: any = {}) => {
  const response = await httpRequest.delete(path, data);
  return response;
};

export const patch = async (path: string, data: any = {}) => {
  const response = await httpRequest.patch(path, data);
  return response;
};

export const put = async (path: string, data: any = {}) => {
  const response = await httpRequest.put(path, data);
  return response.data;
};

// ================================================================================================
const REFRESH_TOKEN_REQUIRE_LIST = [
  "/api/User/Login",
  "/api/Product/NewProduct",
  "/api/User/GetAllUser",
  "/api/Order/GetAllOrderList",
  "/api/Product/AddToFavorite",
  "/api/Product/GetFavorite",
];

// ===============================================REQUEST
httpRequest.interceptors.request.use(async (req) => {
  req.headers = {
    Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
  };

  // console.log("current", currentTime);
  // console.log("expTime", expTime);

  // ========================================================================REFRESH===============================
  const currentTime = Math.floor(new Date().getTime());
  const expTime = Number(localStorage.getItem("expTime"));
  // && REFRESH_TOKEN_REQUIRE_LIST.includes(req.url!)
  if (currentTime < expTime) {
    try {
      const response = await axios.post(
        ` ${process.env.REACT_APP_BASE_URL}/api/User/RefreshToken`,

        {
          AccessToken: window.localStorage.getItem("accessToken"),
          RefreshToken: window.localStorage.getItem("refreshToken"),
        },
        {
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      );

      const { data } = response.data;

      req.headers = {
        Authorization: "Bearer " + data?.token,
      };

      // re-storage in local
      localStorage.setItem("accessToken", data?.token);
      localStorage.setItem(
        "expTime",
        JSON.stringify(Date.parse(data?.timestamp))
      );

      const userInfor = {
        Email: data?.email,
        Fullname: data?.fullname,
        Address: data?.address,
        PhoneNumber: data?.phoneNumber,
      };
      localStorage.setItem("userInfor", JSON.stringify(userInfor));

      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data?.refreshToken);
      }

      dispatch(authDoLogin({ ...userInfor, role: data?.role }));

      return req;
    } catch (e: any) {
      console.log(e);
      dispatch(authDoLogin(null));
    }
  }
  // } else {
  //   try {
  //     const response = await axios.get(
  //       ` ${process.env.REACT_APP_BASE_URL}/api/User/GetInforUser`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer " + window.localStorage.getItem("accessToken"),
  //         },
  //       }
  //     );
  //     const { data } = response.data;
  //     dispatch(authDoLogin(data));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return req;
});

// // ===============================================RESPONSE
httpRequest.interceptors.response.use(
  async function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
