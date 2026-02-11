import useStorageListener from "@/hooks/useStorageListener";
import { create_invoice, info_booking, tax_include } from "@/utils/constants";
import {
  calculateNights,
  formatCurrency,
  getFromSessionStorage,
} from "@/utils/utils";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

interface BookingInfoData {
  hotelInfo?: {
    fromDate?: string;
    toDate?: string;
    [key: string]: unknown;
  };
  services?: Array<{
    finalPrice: number;
    addOn?: Array<{
      finalPrice: number;
      count: number;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  }>;
  totalPayment?: number;
  [key: string]: unknown;
}

const TotalPrice = () => {
  const { t } = useTranslation();
  const { currentCurrency } = useSelector((state) => state.app);
  const { pathname } = useLocation();
  const infoBookingFromSession = useStorageListener<BookingInfoData>(info_booking);
  const [priceAddons, setPriceAddons] = useState(0);

  const isBookingPage = pathname === "/booking";
  const taxInclude = Boolean(!getFromSessionStorage(tax_include));
  const createInvoice = Boolean(getFromSessionStorage(create_invoice));
  const fromDate = useMemo(
    () => infoBookingFromSession?.hotelInfo?.fromDate,
    [infoBookingFromSession?.hotelInfo]
  );
  const toDate = useMemo(
    () => infoBookingFromSession?.hotelInfo?.toDate,
    [infoBookingFromSession?.hotelInfo]
  );
  const numberNights = useMemo(
    () => calculateNights(fromDate, toDate),
    [fromDate, toDate]
  );

  const totalPrice = useMemo(() => {
    return (
      (infoBookingFromSession?.services?.reduce(
        (acc: number, cur: any) => acc + (cur?.finalPrice || 0) * numberNights,
        0
      ) || 0) + priceAddons
    );
  }, [infoBookingFromSession?.services, numberNights, priceAddons]);

  useEffect(() => {
    if (infoBookingFromSession?.services && infoBookingFromSession.services.length > 0) {
      const addOns = infoBookingFromSession.services.map((item: any) =>
        item?.addOn?.length > 0 ? item?.addOn : []
      );
      const listAddon = ([] as any[]).concat(...addOns);
      setPriceAddons(
        listAddon.reduce((acc: number, cur: any) => acc + (cur?.finalPrice || 0) * (cur?.count || 0), 0)
      );
    }
  }, [infoBookingFromSession?.services]);

  return (
    <div className="row justify-content-between pb-0 ">
      <div className="col-auto text-16 fw-600 text-neutral-800">
        {t("COMMON.TOTAL_PAYMENT")}
      </div>
      <p className="col-auto  text-16 fw-600 text-primary-500">
        {isBookingPage ? (
          <>
            {createInvoice && taxInclude
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
          <>{`${formatCurrency(totalPrice) || 0} ${currentCurrency}`}</>
        )}
      </p>
    </div>
  );
};

export default TotalPrice;
