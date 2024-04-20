import { product } from "./product";

export type order = {
  addressOrder: string;
  idOrder: number;
  status: number;
  totalCost: number;
  dateOrder: Date;
  Buyer: any;
  orderDetails: any;
  idUserNavigation?: any;
  shipCost?: number;
};

export type orderState = {
  orderList: order[];
  totalRecord: number;
  isLoading: boolean;
  orderSelected: product[] | null | any;
};
