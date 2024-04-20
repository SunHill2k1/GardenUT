import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import * as userService from "~/services/userServices";
import { userState } from "~/@types/user";

const initialState: userState = {
  userList: [],
  userSelected: null,
  totalRecord: 0,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    getUserListSuccess(state, action) {
      state.userList = action.payload;
      state.isLoading = false;
    },

    getSelectUsers(state, action) {
      state.userSelected = action.payload;
      state.isLoading = false;
    },

    getTotalRecord(state, action) {
      state.totalRecord = action.payload;
    },
  },
});

export default userSlice.reducer;

export function getUserList(params: any) {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await userService.getAllUser(params);
      const { data, totalRecord } = response;
      dispatch(userSlice.actions.getUserListSuccess(data));
      dispatch(userSlice.actions.getTotalRecord(totalRecord));
    } catch (e) {
      console.log(e);
      dispatch(userSlice.actions.endLoading());
    }
  };
}

export function updateUserRole(params: any) {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await userService.update(params);
      dispatch(userSlice.actions.endLoading());
      return response;
    } catch (error) {
      console.log(error);
      dispatch(userSlice.actions.endLoading());
    }
  };
}

export function getDetailUser(params: any) {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await userService.getDetail(params);
      dispatch(userSlice.actions.getSelectUsers(response));
      return response;
    } catch (error) {
      console.log(error);
      dispatch(userSlice.actions.endLoading());
    }
  };
}
