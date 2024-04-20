import * as httpRequest from "../utils/httpRequest";

export const getList = async (params: any) => {
  const { IdType, OrderBy, AES, PageIndex, PageSize } = params;

  const response = await httpRequest.get("/api/Product/GetFavorite", {
    params: {
      IdType: IdType || -1,
      OrderBy: "Price",
      AES: true,
      PageIndex: 0,
      PageSize: 100,
      PriceFrom: -1,
      PriceTo: -1,
    },
  });
  return response.data;
};

export const add = async (params: any) => {
  const { IdProduct } = params;

  const response = await httpRequest.post("/api/Product/AddToFavorite", {
    IdProduct,
  });
  return response;
};

export const remove = async (params: any) => {
  const { IdProduct } = params;
  try {
    const response = await httpRequest.deleteReq(
      `/api/Product/RemoveFavorite?IdProduct=${IdProduct}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
