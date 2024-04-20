/* eslint-disable array-callback-return */
//type
import { cartType, authState } from "~/@types/auth";
//redux
import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import * as authServices from "~/services/authServices";
import { useSnackbar } from "notistack";
import { product } from "~/@types/product";
import { number } from "yup/lib/locale";

// eslint-disable-next-line react-hooks/rules-of-hooks
// const { enqueueSnackbar, closeSnackbar } = useSnackbar();

console.log();

const initialState: authState = {
  userInfor: JSON.parse(localStorage.getItem("userInfor")!) ?? null,
  token: localStorage.getItem("accessToken"),
  isLoading: false,
  inCart: JSON.parse(localStorage.getItem("inCart")!) ?? [],
  productToCheckout: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    getAuthInforSuccess(state, action) {
      state.userInfor = action.payload;
      state.isLoading = false;
    },

    getTokenSuccess(state, action) {
      state.token = action.payload;
    },

    getAuthLogOut(state) {
      state.userInfor = null;
    },

    UpdateToCart(state, action) {
      state.inCart = action.payload;
      localStorage.setItem("inCart", JSON.stringify(action.payload));
    },

    ProductToCheckout(state, action) {
      state.productToCheckout = action.payload;
    },

    clearCart(state, action) {
      state.inCart = [];
      localStorage.removeItem("inCart");
    },
  },
});

export default authSlice.reducer;

export function authDoLogin(data: any) {
  return async () => {
    dispatch(authSlice.actions.getAuthInforSuccess(data));
  };
}

export function authRefreshToken() {
  const params = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
  return async () => {
    try {
      const response = await authServices.refreshToken(params);
      const { data } = response;

      const userInfor = {
        Email: data?.email,
        Fullname: data?.fullname,
        Address: data?.address,
        PhoneNumber: data?.phoneNumber,
      };
      localStorage.setItem("userInfor", JSON.stringify(userInfor));

      localStorage.setItem("accessToken", response.data.token);
      dispatch(
        authSlice.actions.getAuthInforSuccess({ ...userInfor, ...data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function authGetInfor() {
  return async () => {
    dispatch(authSlice.actions.startLoading());
    try {
      const response = await authServices.authGetInfor();
      const { data } = response;

      const userInfor = {
        Email: data?.email,
        Fullname: data?.fullname,
        Address: data?.address,
        PhoneNumber: data?.phoneNumber,
      };
      localStorage.setItem("userInfor", JSON.stringify(userInfor));

      dispatch(authSlice.actions.getAuthInforSuccess(userInfor));
    } catch (e) {
      console.log(e);
      dispatch(authSlice.actions.endLoading());
      dispatch(authSlice.actions.getAuthInforSuccess(null));
      localStorage.removeItem("userInfor");
    }
  };
}

export function authDoRegister(params: any) {
  return async () => {
    const response = await authServices.authRegister(params);
    return response;
  };
}

export function authDoLogOut() {
  dispatch(authSlice.actions.getAuthLogOut());
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expTime");
  // localStorage.removeItem("inCart");
  localStorage.removeItem("userInfor");
  return true;
}

export function UpdateProductInCart(
  product: product,
  amount: number = 1,
  amountOnly: boolean = false
) {
  //check exist product
  return function UpdateProducInCartThunk(dispatch: any, getState: Function) {
    const productListInCart = getState().auth.inCart;

    //check exist
    const indexExist = productListInCart?.findIndex((products: cartType) => {
      return products?.productInfor?.idProduct === product.idProduct;
    });

    let newProductList: cartType[] = [];
    if (indexExist !== -1) {
      newProductList = productListInCart?.map((products: cartType) => {
        if (products?.productInfor?.idProduct === product.idProduct) {
          // modify in cart page
          if (amountOnly) {
            return {
              ...products,
              amountInCart: amount,
            };
          } else {
            return {
              ...products,
              amountInCart: products?.amountInCart + amount,
            };
          }
        }
        return { ...products };
      });
    } else {
      newProductList = [
        ...productListInCart,
        { productInfor: product, amountInCart: amount },
      ];
    }

    // new
    if (!newProductList) {
      newProductList = [{ productInfor: product, amountInCart: amount }];
    }

    dispatch(authSlice.actions.UpdateToCart(newProductList));
  };
}

export function removeProductInCart(indexInCart: number, deleteAll?: string) {
  return function removeProductInCartThunk(dispatch: any, getState: Function) {
    const productListInCart = getState().auth.inCart;
    let newProductList = [...productListInCart];

    if (deleteAll === "deleteAll") {
      newProductList = [];
    } else {
      newProductList.splice(indexInCart, 1);
    }

    dispatch(authSlice.actions.UpdateToCart(newProductList));
  };
}

export function addProductToCheckout(product: Array<any>) {
  return dispatch(authSlice.actions.ProductToCheckout(product));
}

export function clearAllProductInCart() {
  dispatch(authSlice.actions.clearCart({}));
}

export function authChangePassword(params: any) {
  return async () => {
    try {
      const response = await authServices.changePassword(params);

      return response;
    } catch (error: any) {
      console.log(error);

      return {
        status: "fail",
        message: error.response.data.message,
      };
    }
  };
}

export function authChangeInfor(params: any) {
  return async () => {
    try {
      const response = await authServices.changeInfor(params);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function authResetPassword(params: any) {
  return async () => {
    try {
      const response = await authServices.resetPassword(params);
      console.log(response.data);

      return response;
    } catch (error: any) {
      return {
        status: "fail",
        message: error.response.data.message,
      };
    }
  };
}
