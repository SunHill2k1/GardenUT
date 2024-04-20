import * as httpRequest from "../utils/httpRequest";

export const getSalesOfMonth = async () => {
  try {
    const response = await httpRequest.get("/api/Order/GetChartOrder");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductSalesOfMonth = async (params: any) => {
  const { month } = params;
  try {
    const response = await httpRequest.get(
      `/api/Order/GetReportProduct?month=${month}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReportTypeProduct = async () => {
  try {
    const response = await httpRequest.get("/api/Order/GetReportTypeProduct");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTypeProductByMonth = async (params: any) => {
  const { idType } = params;

  try {
    const response = await httpRequest.get(
      `/api/Order/GetChartTypeProduct?idTypeProduct=${idType}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
