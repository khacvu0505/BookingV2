import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import {
  clearAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  getAccessTokenFromLocalStorage,
} from "./auth";
import {
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
  URL_REGISTER,
} from "@/api/auth.api";
import {
  formatCurrencySendToServer,
  isAxiosUnauthorizeError,
  formatLanguageSendToSever,
} from "./utils";
import i18n from "@/i18n";
import { current_currency } from "./constants";

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenQuest: Promise<string> | null;

  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage();
    this.refreshToken = "";
    this.refreshTokenQuest = null;
    this.instance = axios.create({
      baseURL: "https://extapi.okdimall.com/api",
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // interceptors request
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const currencyFromLocal =
          (typeof window !== "undefined" ? JSON.parse(localStorage.getItem(current_currency) || "null")?.value : null) || "vn";
        const currency =
          currencyFromLocal !== "undefined" ? currencyFromLocal : "vn";
        config.headers["Lang"] = formatLanguageSendToSever(i18n.language);
        config.headers["CurrencyCode"] = formatCurrencySendToServer(currency);

        if (this.accessToken) {
          config.headers.Authorization = this.accessToken;
          return config;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url = "" } = response.config;
        const routes = [URL_LOGIN, URL_REGISTER];
        if (routes.includes(url)) {
          const data = response.data;
          this.accessToken = data.data;

          saveAccessTokenToLocalStorage(this.accessToken);
        }

        if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";

          clearAccessTokenFromLocalStorage();
        }
        return response.data;
      },
      (error) => {
        console.log("error", error);

        if (isAxiosUnauthorizeError(error)) {
          console.log("is error 401");
          const config = error.response?.config || { headers: {} };
          const url = config?.url || "";
          if (url !== URL_REFRESH_TOKEN) {
            this.refreshTokenQuest = this.refreshTokenQuest
              ? this.refreshTokenQuest
              : this.handleRefreshToken();
            return this.refreshTokenQuest
              ?.then((accessToken: string) => {
                return this.instance({
                  ...config,
                  headers: { ...config.headers, Authorization: accessToken },
                });
              })
              .finally(() => {
                this.refreshTokenQuest = null;
              });
          }

          clearAccessTokenFromLocalStorage();
          this.accessToken = "";
          this.refreshToken = "";
        }
        if (error) return Promise.reject(error);
      }
    );
  }
  handleRefreshToken = (): Promise<string> => {
    return this.instance
      .post(URL_REFRESH_TOKEN, "")
      .then((res: { data: string }) => {
        const { data: access_token } = res;
        saveAccessTokenToLocalStorage(access_token);
        this.accessToken = access_token;
        return access_token;
      })
      .catch((error: unknown) => {
        this.accessToken = "";
        clearAccessTokenFromLocalStorage();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        throw error;
      });
  };
}

const http = new Http().instance;

export default http;
