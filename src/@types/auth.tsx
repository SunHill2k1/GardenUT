import { product } from "./product";

export type auth = {
  idUser?: number;
  Fullname?: string;
  Name?: string;
  Email?: string;
  Address?: string;
  PhoneNumber?: string;
  IsVip?: string;
  role?: string;
  timestamp?: any;
};

export type cartType = {
  productInfor: product;
  amountInCart: number;
};

export type authState = {
  userInfor: auth | null;
  token: string | null;
  isLoading: boolean;
  inCart: cartType[];
  productToCheckout: any[];
};
