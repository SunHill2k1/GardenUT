import axios from "axios";

export function getProvinces() {
  try {
    const response = axios.get("https://provinces.open-api.vn/api/p/");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function getDistricts(provinceId: number) {
  try {
    const response = axios.get(
      `https://provinces.open-api.vn/api/p/${provinceId}?depth=2`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function getWards(districtId: number) {
  try {
    const response = axios.get(
      `https://provinces.open-api.vn/api/d/${districtId}?depth=2`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
