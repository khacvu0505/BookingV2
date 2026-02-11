"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setIsAuthenticated,
  setProfile,
  setChangeCurrency,
} from "@/features/app/appSlice";
import {
  getAccessTokenFromLocalStorage,
  getProfile,
} from "@/utils/auth";
import {
  current_currency,
  DEFAULT_CURRENCY,
} from "@/utils/constants";
import {
  getFromLocalStorage,
  formatCurrencyFromLanguage,
} from "@/utils/utils";

export default function ClientHydration() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessTokenFromLocalStorage();
    if (token) {
      dispatch(setIsAuthenticated(true));
      const profile = getProfile();
      if (profile) {
        dispatch(setProfile(profile));
      }
    }

    const currencyObj = getFromLocalStorage(current_currency);
    const currency = formatCurrencyFromLanguage((currencyObj as any)?.value);
    if (currency) {
      dispatch(setChangeCurrency(currency));
    }
  }, [dispatch]);

  return null;
}
