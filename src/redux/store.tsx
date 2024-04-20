import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
//redux
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
//slice
import productSlice from "./slices/product";
import authSlice from "./slices/auth";
import typeProductSlice from "./slices/typeProduct";
import userSlice from "./slices/user";
import orderSlice from "./slices/order";
import favoriteSlice from "./slices/favorite";

const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    typeProduct: typeProductSlice,
    user: userSlice,
    order: orderSlice,
    favorite: favoriteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { dispatch, useDispatch, useSelector, store };
