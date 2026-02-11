import { info_booking, defaultServices, info_booking_tour } from "./constants";
import type { BookingSearchParams, AddonService, RoomService } from "@/types";
import {
  arrayUnique,
  clearSessionStorage,
  getFromSessionStorage,
  setToSessionStorage,
  updateArray,
} from "./utils";

interface SetDefaultBookingParams {
  hotelCode: string;
  hotelName: string;
  searchParams: BookingSearchParams;
}

export const handleSetDefaultBooking = ({
  hotelCode,
  hotelName,
  searchParams,
}: SetDefaultBookingParams): void => {
  clearSessionStorage(info_booking);
  const servicesDefault = defaultServices(+(searchParams?.room || 1));
  setToSessionStorage(info_booking, {
    hotelInfo: {
      hotelCode: hotelCode,
      hotelName: hotelName,
      fromDate: searchParams?.checkIn,
      toDate: searchParams?.checkOut,
      adults: +(searchParams?.adults || 0),
      children: +(searchParams?.children || 0),
      room: +(searchParams?.room || 0),
    },
    services: servicesDefault,
    voucherApplies: [],
  });
  const event = new Event("triggerSearch");
  window.dispatchEvent(event);
};

interface ServiceLike {
  serviceName?: string;
  finalPrice?: number;
  serviceID?: string;
  [key: string]: unknown;
}

export const handleSetAddon = (
  service: ServiceLike,
  indexRoom: number,
  count: number,
  isCheck: boolean
): RoomService[] => {
  const infoBookingFromStorage = getFromSessionStorage<{
    services: RoomService[];
    voucherApplies: unknown[];
    [key: string]: unknown;
  }>(info_booking);
  const newObj = {
    serviceName: service?.serviceName || "",
    finalPrice: service?.finalPrice || 0,
    count: count,
    serviceID: service?.serviceID || "",
  };
  const services = infoBookingFromStorage?.services.map((item: RoomService, index: number) => {
    return index === indexRoom
      ? {
          ...item,
          addOn: isCheck
            ? arrayUnique([...item?.addOn] as Record<string, unknown>[], newObj as unknown as Record<string, unknown>, "serviceID") as unknown as AddonService[]
            : updateArray([...item?.addOn] as Record<string, unknown>[], newObj as unknown as Record<string, unknown>, "serviceID") as unknown as AddonService[],
        }
      : item;
  }) || [];
  setToSessionStorage(info_booking, {
    ...infoBookingFromStorage,
    services,
    voucherApplies: infoBookingFromStorage?.voucherApplies || [],
  });
  const event = new Event("triggerSearch");
  window.dispatchEvent(event);
  return services;
};

export const handleSetAddonTour = (
  service: ServiceLike,
  count: number,
  checked: boolean
): void => {
  const infoBookingTour = getFromSessionStorage<{
    addons?: AddonService[];
    [key: string]: unknown;
  }>(info_booking_tour);
  let addons: AddonService[] = infoBookingTour?.addons || [];
  const indexAddon = addons.findIndex(
    (item) => item?.serviceID === service?.serviceID
  );

  if (checked) {
    const newObj: AddonService = {
      serviceName: service?.serviceName || "",
      finalPrice: service?.finalPrice || 0,
      count: count,
      serviceID: service?.serviceID || "",
    };

    if (indexAddon === -1) {
      addons = [...addons, newObj];
    } else {
      addons[indexAddon] = newObj;
    }
  } else {
    if (indexAddon !== -1) {
      addons.splice(indexAddon, 1);
    }
  }
  setToSessionStorage(info_booking_tour, {
    ...infoBookingTour,
    addons,
  });
};
