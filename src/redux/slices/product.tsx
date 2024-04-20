import { createSlice } from "@reduxjs/toolkit";
import { productState } from "~/@types/product";
import * as productService from "~/services/productServices";
import { dispatch } from "../store";

const initialState: productState = {
  productList: [],
  productSelected: null,
  totalRecord: 0,
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    getProducts(state, action) {
      state.productList = action.payload;
      state.isLoading = false;
    },

    getTotalRecordProduct(state, action) {
      state.totalRecord = action.payload;
    },

    getProductDetail(state, action) {
      state.productSelected = action.payload;
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;

//
export function getProducts(params: any) {
  return async () => {
    dispatch(productSlice.actions.startLoading());
    try {
      const response = await productService.getProductService(params);
      const { data, totalRecord } = response;

      dispatch(productSlice.actions.getProducts(data));
      dispatch(productSlice.actions.getTotalRecordProduct(totalRecord));
      dispatch(productSlice.actions.getProductDetail(null));
    } catch (e) {
      console.log(e);
    }
  };
}

export function getTopNewProducts() {
  return async () => {
    dispatch(productSlice.actions.startLoading());
    try {
      const response = await productService.getTopNewProducts();
      const { data, totalRecord } = response;

      dispatch(productSlice.actions.getProducts(data));
      dispatch(productSlice.actions.getTotalRecordProduct(totalRecord));
      dispatch(productSlice.actions.getProductDetail(null));
    } catch (e) {
      console.log(e);
    }
  };
}

export function getProductDetail(id: any) {
  return async () => {
    dispatch(productSlice.actions.startLoading());
    try {
      const response = await productService.getProductDetail(id);
      const { data } = response;

      dispatch(productSlice.actions.getProductDetail(data));
    } catch (error) {
      console.log(error);
      dispatch(productSlice.actions.endLoading());
    }
  };
}

export function createNewProduct(params: any) {
  return async () => {
    const response = await productService.createProduct(params);
    return response;
  };
}

export function removeProduct(idRemove: number) {
  return async () => {
    try {
      await productService?.removeProduct(idRemove);
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateProduct(params: any) {
  return async () => {
    try {
      await productService.updateProductService(params);
    } catch (error) {
      console.log(error);
    }
  };
}

export function postImgProduct(newImgList: any) {
  return async () => {
    try {
      await productService.postImgProduct(newImgList);
    } catch (e) {
      console.log(e);
    }
  };
}
