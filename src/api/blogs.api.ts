import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_LIST_CATEGORY = "/blog/categories";
const URL_GET_SEARCH_BLOG = "/blog/search";
const URL_GET_RECENT_BLOG = "/blog/recent";
const URL_GET_RECOMMENDED_BLOG = "/blog/recommend";
const URL_GET_RELATED_BLOGS = "/blog/related";

export const getListCategory = (): Promise<ApiResponse> => {
  return http.post(URL_GET_LIST_CATEGORY, "");
};

export const getSearchBlogs = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_SEARCH_BLOG, data);
};

export const getRecentBlogs = (): Promise<ApiResponse> => {
  return http.post(URL_GET_RECENT_BLOG, "");
};

export const getRecommendBlogs = (): Promise<ApiResponse> => {
  return http.post(URL_GET_RECOMMENDED_BLOG, "");
};

export const getRelatedBlogs = (): Promise<ApiResponse> => {
  return http.post(URL_GET_RELATED_BLOGS, "");
};
