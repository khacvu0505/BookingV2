import http from "@/utils/http";
import type { ApiResponse } from "@/types";

const URL_GET_DESTINATION_BY_REGION = "/category/region";
const URL_POPULAR_DESTINATIONS = "/supplier/recommend-hotels";

export const getDestinationByRegion = (region: string): Promise<ApiResponse> => {
  return http.get(`${URL_GET_DESTINATION_BY_REGION}/${region}`);
};

export const getPopularDestinations = (data: Record<string, unknown>): Promise<ApiResponse> => {
  return http.post(URL_POPULAR_DESTINATIONS, data);
};
