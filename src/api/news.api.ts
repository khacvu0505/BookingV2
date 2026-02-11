import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_NEWS_BY_REGION = "/blog/search";

const URL_GET_NEWS_RELATED = "/blog/recommend";

const URL_GET_TOURS_RECOMMEND = "/supplier/recommend-hotels";

export const getNewsByRegion = (params: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_NEWS_BY_REGION, { ...params });
};

export const getNewsRelated = (): Promise<ApiResponse> => {
  return http.post(URL_GET_NEWS_RELATED, "");
};

export const getToursRecommend = (): Promise<ApiResponse> => {
  return http.post(URL_GET_TOURS_RECOMMEND, { type: 6 });
};
