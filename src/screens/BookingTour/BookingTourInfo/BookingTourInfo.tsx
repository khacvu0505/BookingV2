import React, { useMemo } from "react";
import "./BookingTourInfo.style.scss";
import { formatCurrency } from "@/utils/utils";
import { useSelector } from "react-redux";
import useWindowSize from "@/utils/useWindowSize";
import { useTranslation } from "react-i18next";

const BookingTourInfo = ({ overview }) => {
  const { t } = useTranslation();
  const { currentCurrency } = useSelector((state) => state.app);
  const isMobile = useWindowSize().width < 600;

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
      {isMobile ? (
        <div>
          <p className="text-18 lg:text-17 md:text-16 text-white fw-700 bg-secondary-500 px-16 py-16 rounded-top-left-8 rounded-top-right-8">
            {t("TOUR_BOOKING.TOUR_INFORMATION")}
          </p>
          <div className="border-secondary-500 rounded-bot-left-8 rounded-bot-right-8">
            {data?.map((item, idx) => (
              <div key={idx} className="border-bottom-light px-16 py-10">
                <div className="mb-12">
                  <p className="fw-400 text-16 lg:text-15 md:text-14 text-neutral-500">
                    {t("COMMON.TICKET")}
                  </p>
                  <p className="fw-400 text-16 lg:text-15 md:text-14 text-neutral-800">
                    {overview?.tourName}
                  </p>
                </div>
                <div className="mb-12">
                  <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.AMOUNT")}
                  </p>
                  <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                    {item?.serviceName}
                    <span className="text-primary-500 fw-600 ml-4">
                      x{item?.quantity}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.TOTAL_AMOUNT")}
                  </p>
                  <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                    {formatCurrency(item?.totalPayment)} {currentCurrency}
                  </p>
                </div>
              </div>
            ))}
            <div className="px-16 py-16">
              <p className="text-18 lg:text-17 md:text-16 fw-700 text-neutral-800">
                {t("COMMON.TOTAL_FINAL")}
                <p className="italic text-14 fw-400 text-neutral-500">
                  ({t("COMMON.PRICE_INCLUDES_SERVICE_ADDON")})
                </p>
              </p>
              <p className="text-primary-500 fw-500 text-18 lg:text-17 md:text-16">
                {formatCurrency(totalPayment)} {currentCurrency}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <table className="booking_tour_info_table">
            <thead className="booking_tour_thead">
              <th className="pl-16 fw-16 fw-400 text-left py-8">
                {t("COMMON.TICKET")}
              </th>
              <th className="fw-16 fw-400 text-left py-8">
                {t("COMMON.AMOUNT")}
              </th>
              <th className="fw-16 fw-400 text-left py-8">
                {t("COMMON.TOTAL_AMOUNT")}
              </th>
            </thead>
            <tbody>
              {data?.map((item, idx) => (
                <tr key={idx} className="border-bottom-light">
                  <td className="pl-16 py-8 text-16 fw-400 text-neutral-800">
                    {overview?.tourName}
                  </td>
                  <td className="py-8 ">
                    <span className="text-16 fw-500 text-primary-500">
                      {item?.serviceName}
                    </span>
                    <span className="text-14 text-primary-500 ml-4">
                      x {item?.quantity}
                    </span>
                  </td>
                  <td className="py-8 text-16 fw-400 text-neutral-800">
                    {formatCurrency(item?.totalPayment)} {currentCurrency}
                  </td>
                </tr>
              ))}
              <tr className="border-bottom-light">
                <td className="pl-16 py-8">
                  <p className="text-16 fw-400 text-neutral-800">
                    {t("COMMON.TOTAL_FINAL")}
                  </p>
                  <p className="text-12 italic fw-400 text-neutral-500">
                    ({t("COMMON.PRICE_INCLUDES_SERVICE_ADDON")})
                  </p>
                </td>
                <td className="py-8"></td>
                <td className="py-8 text-primary-500 fw-500 text-18">
                  {formatCurrency(totalPayment)} {currentCurrency}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BookingTourInfo;
