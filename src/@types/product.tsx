export type product = {
  idProduct: number;
  idType: any;
  idTypeNavigation: any;
  name: string;
  description: string;
  price: number;
  amount: number;
  priceDiscount: number;
  dateGen: Date;
  linkImageDisplay: string;
  images: any[];
  idStatus: number;
  rate: number;
};

export type productState = {
  productList: product[];
  productSelected?: product | null;
  totalRecord: number;
  isLoading: boolean;
};

export type favoriteState = {
  productList: product[];
  isLoading: boolean;
};
