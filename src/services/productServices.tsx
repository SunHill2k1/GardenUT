import * as httpRequest from "~/utils/httpRequest";

export const getProductService = async (data: any) => {
  let { idType, orderBy, pageIndex, pageSize, search, isAes, priceFrom, priceTo } = data;

  idType =
    idType.length > 1
      ? idType.map((type: any) => `IdType=${type}`).join("&")
      : `IdType=${idType || -1}`;

  try {
    const response = await httpRequest.get(
      `/api/Product/GetListProduct?${idType}`,
      {
        params: {
          OrderBy: orderBy || "IdType",
          AES: isAes === true ? true : false,
          PageIndex: pageIndex || 0,
          PageSize: pageSize || 9999,
          Search: search || "",
          PriceFrom: priceFrom|| -1,
          PriceTo:  priceTo|| -1

        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTopNewProducts = async () => {
  try {
    const response = await httpRequest.get("/api/Product/GetTop10NewBrand");
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getProductDetail = async (id: any) => {
  try {
    const response = await httpRequest.get(`/api/Product/${id}`, {});
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createProduct = async (params: any) => {
  const {
    IdType,
    NameType,
    Name,
    Description,
    Price,
    Amount,
    PriceDiscount,
    Images,
  } = params;
  try {
    const response = httpRequest.post("/api/Product/NewProduct", {
      IdType,
      NameType,
      Name,
      Description,
      Price,
      Amount,
      PriceDiscount,
      Images,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const removeProduct = async (idRemove: any) => {
  try {
    await httpRequest.deleteReq(`/api/Product/${idRemove}`);
  } catch (e) {
    console.log(e);
  }
};

export const updateProductService = async (params: any) => {
  const {
    idProduct,
    name,
    description,
    price,
    amount,
    priceDiscount,
    insertImages,
    updateImage,
    deletedImage,
  } = params;

  try {
    await httpRequest.patch("/api/Product/UpdateProduct", {
      IdProduct: idProduct,
      Name: name || "Name",
      Description: description || "Description",
      Price: price || 0,
      Amount: amount || 0,
      PriceDiscount: priceDiscount || 0,
      InsertImages: [...insertImages] || [],
      DeletedImage: [...deletedImage] || [],
      UpdateImage: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const postImgProduct = async (newImgList: any) => {
  try {
    await httpRequest.post("/api/Product/PostImage", [...newImgList]);
  } catch (e) {
    console.log(e);
  }
};
