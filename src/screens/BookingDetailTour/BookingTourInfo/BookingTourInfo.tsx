import React, { useMemo } from "react";
import "./BookingTourInfo.style.scss";
import { useTranslation } from "react-i18next";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";

const BookingTourInfo = ({ overview }) => {
  const { t } = useTranslation();

  const data = useMemo(() => {
    return overview?.servicePrices || [];
  }, [overview]);

  const totalPayment = useMemo(() => {
    if (data?.length === 0) return 0;
    return data?.reduce((acc, item) => acc + item?.totalPayment, 0);
  }, [data]);
  if (data.length === 0) return <></>;

  return (
    <div>
      <table className="booking_tour_info_table table_invoice_tour d-block sm:d-none mt-40 mb-40">
        <thead className="booking_tour_thead">
          <th className="pl-16 lg:pl-10 fw-16 fw-400 text-left py-8 text-16 lg:text-15 md:text-14 min-w-300">
            {t("COMMON.TICKET")}
          </th>
          <th className="fw-16 fw-400 text-left py-8 text-16 lg:text-15 md:text-14 min-w-250">
            {t("COMMON.AMOUNT")}
          </th>
          <th className="fw-16 fw-400 text-left py-8 text-16 lg:text-15 md:text-14 min-w-250">
            {t("COMMON.TOTAL_AMOUNT")}
          </th>
        </thead>
        <tbody>
          {data?.map((item, idx) => (
            <tr key={idx} className="border-bottom-light">
              <td className="pl-16 py-8 text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                {overview?.tourName}
              </td>
              <td className="py-8 ">
                <span className="text-16 lg:text-15 md:text-14 fw-500 text-primary-500">
                  {item?.serviceName}
                </span>
                <span className="text-14 text-primary-500 ml-4">
                  x{item?.quantity}
                </span>
              </td>
              <td className="py-8 text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                <PriceWithVND
                  price={item?.totalPayment}
                  currencyRate={overview?.currencyRate}
                  currencyCode={overview?.currencyCode}
                  className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800"
                  helperClassName="text-12 text-neutral-500"
                />
              </td>
            </tr>
          ))}
          {overview?.addOns?.length > 0 &&
            overview?.addOns?.map((item, idx) => (
              <tr key={idx} className="border-bottom-light">
                <td className="pl-16 py-8 text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                  {item?.serviceName}
                </td>
                <td className="py-8">
                  <span className="text-14 text-primary-500 ml-4">
                    x{item?.quantity}
                  </span>
                </td>
                <td className="py-8 text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                  <PriceWithVND
                    price={item?.totalPayment}
                    currencyRate={overview?.currencyRate}
                    currencyCode={overview?.currencyCode}
                    className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800"
                    helperClassName="text-12 text-neutral-500"
                  />
                </td>
              </tr>
            ))}
          <tr className="border-bottom-light">
            <td className="pl-16 py-8">
              <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                {t("COMMON.TOTAL_FINAL")}
              </p>
              <p className="text-12 italic fw-400 text-neutral-500">
                ({t("COMMON.PRICE_INCLUDES_SERVICE_ADDON")})
              </p>
            </td>
            <td className="py-8"></td>
            <td className="py-8 text-primary-500 fw-500 text-18 lg:text-17 md:text-16">
              <PriceWithVND
                price={totalPayment}
                currencyRate={overview?.currencyRate}
                currencyCode={overview?.currencyCode}
                className="text-primary-500 fw-500 text-18 lg:text-17 md:text-16"
                helperClassName="text-12 text-neutral-500"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-none sm:d-block">
        <p className="bg-secondary-500 text-white rounded-top-left-8 rounded-top-right-8 text-16 lg:text-15 md:text-14 pl-10 py-10">
          {t("TOUR_BOOKING.TOUR_INFORMATION")}
        </p>
        {data?.map((item, idx) => (
          <div key={idx} className="pl-10 border-bottom-light py-10">
            <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
              {t("COMMON.TICKET")}: {overview?.tourName}
            </p>
            <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
              <span className="mr-4">{t("COMMON.AMOUNT")}: </span>
              <span className="text-primary-500">{item?.serviceName}</span>
              <span className="text-primary-500"> x{item?.quantity}</span>
            </p>
            <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
              {t("COMMON.SERVICE_PRICE")}:
              <span className="ml-4">
                <PriceWithVND
                  price={item?.totalPayment}
                  currencyRate={overview?.currencyRate}
                  currencyCode={overview?.currencyCode}
                  className="text-16 lg:text-15 md:text-14 text-primary-500"
                  helperClassName="text-12 text-neutral-500"
                />
              </span>
            </p>
          </div>
        ))}
        {overview?.addOns?.length > 0 &&
          overview?.addOns?.map((item, idx) => (
            <div key={idx} className="pl-10 border-bottom-light py-10">
              <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
                {t("COMMON.TICKET")}: {item?.serviceName}
              </p>
              <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
                <span className="mr-4">{t("COMMON.AMOUNT")}: </span>
                <span className="text-primary-500"> x{item?.quantity}</span>
              </p>
              <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
                {t("COMMON.SERVICE_PRICE")}:
                <span className="ml-4">
                  <PriceWithVND
                    price={item?.totalPayment}
                    currencyRate={overview?.currencyRate}
                    currencyCode={overview?.currencyCode}
                    className="text-16 lg:text-15 md:text-14 text-primary-500"
                    helperClassName="text-12 text-neutral-500"
                  />
                </span>
              </p>
            </div>
          ))}
        <div className="pl-10">
          <div className="d-flex items-center flex-wrap">
            <p className="text-16 text-neutral-800 mr-6">
              {t("COMMON.TOTAL_FINAL")}:{" "}
            </p>
            <PriceWithVND
              price={totalPayment}
              currencyRate={overview?.currencyRate}
              currencyCode={overview?.currencyCode}
              className="text-20 lg:text-18 text-primary-500"
              helperClassName="text-12 text-neutral-500"
            />
          </div>
          <p className="text-14 text-neutral-800">
            ({t("COMMON.PRICE_INCLUDES_SERVICE_ADDON")})
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingTourInfo;
