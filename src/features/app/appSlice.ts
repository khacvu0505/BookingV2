import { getAccessTokenFromLocalStorage, getProfile } from "@/utils/auth";
import {
  current_currency,
  current_language,
  DEFAULT_CURRENCY,
  defaultDateRange,
} from "@/utils/constants";
import {
  formatCurrencyFromLanguage,
  formatDateCalendar,
  getFromLocalStorage,
} from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SearchValue, UserProfile } from "@/types";

const isClient = typeof window !== "undefined";

export interface AppState {
  isAuthenticated: boolean;
  setIsAuthenticated: () => null;
  profile: UserProfile | null;
  setProfile: () => null;
  reset: () => null;
  wishlistInfo: Record<string, unknown>;
  currentCurrency: string;
  setChangeCurrency: () => null;
  searchValue: SearchValue;
  setSearchValue: () => null;
  valueInputSearch: string;
  setValueInputSearch: () => null;
}

const initialState: AppState = {
  isAuthenticated: isClient ? Boolean(getAccessTokenFromLocalStorage()) : false,
  setIsAuthenticated: () => null,
  profile: isClient ? getProfile() : null,
  setProfile: () => null,
  reset: () => null,
  wishlistInfo: {},
  currentCurrency: isClient
    ? formatCurrencyFromLanguage((getFromLocalStorage(current_currency) as any)?.value) ||
      DEFAULT_CURRENCY
    : DEFAULT_CURRENCY,
  setChangeCurrency: () => null,
  searchValue: {
    location: "",
    checkIn: formatDateCalendar(defaultDateRange[0]),
    checkOut: formatDateCalendar(defaultDateRange[1]),
    adults: 2,
    children: 0,
    room: 1,
    slug: "",
    locationName: "",
  },
  setSearchValue: () => null,
  valueInputSearch: "",
  setValueInputSearch: () => null,
};

export const appSlice = createSlice({
  name: "main-app",
  initialState,
  reducers: {
    setIsAuthenticated: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
    setProfile: (state, { payload }: PayloadAction<UserProfile | null>) => {
      state.profile = payload;
    },
    updateProfile: (state, { payload }: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...payload };
    },
    reset: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
      state.wishlistInfo = initialState.wishlistInfo;
    },
    setChangeCurrency: (state, { payload }: PayloadAction<string>) => {
      state.currentCurrency = payload;
    },
    setSearchValue: (state, { payload }: PayloadAction<Partial<SearchValue>>) => {
      state.searchValue = { ...state.searchValue, ...payload };
    },
    setValueInputSearch: (state, { payload }: PayloadAction<string>) => {
      state.valueInputSearch = payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setProfile,
  updateProfile,
  reset,
  setWishlistInfo,
  resetWishlistInfo,
  setChangeCurrency,
  setSearchValue,
  setValueInputSearch,
} = appSlice.actions as any;

export default appSlice.reducer;
