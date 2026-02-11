import { getRecommendHotels } from "@/api/hotel.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Hotel } from "@/types";

export const fetchRecommendHotels = createAsyncThunk<Hotel[], Record<string, unknown>>(
  "hotels/fetchRecommendHotels",
  async (params) => {
    const response = await getRecommendHotels(params);
    return response.data as Hotel[];
  }
);
