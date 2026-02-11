import {
  getAddOnServices,
  getHotelBySlug,
  getRelatedHotels,
  getRoomList,
  getServicesByRoom,
} from "@/api/hotel.api";
import { defaultServices, info_booking } from "@/utils/constants";
import {
  arrayWithUniqueObject,
  cleanedObject,
  fillArrayWithObject,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Hotel, Service, Room, AddonService } from "@/types";

interface FetchServicesByRoomParams {
  roomID: any;
  roomName: any;
  source: any;
  searchParams: Record<string, any>;
  isRefreshServiceRoom?: boolean;
  roomIdButtonChoose?: any;
}

export const fetchServicesByRoom = createAsyncThunk<Service[] | undefined, FetchServicesByRoomParams>(
  "hotels/fetchServicesByRoom",
  async (
    { roomID, roomName, source, searchParams, isRefreshServiceRoom = false },
    thunkAPI
  ) => {
    if (!roomID) return;
    const infoBooking: any = getFromSessionStorage(info_booking);
    const roomActive = +searchParams.roomActive;
    const params = {
      roomID,
      fromDate: searchParams.checkIn,
      toDate: searchParams.checkOut,
    };
    let servicesRoom: any = null;
    try {
      servicesRoom = await getServicesByRoom(cleanedObject(params));
    } catch (error) {
      console.log("error", error);
    }
    if (!isRefreshServiceRoom) {
      const rootData =
        infoBooking.services[roomActive - 1] &&
        infoBooking.services[roomActive - 1].roomID === roomID
          ? infoBooking.services[roomActive - 1]
          : servicesRoom.data[0];

      // reset data rooms( increase the same service for all rooms)
      const services = fillArrayWithObject(infoBooking.services, {
        roomID,
        roomName,
        source,
        serviceID: rootData?.serviceID,
        serviceName: rootData?.serviceName,
        finalPrice: rootData?.finalPrice,
        listedPrice: rootData?.listedPrice,
        isNeedApproval: rootData?.isNeedApproval,
        serviceIDString: rootData?.serviceIDString,
        voucherCodes: rootData?.voucherCodes,
      });
      setToSessionStorage(info_booking, {
        ...infoBooking,
        services,
        voucherApplies: rootData.voucherApplies || []
      });
    } else {
      if (infoBooking?.services?.length > 0) {
        let servicesUpdate: any = null;
        infoBooking.services.map((item: any) => {
          const serviceNew = servicesRoom.data.find(
            (service: any) => service.serviceIDString === item.serviceIDString
          );

          if (!serviceNew) {
            servicesUpdate = null;
          } else {
            servicesUpdate = {
              roomID,
              roomName,
              source,
              serviceID: serviceNew?.serviceID,
              serviceName: serviceNew?.serviceName,
              finalPrice: serviceNew?.finalPrice,
              listedPrice: serviceNew?.listedPrice,
              isNeedApproval: serviceNew?.isNeedApproval,
              addOn: [],
              serviceIDString: serviceNew?.serviceIDString,
              voucherCodes: serviceNew?.voucherCodes,
            };
          }
          if (servicesUpdate) {
            const infoBookingMew: any = getFromSessionStorage(info_booking);
            console.log(infoBookingMew.voucherApplies)
          setToSessionStorage(info_booking, {
              ...infoBookingMew,
              services: infoBookingMew?.services.map((service: any) => {
                if (
                  service.serviceIDString === servicesUpdate?.serviceIDString
                ) {
                  return servicesUpdate;
                }
                return service;
              }),
              voucherApplies: infoBookingMew.voucherApplies || []
            });
          }
        });
      }
    }

    const event = new Event("triggerSearch");
    window.dispatchEvent(event);
    return servicesRoom.data;
  }
);

export const fetchHotelBySlug = createAsyncThunk<Hotel, Record<string, unknown>>(
  "hotels/fetchHotelBySlug",
  async (params) => {
    const response = await getHotelBySlug(params);
    return response.data as Hotel;
  }
);

export const fetchAddOnServices = createAsyncThunk<AddonService[], Record<string, unknown>>(
  "hotels/fetchAddOnServices",
  async (params) => {
    const response = await getAddOnServices(params);
    return response.data as AddonService[];
  }
);

export const fetchRoomList = createAsyncThunk<Room[], Record<string, unknown>>(
  "hotels/fetchRoomList",
  async (params) => {
    const response = await getRoomList(params);
    return response.data as Room[];
  }
);

export const fetchRelatedHotels = createAsyncThunk<Hotel[], Record<string, unknown>>(
  "hotels/fetchRelatedHotels",
  async (params) => {
    const response = await getRelatedHotels(params);
    return response.data as Hotel[];
  }
);
