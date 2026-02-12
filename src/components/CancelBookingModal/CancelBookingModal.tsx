import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { getCanceBookingInfo, requestCancelBooking } from "@/api/user.api";
import "./CancelBookingModal.style.scss";
import { formatStringToDate } from "@/utils/utils";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import classNames from "classnames";
import Button from "@/apps/Button";
import { useTranslation } from "react-i18next";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";

interface CancelBookingModalProps {
  bookingDetail: any;
  setCancelSuccess: (v: boolean) => void;
  supplierType: "Hotel" | "Tour";
}

const SUPPLIER_CONFIG = {
  Hotel: {
    cancelInfoTitle: "COMMON.CANCEL_BOOKING_ROOM_INFO",
    supplierLabel: "COMMON.HOTEL_NAME",
    cancelBtnText: "COMMON.CANCEL_BOOKING_ROOM",
  },
  Tour: {
    cancelInfoTitle: "COMMON.CANCEL_BOOKING_TOUR_INFO",
    supplierLabel: "COMMON.TOUR_NAME",
    cancelBtnText: "COMMON.CANCEL_BOOKING_TOUR",
  },
} as const;

const CancelBookingModal = (
  { bookingDetail, setCancelSuccess, supplierType }: CancelBookingModalProps,
  ref: React.Ref<any>
) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const config = SUPPLIER_CONFIG[supplierType];

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleCancelBooking = () => {
    setIsSubmitting(true);
    requestCancelBooking(bookingDetail?.bookingID)
      .then((res) => {
        if (res?.success) {
          setRequestSuccess(true);
          setCancelSuccess(true);
          setIsSubmitting(false);
          return;
        }
        setIsSubmitting(false);
        handleRenderNoti(t("COMMON.TRY_AGAIN_LATER"), "error");
      })
      .catch(() => {
        handleRenderNoti(t("COMMON.TRY_AGAIN_LATER"), "error");
        setIsSubmitting(false);
      });
  };

  useImperativeHandle(
    ref,
    () => ({
      isVisible,
      setIsVisible,
    }),
    [isVisible]
  );

  useEffect(() => {
    if (!isVisible) return;
    getCanceBookingInfo(bookingDetail?.bookingID)
      .then((res) => {
        if (res?.success) {
          setData(res?.data);
          return;
        }
        setData({});
      })
      .catch(() => {
        setData({});
      });
  }, [isVisible]);

  return (
    <div
      className={`overflow-x-hidden currencyMenu js-currencyMenu ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div
        className={classNames("currencyMenu__content bg-white rounded-4", {
          "modal-custom-size4": requestSuccess,
          "modal-custom-size1": !requestSuccess,
        })}
      >
        <div
          className={classNames({
            "d-none": requestSuccess,
          })}
        >
          <div className="text-right pr-10 pt-5">
            <button className="pointer" onClick={handleCloseModal}>
              <i className="icon-close" />
            </button>
          </div>
        </div>
        <div className="d-flex items-center justify-between px-30 pb-20 sm:px-15">
          {requestSuccess ? (
            <div className="text-center w-100 pt-20">
              <img
                src="/images/Booking/icon-info.png"
                alt="OKdimall bookings"
              />
            </div>
          ) : (
            <div className="text-20 fw-500 lh-15 w-100 text-center">
              <p className="text-24 fw-500 text-neutral-800">
                {t(config.cancelInfoTitle)}
                <i className="ri-information-line ml-4"></i>
              </p>
            </div>
          )}
        </div>
        {requestSuccess ? (
          <div className="mb-30 px-20">
            <p className="text-neutral-800 text-16 lg:text-15 md:text-14">
              {t("COMMON.SUPPORT_TEXT")}
            </p>
            <p className="text-neutral-800 text-16 lg:text-15 md:text-14">
              Hotline: +84 886 479 456
            </p>
            <p className="text-neutral-800 text-16 lg:text-15 md:text-14">
              Email:
              <span className="text-primary-500 ml-10">info@okdimall.com</span>
            </p>
          </div>
        ) : (
          <div className="px-20">
            <div className="d-flex items-center">
              <div className="d-flex items-center mr-24">
                <p className="text-14 fw-400 mr-4">
                  {t(config.supplierLabel)}:{" "}
                </p>
                <div className="text-14 fw-600">
                  {bookingDetail?.supplierName}
                </div>
              </div>
              {supplierType === "Hotel" && (
                <>
                  <div className="d-flex items-center mr-24">
                    <div className="text-14 fw-400 mr-4">
                      {t("COMMON.CHECK_IN_DATE")}:
                    </div>
                    <div className="text-14 fw-600">
                      {formatStringToDate(bookingDetail?.checkInDate)}
                    </div>
                  </div>
                  <div className="d-flex items-center">
                    <div className="text-14 fw-400 mr-4">
                      {t("COMMON.CHECK_OUT_DATE")}:
                    </div>
                    <div className="text-14 fw-600">
                      {formatStringToDate(bookingDetail?.checkOutDate)}
                    </div>
                  </div>
                </>
              )}
            </div>
            <table className="table-cancel-booking-info mt-16">
              <thead>
                <tr>
                  <th>{t("COMMON.SERVICE_NAME")}</th>
                  <th>{t("COMMON.TOTAL_PAID")}</th>
                  <th>{t("COMMON.TOTAL_REFUND")}</th>
                  <th>{t("COMMON.NOTICE")}</th>
                </tr>
              </thead>
              <tbody>
                {data?.items?.length > 0
                  ? data?.items?.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid #e5e5e5",
                          padding: "10px 0",
                        }}
                      >
                        <td className="text-16 fw-400 text-neutral-800">
                          {item?.productName}
                        </td>
                        <td className="text-16 fw-400 text-neutral-800">
                          <PriceWithVND
                            price={item?.totalPayment}
                            currencyRate={bookingDetail?.currencyRate}
                            currencyCode={bookingDetail?.currencyCode}
                            helperClassName="text-12 text-neutral-500"
                          />
                        </td>
                        <td className="text-16 fw-400 text-neutral-800">
                          <PriceWithVND
                            price={item?.totalRefund}
                            currencyRate={bookingDetail?.currencyRate}
                            currencyCode={bookingDetail?.currencyCode}
                            helperClassName="text-12 text-neutral-500"
                          />
                        </td>
                        <td className="text-16 fw-400 text-neutral-800">
                          {item?.lastDateFree &&
                            (item?.totalRefund > 0
                              ? `${t(
                                  "COMMON.CANCEL_BEFORE_DATE"
                                )} ${formatStringToDate(
                                  item.lastDateFree,
                                  true
                                )}: ${t("COMMON.REFUND_FULL")}`
                              : item?.totalRefund === 0 &&
                                `${t(
                                  "COMMON.CANCEL_AFTER"
                                )} ${formatStringToDate(
                                  item?.lastDateFree,
                                  true
                                )}: ${t("COMMON.NO_REFUND")} `)}
                        </td>
                      </tr>
                    ))
                  : "No Data"}
                {data?.items?.length > 0 && (
                  <>
                    <tr>
                      <td className="text-16 fw-400 text-neutral-800">
                        {t("COMMON.TOTAL_AMOUNT")}
                      </td>
                      <td className="text-primary-500 fw-500 text-18">
                        <PriceWithVND
                          price={data?.totalPayment}
                          currencyRate={bookingDetail?.currencyRate}
                          currencyCode={bookingDetail?.currencyCode}
                          className="text-primary-500 fw-500 text-18"
                          helperClassName="text-14 text-neutral-500"
                        />
                        <p className="text-16 fw-400 text-neutral-500">
                          ({t("COMMON.PRICE_INCLUDES_SERVICE_ADDON")})
                        </p>
                      </td>
                      <td className="text-action-success fw-500 text-18">
                        <PriceWithVND
                          price={data?.totalRefund}
                          currencyRate={bookingDetail?.currencyRate}
                          currencyCode={bookingDetail?.currencyCode}
                          className="text-action-success fw-500 text-18"
                          helperClassName="text-14 text-neutral-500"
                        />
                        <p className="text-14 text-neutral-500">&nbsp;</p>
                      </td>
                      <td></td>
                    </tr>
                    {data?.totalRefund <= 0 && (
                      <tr className="hide-border-bottom">
                        <td colSpan={4} className="text-danger">
                          {t("COMMON.BOOKING_EXPIRED")} <br />{" "}
                          {t("COMMON.BOOKING_EXPIRED_DESC")}
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="d-flex justify-content-end mt-20 mb-20">
                      <Button
                        onClick={handleCloseModal}
                        isOutline
                        className="mr-16"
                      >
                        {t("COMMON.CLOSE")}
                      </Button>
                      <Button onClick={handleCancelBooking}>
                        {isSubmitting ? (
                          <>
                            <span className="loader"></span>
                            <span className="ml-10">
                              {t("COMMON.PROCESSING")}...
                            </span>
                          </>
                        ) : (
                          t(config.cancelBtnText)
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {requestSuccess && (
          <div
            className="text-center w-100 d-flex justify-center pb-20"
            onClick={handleCloseModal}
          >
            <Button type="secondary">{t("COMMON.CLOSE")}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(CancelBookingModal);
