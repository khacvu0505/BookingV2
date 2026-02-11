import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_REGIONS = "/category/regions";

const URL_GET_COUNTRIES = "/category/countries";

const URL_GET_MOBILE_CODE = "/category/mobile-code";

const URL_GET_IMAGE_HOME = "/category/categories-imagehome";

export const getRegions = (): Promise<ApiResponse> => {
  return http.get(URL_GET_REGIONS);
};

export const getCountries = (): Promise<ApiResponse> => {
  return http.get(URL_GET_COUNTRIES);
};

export const getMobileCode = (): Promise<ApiResponse> => {
  return http.get(URL_GET_MOBILE_CODE);
};

export const getImageHome = (): Promise<ApiResponse> => {
  return http.get(URL_GET_IMAGE_HOME);
};
