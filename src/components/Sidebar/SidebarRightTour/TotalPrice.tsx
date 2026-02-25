import useStorageListener from "@/hooks/useStorageListener";
import {
  create_invoice,
  info_booking_tour,
  tax_include,
} from "@/utils/constants";
import {
  formatCurrency,
  getFromSessionStorage,
} from "@/utils/utils";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import type { TourBookingInfo, TourServicePrice, AddonService } from "@/types";

interface TourBookingData extends Partial<TourBookingInfo> {
  totalPayment?: number;
  [key: string]: unknown;
}

const TotalPrice = () => {
  const { currentCurrency } = useSelector((state) => state.app);
  const { pathname } = useLocation();
  const isBookingPage = pathname === "/booking-tour";
  const infoBookingFromSession = useStorageListener<TourBookingData>(info_booking_tour);
  const taxInclude = Boolean(!getFromSessionStorage(tax_include));
  const createInvoice = useStorageListener<boolean>(create_invoice);

  const totalPrice = useMemo(() => {
    return infoBookingFromSession?.ServicePrices?.reduce(
      (acc: number, cur: TourServicePrice) => acc + (cur?.finalPrice || 0) * (cur?.quantity || 0),
      0
    ) || 0;
  }, [infoBookingFromSession?.ServicePrices]);

  const totalAddons = useMemo(() => {
    return infoBookingFromSession?.addons?.reduce(
      (acc: number, cur: AddonService) => acc + (cur?.finalPrice || 0) * (cur?.count || 0),
      0
    ) || 0;
  }, [infoBookingFromSession?.addons]);

  return (
    <div className="row justify-content-between">
      <div className="col-auto text-16 fw-400 text-neutral-800 fw-bold text-neutral-800">
        Tong thanh toan:
      </div>
      <p className="col-auto text-16 fw-600 text-primary-500">
        {isBookingPage ? (
          <>
            {!!createInvoice && taxInclude
              ? `${
                  infoBookingFromSession?.totalPayment
                    ? formatCurrency(infoBookingFromSession?.totalPayment * 1.1)
                    : 0
                } ${currentCurrency}`
              : `${
                  infoBookingFromSession?.totalPayment
                    ? formatCurrency(infoBookingFromSession?.totalPayment)
                    : 0
                } ${currentCurrency}`}
          </>
        ) : (
          <>{`${
            formatCurrency(totalPrice + (totalAddons || 0)) || 0
          } ${currentCurrency}`}</>
        )}
      </p>
    </div>
  );
};

export default TotalPrice;
