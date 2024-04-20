import { createSlice } from "@reduxjs/toolkit";
import { favoriteState } from "~/@types/product";
import * as favoriteServices from "~/services/favoriteServices";
import { dispatch } from "../store";

const initialState: favoriteState = {
  productList: [],
  isLoading: false,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    getFavoriteListSuccess(state, action) {
      state.productList = action.payload;
      state.isLoading = false;
    },
  },
});

export default favoriteSlice.reducer;

export function getFavoriteList() {
  return async () => {
    dispatch(favoriteSlice.actions.startLoading());
    try {
      const response = await favoriteServices.getList({});
      const { data } = response;
      dispatch(favoriteSlice.actions.getFavoriteListSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(favoriteSlice.actions.endLoading());
    }
  };
}

export function addToFavorite(params: any) {
  return async () => {
    dispatch(favoriteSlice.actions.startLoading());
    try {
      const response = await favoriteServices.add(params);
      return response;
    } catch (error) {
      console.log(error);
      dispatch(favoriteSlice.actions.endLoading());
    }
  };
}

export function removeFromFavorite(params: any) {
  return async () => {
    dispatch(favoriteSlice.actions.startLoading());
    try {
      const response = await favoriteServices.remove(params);
      return response;
    } catch (error) {
      console.log(error);
      dispatch(favoriteSlice.actions.endLoading());
    }
  };
}
