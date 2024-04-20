import * as httpRequest from "../utils/httpRequest";

export const getAllOrderList = async (params: any) => {
  const {
    filter,
    pageIndex,
    pageSize,
    search,
    fromDate,
    toDate,
    orderBy,
    isAes,
  } = params;

  let date = new Date();
  let firstDay = new Date(date.getFullYear(), 1, 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  try {
    const response = await httpRequest.get("/api/Order/GetAllOrderList", {
      params: {
        Filter: filter || -1,
        PageIndex: pageIndex || 0,
        PageSize: pageSize || 9999,
        Search: search,
        From: fromDate || firstDay,
        To: toDate || lastDay,
        OrderBy: orderBy || "DateOrder",
        AES: isAes === true ? true : false,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getDetail = async (params: any) => {
  const { idOrder } = params;
  try {
    const response = await httpRequest.get(`/api/Order/GetOrderDetail/`, {
      params: {
        idOrder: idOrder,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createOrderServices = async (params: any) => {
  const { products, address, shipCost } = params;
  try {
    await httpRequest.post("/api/Order/OrderProduct", {
      Product: { ...products },
      // IdStatus: 5,
      // TotalCost: totalCost,
      IdVoucher: "",
      AddressOrder: address,
      ShipCost: shipCost || 0,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAuthOrderList = async () => {
  try {
    const response = await httpRequest.get(
      "/api/Order/GetListOrder?status=-1",
      {
        params: {
          OrderBy: "dateOrder",
          AES: true,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return "fail";
  }
};

export const getOrderCancelList = async () => {
  try {
    const response = await httpRequest.get("/api/Order/GetListOrder?status=7");
    return response.data;
  } catch (error) {
    console.log(error);
    return "fail";
  }
};

export const updateOrderServices = async (params: any) => {
  const { idOrder, isConfirm } = params;
  try {
    const response = await httpRequest.post(`/api/Order/ConfirmOrder`, {
      IdOrder: idOrder,
      IsConfirm: isConfirm,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async (params: any) => {
  const { idOrder } = params;

  try {
    const response = httpRequest.post(
      `/api/Order/CancelOrder?idOrder=${idOrder}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const doneOrder = async (params: any) => {
  const { idOrder } = params;
  try {
    const response = await httpRequest.post(
      `/api/Order/DoneOrderProduct?idOrder=${idOrder}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const takeOrder = async (params: any) => {
  const { idOrder } = params;
  try {
    const response = await httpRequest.post(
      `/api/Order/HandlerOrderProduct?idOrder=${idOrder}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
