import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_SUPPLIER_TYPE = "/category/supplier-type";
const URL_GET_VOURCHER_CATEGORY = "/voucher/categories";
const URL_GET_SEARCH_VOUCHER = "/voucher/search-voucher";

export const getSupplierType = (): Promise<ApiResponse> => {
  return http.get(URL_GET_SUPPLIER_TYPE);
};

export const getVoucherCategory = (): Promise<ApiResponse> => {
  return http.get(URL_GET_VOURCHER_CATEGORY);
};

export const getPromotionList = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.get(URL_GET_SEARCH_VOUCHER, { params });
};
