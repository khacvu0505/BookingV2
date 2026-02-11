import http from "@/utils/http";
import { cleanedObject } from "@/utils/utils";
import type { ApiResponse } from "@/types";

export const URL_GET_HOTEL_LIST = "/supplier/hotels";
const URL_GET_HOTEL_BY_SLUG = "/supplier/hotel";
const URL_GET_SERVICES_BY_ROOM = "/supplier/product-services";

export const URL_BENEFIT_GROUP = "/category/benefit-group";
const URL_GET_SECONDARY_LOCATION = "/category/secondary-location";
const URL_GET_ADD_ON_SERVICES = "/supplier/addon-services";
const URL_CHECK_ADD_ON_SERVICES = "/supplier/check-addon";
const URL_GET_ROOM_LIST = "/supplier/get-rooms";
const URL_GET_RELATED_HOTELS = "/supplier/related-hotels";
const URL_GET_RECOMMEND_HOTELS = "/supplier/recommend-hotels";
const URL_GET_HOTEL_POLICIES = "/supplier/hotel-policies";
const URL_ACCOMMODATION_TYPE = "/category/categories-hotel";
const URL_GET_VOTE_SUPPLIER = "/supplier/get-vote-supplier";
const URL_GET_LIST_COMMENTS = "/supplier/get-comments";
const URL_SEARCH_LOCATION = "/supplier/search-location";
const URL_GET_BENEFIT_BY_ROOM = "/supplier/get-benefit-product";
const URL_GET_IMAGE_LIBRARY = "/supplier/get-images-supplier";
const URL_SEARCH_GENERAL = "/supplier/search-general";

export const getImageLibrary = (supplierID: string): Promise<ApiResponse> => {
  return http.post(URL_GET_IMAGE_LIBRARY, supplierID);
};

export const getBenefitByRoom = (roomID: string): Promise<ApiResponse> => {
  return http.post(URL_GET_BENEFIT_BY_ROOM, roomID);
};

export const getHotelList = (params: Record<string, unknown>): Promise<ApiResponse> => {
  const { Page, PageSize, Orders = "", ...res } = params;
  return http.post(
    URL_GET_HOTEL_LIST,
    cleanedObject({
      page: Page,
      pagesize: PageSize,
      orders: Orders,
      Entity: {
        ...res,
      },
    })
  );
};

export const getBenefitGroup = (): Promise<ApiResponse> => {
  return http.get(URL_BENEFIT_GROUP);
};

export const getSubLocation = (location: string): Promise<ApiResponse> => {
  return http.get(URL_GET_SECONDARY_LOCATION, {
    params: { regionID: location },
  });
};

export const getHotelBySlug = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_HOTEL_BY_SLUG, params);
};

export const getServicesByRoom = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_SERVICES_BY_ROOM, params);
};

export const getAddOnServices = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_ADD_ON_SERVICES, params);
};

export const checkAddOnServices = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_CHECK_ADD_ON_SERVICES, params);
};

export const getRoomList = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_ROOM_LIST, params);
};

export const getRelatedHotels = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_RELATED_HOTELS, params);
};

export const getRecommendHotels = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_RECOMMEND_HOTELS, params);
};

export const getHotelPolicies = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_HOTEL_POLICIES, params);
};

export const getAccomordationType = (): Promise<ApiResponse> => {
  return http.get(URL_ACCOMMODATION_TYPE);
};

export const getVoteSupplier = (hotelCode: string): Promise<ApiResponse> => {
  return http.post(URL_GET_VOTE_SUPPLIER, hotelCode);
};

export const getListComments = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_LIST_COMMENTS, data);
};

export const getSearchLocation = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_SEARCH_LOCATION, data);
};

export const getSearchGeneral = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_SEARCH_GENERAL, data);
};
