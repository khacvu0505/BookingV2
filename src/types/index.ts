// ============================================================
// Central Type Definitions for OKdimall Booking Platform
// ============================================================

// --- API ---

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | any;
  totalPage?: number;
  totalRecords?: number;
}

export interface PaginatedRequest<E = Record<string, unknown>> {
  page: number;
  pagesize: number;
  orders?: string;
  Entity: E;
}

// --- Auth ---

export interface UserProfile {
  userID?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  mobileNo?: string;
  mobileCode?: string;
  countryFID?: string;
  avatar?: string;
  point?: number;
  [key: string]: unknown;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdatePasswordBody {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface VerifyOtpBody {
  email: string;
  otp: string;
}

// --- Hotel ---

export interface Hotel {
  supplierCode: string;
  supplierName: string;
  slug: string;
  address?: string;
  rating?: number;
  vote?: number;
  totalVote?: number;
  finalPrice?: number;
  listedPrice?: number;
  imageUrl?: string;
  images?: string[];
  latitude?: number;
  longitude?: number;
  regionFID?: string;
  regionName?: string;
  wishListID?: string | null;
  [key: string]: unknown;
}

export interface HotelListFilter {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room: number;
  page: number;
  pageSize: number;
  minPrice: number;
  maxPrice: number;
  "Entity.Keyword": string;
  "Entity.Rating": string;
  "Entity.SecondaryLocation": string;
}

export interface Room {
  roomID: string;
  roomName: string;
  source: string;
  [key: string]: unknown;
}

export interface Service {
  serviceID: string;
  serviceName: string;
  finalPrice: number;
  listedPrice?: number;
  isNeedApproval: string | boolean;
  serviceIDString: string;
  voucherCodes?: string;
  voucherApplies?: VoucherApply[];
  [key: string]: unknown;
}

export interface VoucherApply {
  voucherCode?: string;
  discountAmount?: number;
  [key: string]: unknown;
}

export interface AddonService {
  serviceID: string;
  serviceName: string;
  finalPrice: number;
  count: number;
  [key: string]: unknown;
}

export interface RoomService {
  roomID: string;
  roomName: string;
  source: string;
  serviceID: string;
  serviceName: string;
  finalPrice: number;
  listedPrice?: number;
  isNeedApproval: string | boolean;
  addOn: AddonService[];
  serviceIDString: string;
  voucherCodes: string;
}

// --- Tour ---

export interface Tour {
  supplierCode: string;
  supplierName: string;
  slug: string;
  address?: string;
  rating?: number;
  vote?: number;
  totalVote?: number;
  finalPrice?: number;
  listedPrice?: number;
  imageUrl?: string;
  images?: string[];
  regionFID?: string;
  regionName?: string;
  wishListID?: string | null;
  [key: string]: unknown;
}

export interface TourBookingInfo {
  supplierCode: string;
  supplierName: string;
  date: string;
  voucherFID: string;
  isNeedApproval: boolean;
  tourID: string | null;
  tourName: string;
  slug: string;
  ServicePrices: TourServicePrice[];
  addons: AddonService[];
}

export interface TourServicePrice {
  serviceID?: string;
  serviceName?: string;
  finalPrice?: number;
  quantity?: number;
  personType?: string;
  [key: string]: unknown;
}

export interface TourListFilter {
  regionID: string;
  minPrice: number;
  maxPrice: number;
  votes: number;
  categoryType: number;
  duration: number;
  languages: string;
}

// --- Booking ---

export interface BookingInfo {
  hotelInfo: {
    hotelCode: string;
    hotelName: string;
    fromDate: string;
    toDate: string;
    adults: number;
    children: number;
    room: number;
  };
  services: RoomService[];
  voucherApplies: VoucherApply[];
}

export interface BookingSearchParams {
  checkIn?: string;
  checkOut?: string;
  adults?: string | number;
  children?: string | number;
  room?: string | number;
  roomActive?: string | number;
  slug?: string;
  location?: string;
  locationName?: string;
  [key: string]: string | number | undefined;
}

// --- Common ---

export type CurrencyCode = "vn" | "kr" | "cn" | "gb" | "id" | "eur" | "myr" | "php" | "sgd" | "thb";

export type LanguageCode = "vn" | "gb" | "kr" | "cn";

export interface SearchValue {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room: number;
  slug: string;
  locationName: string;
}

export interface Region {
  regionID: string;
  regionName: string;
  slug?: string;
  [key: string]: unknown;
}

export interface PaymentInfo {
  id: number;
  title: string;
  img: string[];
  isAuthorization: boolean;
  code: string;
}

// --- Blog ---

export interface Blog {
  blogID?: string;
  title?: string;
  slug?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  createdDate?: string;
  categoryName?: string;
  [key: string]: unknown;
}

export interface BlogFilter {
  Page: number;
  pageSize: number;
  Entity: {
    RegionFID: string;
    CateID: number;
    Keyword: string;
    SupplierType: string;
  };
}

// --- Menu & Navigation ---

export interface MenuItem {
  name: string;
  routePath: string;
}

export interface MenuCategory {
  id: number;
  title: string;
  menuItems: {
    id: number;
    title: string;
    menuList: MenuItem[];
  }[];
}

export interface MegaMenuCol {
  id: number;
  megaBanner: string;
  title: string;
  btnText: string;
  btnRoute: string;
  menuItems: {
    id: number;
    title: string;
    menuList: MenuItem[];
  }[];
}

export interface MegaMenuItem {
  id: number;
  menuCol: MegaMenuCol[];
}

// --- Feedback / Rating ---

export interface FeedbackBody {
  bookingID: string;
  title: string;
  comment?: string;
  rating?: number;
  images?: File[];
}

// --- Wishlist ---

export interface WishlistItem {
  wishListID: string;
  supplierCode: string;
  supplierType?: number;
  [key: string]: unknown;
}

// --- Component Common Props ---

export interface ChildrenProps {
  children: React.ReactNode;
}
