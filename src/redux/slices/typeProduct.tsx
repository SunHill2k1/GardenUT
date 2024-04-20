import { createSlice } from "@reduxjs/toolkit";
import { typeProductState } from "~/@types/typeProduct";
import { httpRequest } from "~/utils/httpRequest";
import { dispatch } from "../store";

const initialState: typeProductState = {
  typeProductList: [],
};

const typeProductSlice = createSlice({
  name: "typeProduct",
  initialState,
  reducers: {
    getTypeProductList(state, action) {
      state.typeProductList = action.payload;
    },
  },
});

export default typeProductSlice.reducer;

export function getTypeProductList() {
  return async () => {
    try {
      const response = await httpRequest.get("/api/TypeProduct", {});
      dispatch(typeProductSlice.actions.getTypeProductList(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}
