import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TourBookingInfo } from "@/types";

export interface TourState {
  tourBookingInfo: TourBookingInfo;
}

const initialState: TourState = {
  tourBookingInfo: {
    supplierCode: "",
    supplierName: "",
    date: "",
    voucherFID: "",
    isNeedApproval: true,
    tourID: null,
    tourName: "",
    slug: "",
    ServicePrices: [],
    addons: [],
  },
};

export const tourSlice = createSlice({
  name: "tour",
  initialState: initialState,
  reducers: {
    setTourBookingInfo: (state, { payload }: PayloadAction<TourBookingInfo>) => {
      state.tourBookingInfo = payload;
    },
  },
});

export const { setTourBookingInfo } = tourSlice.actions;

export default tourSlice.reducer;
