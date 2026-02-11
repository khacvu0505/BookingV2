import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Tour, TourListFilter, Region } from "@/types";

export interface TourListState {
  tours: Tour[];
  total: number;
  totalPages: number;
  isLoadingTours: boolean;
  regions: Region[];
  filter: TourListFilter;
}

const initialState: TourListState = {
  tours: [],
  total: 0,
  totalPages: 0,
  isLoadingTours: false,
  regions: [],
  filter: {
    regionID: "",
    minPrice: 0,
    maxPrice: 200000000,
    votes: 0,
    categoryType: 0,
    duration: 0,
    languages: "",
  },
};

export const tourSlice = createSlice({
  name: "tour-list",
  initialState,
  reducers: {
    setRequestingTours: (state) => {
      state.isLoadingTours = true;
    },
    setTours: (state, { payload }: PayloadAction<{ data: Tour[]; totalRecords: number; totalPage: number }>) => {
      if (Array.isArray(payload.data)) {
        state.tours = payload.data;
        state.total = payload.totalRecords;
        state.totalPages = payload.totalPage;
        state.isLoadingTours = false;
        return;
      }
      state.tours = [];
      state.total = 0;
      state.totalPages = 0;
      state.isLoadingTours = false;
    },

    updateTourList: (state, { payload }: PayloadAction<{ supplierCode: string; wishListID: string | null }>) => {
      const newData = state.tours.map((tour) => {
        if (tour.supplierCode === payload.supplierCode) {
          return {
            ...tour,
            wishListID: payload.wishListID,
          };
        }
        return tour;
      });
      state.tours = newData;
    },

    setRegions: (state, { payload }: PayloadAction<Region[]>) => {
      state.regions = payload;
    },
    // setFilterHotels: (state, { payload }) => {
    //   state.filter = {
    //     ...state.filter,
    //     ...payload,
    //   };
    // },
  },
  extraReducers: (builder) => {
    // recommend hotels
    // builder.addCase(fetchRecommendHotels.fulfilled, (state, action) => {
    //   state.recommendHotels = action.payload;
    //   state.isLoadingRecommendHotels = false;
    // });
    // builder.addCase(fetchRecommendHotels.pending, (state) => {
    //   state.isLoadingRecommendHotels = true;
    // });
    // builder.addCase(fetchRecommendHotels.rejected, (state) => {
    //   state.isLoadingRecommendHotels = false;
    // });
  },
});

export const {
  setTours,
  setRegions,
  setFilterHotels,
  updateTourList,
  setRequestingTours,
} = tourSlice.actions as any;

export default tourSlice.reducer;
