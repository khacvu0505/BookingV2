import { DateObject } from "react-multi-date-picker";
import { useTranslation } from "react-i18next";
import type { RoomService } from "@/types";

export const defaultServices = (numberRooms = 1): RoomService[] => {
  return new Array(numberRooms).fill(objDefaultService);
};

export const objDefaultService: RoomService = {
  roomID: "",
  roomName: "",
  source: "",
  serviceID: "",
  serviceName: "",
  finalPrice: 0,
  isNeedApproval: "nochoose",
  addOn: [],
  serviceIDString: "",
  voucherCodes: "",
};

export const info_booking = "info_booking";
export const info_booking_tour = "tourBookingInfo";
export const hotel_search_history = "hotel_search_history";
export const tour_search_history = "tour_search_history";
export const previous_item = "previous_item";
export const profile_user = "profile";
export const access_token = "access_token";

export const booking_id = "booking_id";
export const hold_code = "hold_code";

export const useTabTitleHeader = (): string[] => {
  const { t } = useTranslation();

  return [
    t("COMMON.RATING"),
    t("COMMON.POLICY"),
    t("COMMON.AMENITIES"),
    t("COMMON.GALLERY"),
  ];
};

export const tax_include = "tax_include";
export const create_invoice = "create_invoice";

export const current_language = "current_language";

export const current_currency = "current_currency";

export const LANGUAGES = ["vn", "gb", "kr", "cn"] as const;

export const DEFAULT_LANGUAGE = "vn";

export const DEFAULT_CURRENCY = "đ";

export const CURRENCY: Record<string, string> = {
  vn: "đ",
  kr: "₩",
  cn: "¥",
  gb: "$",
  id: "Rp",
  eur: "€",
  myr: "RM",
  php: "₱",
  sgd: "SGD",
  thb: "THB",
};

export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 992;
export const BREAKPOINT_XL = 1200;
export const BREAKPOINT_XXL = 1280;

export const defaultDateRange: [DateObject, DateObject] = [
  new DateObject(new Date()),
  new DateObject(new Date()).add(3, "day"),
];
