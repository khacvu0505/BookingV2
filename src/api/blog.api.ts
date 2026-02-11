import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_BLOG_DETAIL = "/blog/detail";

const URL_GET_RELATED_BLOG = "/blog/related";

export const getBlogDetail = (slug: string): Promise<ApiResponse> => {
  return http.post(URL_GET_BLOG_DETAIL, slug);
};

export const getBlogRelated = (body: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_GET_RELATED_BLOG, body);
};
