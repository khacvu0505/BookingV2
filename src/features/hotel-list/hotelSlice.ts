import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecommendHotels } from "./reducers";
import type { Hotel, HotelListFilter, Region } from "@/types";

export interface HotelListState {
  hotels: Hotel[];
  total: number;
  totalPages: number;
  isLoadingHotels: boolean;
  regions: Region[];
  filter: HotelListFilter;
  secondaryLocation: unknown;
  recommendHotels: Hotel[];
  isLoadingRecommendHotels: boolean;
}

const initialState: HotelListState = {
  hotels: [],
  total: 0,
  totalPages: 0,
  isLoadingHotels: false,
  regions: [],
  // regionsFilter: [],
  filter: {
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    room: 1,
    page: 1,
    pageSize: 10,
    minPrice: 0,
    maxPrice: 20000000,
    "Entity.Keyword": "",
    "Entity.Rating": "",
    "Entity.SecondaryLocation": "",
  },
  secondaryLocation: undefined,
  recommendHotels: [],
  isLoadingRecommendHotels: true,
};

export const hotelSlice = createSlice({
  name: "hotel-list",
  initialState,
  reducers: {
    setRequestingHotels: (state) => {
      state.isLoadingHotels = true;
    },
    setHotels: (state, { payload }: PayloadAction<{ data: Hotel[]; total: number; totalPages: number }>) => {
      if (Array.isArray(payload.data)) {
        state.hotels = payload.data;
        state.total = payload.total;
        state.totalPages = payload.totalPages;
        state.isLoadingHotels = false;
        return;
      }
      state.hotels = [];
      state.total = 0;
      state.totalPages = 0;
      state.isLoadingHotels = false;
    },
    setSecondaryLocation: (state, { payload }: PayloadAction<unknown>) => {
      state.secondaryLocation = payload;
    },
    setRegions: (state, { payload }: PayloadAction<Region[]>) => {
      state.regions = payload;
    },
    setFilterHotels: (state, { payload }: PayloadAction<Partial<HotelListFilter>>) => {
      state.filter = {
        ...state.filter,
        ...payload,
      };
    },
    updateHotelList: (state, { payload }: PayloadAction<{ supplierCode: string; wishListID: string | null }>) => {
      const newData = state.hotels.map((hotel) => {
        if (hotel.supplierCode === payload.supplierCode) {
          return {
            ...hotel,
            wishListID: payload.wishListID,
          };
        }
        return hotel;
      });
      state.hotels = newData;
    },
    updateHotelRecommendList: (state, { payload }: PayloadAction<{ supplierCode: string; wishListID: string | null }>) => {
      const newData = state.recommendHotels.map((hotel) => {
        if (hotel.supplierCode === payload.supplierCode) {
          return {
            ...hotel,
            wishListID: payload.wishListID,
          };
        }
        return hotel;
      });
      state.recommendHotels = newData;
    },
    setRecommendHotels: (state, { payload }: PayloadAction<Hotel[]>) => {
      state.recommendHotels = payload;
      state.isLoadingRecommendHotels = false;
    },
  },
  extraReducers: (builder) => {
    // recommend hotels
    builder.addCase(fetchRecommendHotels.fulfilled, (state, action) => {
      state.recommendHotels = action.payload;
      state.isLoadingRecommendHotels = false;
    });
    builder.addCase(fetchRecommendHotels.pending, (state) => {
      state.isLoadingRecommendHotels = true;
    });
    builder.addCase(fetchRecommendHotels.rejected, (state) => {
      state.isLoadingRecommendHotels = false;
    });
  },
});

export const {
  setHotels,
  setSecondaryLocation,
  setRequestingHotels,
  setRegions,
  setLoaded,
  setFilterHotels,
  updateHotelList,
  updateHotelRecommendList,
  setRecommendHotels,
} = hotelSlice.actions as any;

export default hotelSlice.reducer;
