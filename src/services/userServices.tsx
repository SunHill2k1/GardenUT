import * as httpRequest from "../utils/httpRequest";

export const getAllUser = async (params: any) => {
  const { role, orderBy, pageIndex, pageSize, search, isAes } = params;

  try {
    const response = await httpRequest.get("/api/User/GetAllUser", {
      params: {
        Role: role || "*",
        OrderBy: orderBy || "FullName",
        AES: isAes === true ? true : false,
        PageIndex: pageIndex || 0,
        PageSize: pageSize || 5,
        Search: search,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const update = async (params: any) => {
  const { idUser, newRole } = params;
  try {
    const response = httpRequest.put(
      `/api/User/UpdateRole?idUser=${idUser}&newRole=${newRole}`
    );
    return response;
  } catch (error) {
    console.log(error);
    return "fail";
  }
};

export const getDetail = async (params: any) => {
  try {
    const response = await httpRequest.get(`/api/User/${params.idUser}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
