import http from "@/utils/http";
import type {
  ApiResponse,
  LoginBody,
  RegisterBody,
  UpdatePasswordBody,
  VerifyOtpBody,
} from "@/types";

export const URL_LOGIN = "/authentication/sign-in";
export const URL_REGISTER = "/authentication/register-user";
export const URL_LOGOUT = "/authentication/log-out";
export const URL_REFRESH_TOKEN = "/authentication/refresh-token";
export const URL_CHECK_EMAIL_EXIST = "/authentication/check-new-user";
export const URL_UPDATE_PASSWORD = "/authentication/update-password";
const URL_VERIFY_OTP = "/authentication/verify-otp";

export const refreshToken = (): Promise<ApiResponse> => {
  return http.post(URL_REFRESH_TOKEN, "");
};

export const registerAccount = (body: RegisterBody): Promise<ApiResponse> => {
  return http.post(URL_REGISTER, body);
};

export const loginAccount = (body: LoginBody): Promise<ApiResponse> => {
  return http.post(URL_LOGIN, body);
};

export const logout = (): Promise<ApiResponse> => {
  return http.post(URL_LOGOUT, "");
};

export const checkEmailExist = (email: string): Promise<ApiResponse> => {
  return http.post(URL_CHECK_EMAIL_EXIST, { email });
};

export const updatePassword = (data: UpdatePasswordBody): Promise<ApiResponse> => {
  return http.post(URL_UPDATE_PASSWORD, data);
};

export const verifyRegisterOTP = (data: VerifyOtpBody): Promise<ApiResponse> => {
  return http.post(URL_VERIFY_OTP, data);
};
