import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HotelDetailState {
  roomActive: number;
}

const initialState: HotelDetailState = {
  roomActive: 1,
};

export const hotelDetailSlice = createSlice({
  name: "hotel-detail",
  initialState,
  reducers: {
    setRoomActive: (state, { payload }: PayloadAction<number>) => {
      state.roomActive = payload;
    },
  },
});

export const {
  setRoomActive,
} = hotelDetailSlice.actions;

export default hotelDetailSlice.reducer;
