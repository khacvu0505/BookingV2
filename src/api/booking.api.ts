import { hold_code } from "@/utils/constants";
import http from "@/utils/http";
import { getFromSessionStorage } from "@/utils/utils";
import type { ApiResponse } from "@/types";

const URL_SAVE_BOOKING = "/booking/save-booking";
const URL_SAVE_BOOKING_TOUR = "/booking/save-booking-tour";

const URL_VERIFY_OTP = "/booking/verify-otp-payment";
const URL_GET_BOOKING_INFO = "/booking/booking-info";
const URL_GET_BOOKING_INFO_TOUR = "/booking/booking-tour-info";
const URL_ONE_PAY_CALLBACK = "/booking/onepay/callback";
const URL_RESEND_OTP = "/booking/send-otp-payment";
const URL_SEND_OTP = "/booking/send-otp-payment";
const URL_GET_HOLD_TIME = "/booking/get-holdtime";
const URL_GET_BOOKING_OVERVIEW = "/booking/booking-overview";
const URL_GET_BOOKING_EXPIRED = "/booking/expired-booking";
const URL_GET_BOOKING_HOLD = "/booking/hold-booking";
const URL_FEEDBACK_BOOKING = "/supplier/feedback-booking";
const URL_RESEND_INFO_BOOKING = "/booking/send-email-confirm-booking";
const URL_APPLY_PROMOTION_CODE = "/booking/voucher-apply";
const URL_GET_CART_SUMMARY = "/booking/get-cart-summary";
const URL_GET_CART_TOUR_SUMMARY = "/booking/get-cart-tour-summary";
const URL_GET_HOLD_BOOKING_TOUR = "/booking/hold-booking-tour";
const URL_GET_PAYMENT_BOOKING = "/booking/payment-booking";
const URL_GET_POLICY_BY_SUPPLIER = "/supplier/get-policy-supplier";

export const getPolicyBySupplier = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_POLICY_BY_SUPPLIER, data);
};

export const saveBooking = (body: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_SAVE_BOOKING, body);
};

export const saveBookingTour = (body: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_SAVE_BOOKING_TOUR, body);
};

export const verifyOTP = (body: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_VERIFY_OTP, body, {
    headers: { HoldCode: getFromSessionStorage(hold_code) },
  });
};
export const resendOTP = (email: string): Promise<ApiResponse> => {
  return http.post(URL_RESEND_OTP, email);
};
export const sendOTP = (email: string): Promise<ApiResponse> => {
  return http.post(URL_SEND_OTP, email);
};

export const getBookingInfo = (bookingID: string): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_INFO, bookingID);
};

export const getBookingInfoTour = (bookingID: string): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_INFO_TOUR, bookingID);
};

export const getOnePayCallback = ({
  url,
  bookingID,
}: {
  url: string;
  bookingID: string;
}): Promise<ApiResponse> => {
  return http.post(
    URL_ONE_PAY_CALLBACK,
    { url, bookingID },
    {
      headers: { HoldCode: getFromSessionStorage(hold_code) },
    }
  );
};

export const getBookingOverview = (bookingID: string): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_OVERVIEW, bookingID);
};

export const getHoldTime = (holdCode: string): Promise<ApiResponse> => {
  return http.post(URL_GET_HOLD_TIME, "", {
    headers: { HoldCode: holdCode },
  });
};

export const getBookingExpired = (holdCode: string): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_EXPIRED, "", {
    headers: { HoldCode: holdCode },
  });
};

export const getHoldBooking = (data: Record<string, unknown>, holdCode: string): Promise<ApiResponse> => {
  return http.post(URL_GET_BOOKING_HOLD, data, {
    headers: { HoldCode: holdCode },
  });
};

export const feedbackBooking = (body: FormData): Promise<ApiResponse> => {
  return http.post(URL_FEEDBACK_BOOKING, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const resendInfoBooking = (bookingID: string): Promise<ApiResponse> => {
  return http.post(URL_RESEND_INFO_BOOKING, bookingID);
};

// export const applyPromotionCode = (data: Record<string, unknown>): Promise<ApiResponse> => {
//   return http.post(URL_APPLY_PROMOTION_CODE, data);
// };

export const getCartSummary = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_CART_SUMMARY, data);
};

export const getCartTourSummary = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_CART_TOUR_SUMMARY, data);
};

export const getHoldBookingTour = (data: Record<string, unknown>, holdCode: string): Promise<ApiResponse> => {
  return http.post(URL_GET_HOLD_BOOKING_TOUR, data, {
    headers: { HoldCode: holdCode },
  });
};

export const getPaymentBooking = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_PAYMENT_BOOKING, data, {
    headers: {
      HoldCode: getFromSessionStorage(hold_code),
    },
  });
};
