import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAddOnServices,
  fetchHotelBySlug,
  fetchRelatedHotels,
  fetchRoomList,
  fetchServicesByRoom,
} from "./reducers";
import type { Hotel, Service, Room, AddonService } from "@/types";

export interface HotelDetailState {
  servicesRoom: Service[];
  isLoadingService: boolean;
  roomActive: number;
  hotelInfo: Hotel | null;
  roomInfos: Room[];
  isLoadingHotelInfo: boolean;
  isLoadingAddon: boolean;
  addonServices: AddonService[];
  isLoadingRoomList: boolean;
  isLoadingRelatedHotels: boolean;
  relatedHotels: Hotel[];
  hotelPolicies: Record<string, unknown> | null;
}

const initialState: HotelDetailState = {
  servicesRoom: [],
  isLoadingService: false,
  roomActive: 1,
  hotelInfo: null,
  roomInfos: [],
  isLoadingHotelInfo: true,
  isLoadingAddon: false,
  addonServices: [],
  isLoadingRoomList: false,
  isLoadingRelatedHotels: true,
  relatedHotels: [],
  hotelPolicies: null,
};

export const hotelDetailSlice = createSlice({
  name: "hotel-detail",
  initialState,
  reducers: {
    setRoomActive: (state, { payload }: PayloadAction<number>) => {
      state.roomActive = payload;
    },
    clearHotelInfo: (state) => {
      state.hotelInfo = null;
      state.isLoadingHotelInfo = true;
      state.roomInfos = [];
      state.isLoadingRoomList = false;
    },
    updateRelatedHotels: (state, { payload }: PayloadAction<{ supplierCode: string; wishListID: string | null }>) => {
      const newData = state.relatedHotels.map((hotel) => {
        if (hotel.supplierCode === payload.supplierCode) {
          return {
            ...hotel,
            wishListID: payload.wishListID,
          };
        }
        return hotel;
      });
      state.relatedHotels = newData;
    },
    updateHotelInfo: (state, { payload }: PayloadAction<{ wishListID: string | null }>) => {
      state.hotelInfo = {
        ...state.hotelInfo,
        wishListID: payload.wishListID,
      } as Hotel;
    },
  },
  extraReducers: (builder) => {
    // ServiceRoom
    builder.addCase(fetchServicesByRoom.fulfilled, (state, action) => {
      state.servicesRoom = action.payload as Service[];
      state.isLoadingService = false;
    });
    builder.addCase(fetchServicesByRoom.pending, (state) => {
      state.isLoadingService = true;
    });
    builder.addCase(fetchServicesByRoom.rejected, (state) => {
      state.isLoadingService = false;
    });

    // Hotel Info
    builder.addCase(fetchHotelBySlug.fulfilled, (state, action) => {
      state.hotelInfo = action.payload;
      state.isLoadingHotelInfo = false;
    });
    builder.addCase(fetchHotelBySlug.pending, (state) => {
      state.isLoadingHotelInfo = true;
    });
    builder.addCase(fetchHotelBySlug.rejected, (state) => {
      state.isLoadingHotelInfo = false;
    });

    // Addon services
    builder.addCase(fetchAddOnServices.fulfilled, (state, action) => {
      state.addonServices = action.payload;
      state.isLoadingAddon = false;
    });
    builder.addCase(fetchAddOnServices.pending, (state) => {
      state.isLoadingAddon = true;
    });
    builder.addCase(fetchAddOnServices.rejected, (state) => {
      state.isLoadingAddon = false;
    });

    // list rooms
    builder.addCase(fetchRoomList.fulfilled, (state, action) => {
      state.roomInfos = action.payload;
      state.isLoadingRoomList = false;
    });
    builder.addCase(fetchRoomList.pending, (state) => {
      state.isLoadingRoomList = true;
    });
    builder.addCase(fetchRoomList.rejected, (state) => {
      state.isLoadingRoomList = false;
    });

    // related hotels
    builder.addCase(fetchRelatedHotels.fulfilled, (state, action) => {
      state.relatedHotels = action.payload;
      state.isLoadingRelatedHotels = false;
    });
    builder.addCase(fetchRelatedHotels.pending, (state) => {
      state.isLoadingRelatedHotels = true;
    });
    builder.addCase(fetchRelatedHotels.rejected, (state) => {
      state.isLoadingRelatedHotels = false;
    });
  },
});

export const {
  setRoomActive,
  clearHotelInfo,
  updateRelatedHotels,
  updateHotelInfo,
} = hotelDetailSlice.actions;

export default hotelDetailSlice.reducer;
