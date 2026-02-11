import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_TOUR_BY_SLUG = "/supplier/tour";
const URL_GET_TOUR_POLICIES_BY_SLUG = "/supplier/tour-policies";
const URL_GET_TOUR_SERVICE = "supplier/get-tour-service";
const URL_GET_TOUR_PRICES = "/supplier/get-tour-price";
const URL_GET_CATEGORY_BY_TOUR = "/category/categories-tour";
const URL_GET_TOUR_LIST = "/supplier/tours";

export const getTourBySlug = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_TOUR_BY_SLUG, params);
};

export const getTourPoliciesBySlug = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_TOUR_POLICIES_BY_SLUG, params);
};

export const getTourServices = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_TOUR_SERVICE, params);
};

export const getTourPrices = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_TOUR_PRICES, params);
};

export const getCategoryByTourService = (): Promise<ApiResponse> => {
  return http.get(URL_GET_CATEGORY_BY_TOUR);
};

export const getTourListService = (params: Record<string, unknown>): Promise<ApiResponse> => {
  const { Page = 1, PageSize = 9, Orders = "", ...res } = params;
  return http.post(URL_GET_TOUR_LIST, {
    page: Page,
    pagesize: PageSize,
    orders: Orders,
    Entity: {
      ...res,
    },
  });
};
