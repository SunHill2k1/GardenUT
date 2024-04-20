import { createSlice } from "@reduxjs/toolkit";
import { orderState } from "~/@types/order";
import * as orderServices from "~/services/orderServices";
import { dispatch } from "../store";
import { authDoLogOut } from "./auth";

const initialState: orderState = {
  orderList: [],
  totalRecord: 0,
  isLoading: false,
  orderSelected: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    getAllOrderList(state, action) {
      state.orderList = action.payload;
      state.isLoading = false;
    },

    getTotalRecord(state, action) {
      state.totalRecord = action.payload;
    },

    getOrderDetail(state, action) {
      state.orderSelected = action.payload;
      state.isLoading = false;
    },
  },
});

export default orderSlice.reducer;

export function getAllOrderList(params: any) {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const response = await orderServices.getAllOrderList(params);
      const { data, totalRecord } = response;

      dispatch(orderSlice.actions.getAllOrderList(data));
      dispatch(orderSlice.actions.getTotalRecord(totalRecord));
    } catch (e) {
      console.log(e);
      dispatch(orderSlice.actions.endLoading());
    }
  };
}

export function getOrderDetail(params: any) {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const response = await orderServices.getDetail(params);
      const { data } = response;
      dispatch(orderSlice.actions.getOrderDetail(data));
    } catch (error) {
      console.log(error);
      dispatch(orderSlice.actions.endLoading());
    }
  };
}

export function createOrder(params: any) {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      await orderServices.createOrderServices(params);
    } catch (error) {
      console.log(error);
      dispatch(orderSlice.actions.endLoading());
    }
  };
}

export function getAuthOrderList() {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const response = await orderServices.getAuthOrderList();
      dispatch(orderSlice.actions.getAllOrderList(response));
      if (response === "fail") {
        dispatch(authDoLogOut);
      }
      return response;
    } catch (error) {
      console.log(error);
      dispatch(orderSlice.actions.endLoading());
    }
  };
}

export function updateStatusOrder(params: any) {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const response = await orderServices.updateOrderServices(params);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function authCancelOrder(params: any) {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const response = await orderServices.cancelOrder(params);
      console.log(response);
      dispatch(orderSlice.actions.endLoading());
      return response;
    } catch (error) {
      console.log(error);
      dispatch(orderSlice.actions.endLoading());
    }
  };
}

export function shipperDoneOrder(params: any) {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const response = await orderServices.doneOrder(params);
      console.log(response);
      dispatch(orderSlice.actions.endLoading());
      return response;
    } catch (error) {
      console.log(error);
      dispatch(orderSlice.actions.endLoading());
    }
  };
}

export function shipperTakeOrder(params: any) {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const response = await orderServices.takeOrder(params);
      console.log(response);
      dispatch(orderSlice.actions.endLoading());
      return response;
    } catch (error) {
      console.log(error);
      dispatch(orderSlice.actions.endLoading());
    }
  };
}
