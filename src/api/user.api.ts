import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_PROFILE = "/authentication/user-info";

const URL_GET_BOOKING_HISTORY = "/booking/bookings";

const URL_GET_BOOKING_DETAIL = "/booking/booking-detail";

const URL_GET_BOOKING_DETAIL_TOUR = "/booking/booking-tour-info";

const URL_GET_BOOKING_TOUR_DETAIL = "/booking/booking-tour-info";

const URL_GET_CATEGOTY_TYPE_FAVOURITE = "/category/supplier-type";

const URL_SAVE_FAVOURITE = "/supplier/save-favourite";

const URL_REMOVE_FAVOURITE = "/supplier/remove-favourite";

const URL_GET_FAVOURITE_LIST = "/supplier/get-favourites";

const URL_GET_CANCEL_BOOKING_INFO = "/booking/get-totalrefund";

const URL_REQUEST_CANCEL_BOOKING = "/booking/request-cancel";

const URL_REQUEST_CONTACT = "/contact/new-contact";

const URL_UPDATE_USER_INFO = "/authentication/update-user";

const URL_FORGOT_PASSWORD = "/authentication/forgot-password";

const URL_HASHTAG_SEARCH_ALL = "/category/hastags";

export const getHashtagSearchAll = (): Promise<ApiResponse> => {
  return http.get(URL_HASHTAG_SEARCH_ALL);
};

export const forgotPassword = (email: string): Promise<ApiResponse> => {
  return http.post(URL_FORGOT_PASSWORD, email);
};

export const updateUserInfo = (data: FormData): Promise<ApiResponse> => {
  return http.post(URL_UPDATE_USER_INFO, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const requestContact = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_REQUEST_CONTACT, data);
};

export const getProfile = (): Promise<ApiResponse> => {
  return http.post(URL_GET_PROFILE, "");
};

export const getBookingHistory = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_HISTORY, data);
};

export const getBookingDetailTour = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_DETAIL_TOUR, data);
};

export const getBookingDetail = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_DETAIL, data);
};

export const getBookingTourDetail = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_TOUR_DETAIL, data);
};

export const getCategoryTypeFavourite = (): Promise<ApiResponse> => {
  return http.get(URL_GET_CATEGOTY_TYPE_FAVOURITE);
};

export const saveFavourite = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_SAVE_FAVOURITE, data);
};

export const removeFavourite = (wishlistId: string): Promise<ApiResponse> => {
  return http.post(URL_REMOVE_FAVOURITE, wishlistId);
};

export const getFavouriteList = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_FAVOURITE_LIST, data);
};

export const getCanceBookingInfo = (bookingId: string): Promise<ApiResponse> => {
  return http.post(URL_GET_CANCEL_BOOKING_INFO, bookingId);
};

export const requestCancelBooking = (bookingId: string): Promise<ApiResponse> => {
  return http.post(URL_REQUEST_CANCEL_BOOKING, bookingId);
};
