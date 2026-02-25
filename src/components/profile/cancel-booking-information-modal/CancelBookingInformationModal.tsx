import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { getCanceBookingInfo, requestCancelBooking } from "@/api/user.api";
import "./CancelBookingInformationModal.style.scss";
import { formatCurrency, formatStringToDate } from "@/utils/utils";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import classNames from "classnames";
import { useSelector } from "react-redux";

interface BookingDetailInfo {
  bookingID?: string;
  supplierName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  [key: string]: unknown;
}

interface CancelBookingItem {
  productName?: string;
  totalPayment?: number;
  totalRefund?: number;
  lastDateFree?: string;
  [key: string]: unknown;
}

interface CancelBookingData {
  items?: CancelBookingItem[];
  totalPayment?: number;
  totalRefund?: number;
  [key: string]: unknown;
}

interface CancelBookingInformationModalProps {
  bookingDetail: BookingDetailInfo;
  setCancelSuccess: (value: boolean) => void;
}

const CancelBookingInformationModal = (
  { bookingDetail, setCancelSuccess }: CancelBookingInformationModalProps,
  ref: React.Ref<unknown>
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<CancelBookingData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const { currentCurrency } = useSelector((state) => state.app);
  const { t } = useTranslation();

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleCancelBooking = () => {
    setIsSubmitting(true);
    requestCancelBooking(bookingDetail?.bookingID ?? "")
      .then((res) => {
        if (res?.success) {
          setRequestSuccess(true);
          setCancelSuccess(true);
          setIsSubmitting(false);
          //   setIsVisible(false);
          switch (res?.data) {
            case "waiting":
              handleRenderNoti(
                t("COMMON.CANCEL_REQUEST_WAITING"),
                "success"
              );
              break;
            case "completed":
              handleRenderNoti(
                t("COMMON.CANCEL_REQUEST_COMPLETED"),
                "success"
              );
              break;

            default:
              break;
          }
          return;
        }
        setIsSubmitting(false);
        handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN_LATER"), "error");
      })
      .catch(() => {
        handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN_LATER"), "error");
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
    getCanceBookingInfo(bookingDetail?.bookingID ?? "")
      .then((res) => {
        if (res?.success) {
          setData(res?.data as CancelBookingData);
          return;
        }
        setData({});
      })
      .catch(() => {
        setData({});
      });
  }, []);

  return (
    <div
      className={` overflow-x-hidden currencyMenu js-currencyMenu  ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div
        className={classNames(
          "currencyMenu__content bg-white rounded-4 modal-custom-size3",
          {
            "modal-custom-size3": requestSuccess,
            "modal-custom-size1": !requestSuccess,
          }
        )}
      >
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        <div className="d-flex items-center justify-between px-30 pb-20 sm:px-15 ">
          <div className="text-20 fw-500 lh-15 w-100 text-center">
            <p className="text-24 fw-500 text-neutral-800">
              {requestSuccess ? t("COMMON.NOTIFICATION") : t("COMMON.CANCEL_BOOKING_INFO")}
            </p>
          </div>
        </div>
        {requestSuccess ? (
          <div className="w-75 mx-auto mb-30">
            <p className="text-dark">
              {t("COMMON.SUPPORT_CONTACT_MSG")}
            </p>
            <p className="text-dark">Hotline: +84 886 479 456</p>
            <p className="text-dark">
              Email:
              <span className="text-blue-1 ml-10">info@okdimall.com</span>
            </p>
          </div>
        ) : (
          <div
            className="overflow-y-scroll overflow-x-hidden h-500"
            style={{
              padding: "0 20px",
            }}
          >
            <div className="d-flex items-center">
              <div className="d-flex items-center mr-24">
                <p className="text-14 fw-400 mr-4">{t("COMMON.HOTEL_NAME_LABEL")}: </p>
                <div className="text-14 fw-600 ">
                  {" "}
                  {bookingDetail?.supplierName}
                </div>
              </div>
              <div className="d-flex items-center mr-24">
                <div className="text-14 fw-400 mr-4">{t("COMMON.CHECK_IN_DATE")}:</div>
                <div className="text-14 fw-600 ">
                  {formatStringToDate(bookingDetail?.checkInDate ?? "")}
                </div>
              </div>

              <div className="d-flex  items-center">
                <div className="text-14 fw-400 mr-4">{t("COMMON.CHECK_OUT_DATE")}:</div>
                <div className="text-14 fw-600">
                  {formatStringToDate(bookingDetail?.checkOutDate ?? "")}
                </div>
              </div>
            </div>
            <table className="table-cancel-booking-info">
              <thead>
                <tr>
                  <th>{t("COMMON.NAME")}</th>
                  <th>{t("COMMON.AMOUNT_PAID")}</th>
                  <th>{t("COMMON.REFUND_AMOUNT")}</th>
                  <th>{t("COMMON.NOTES")}</th>
                </tr>
              </thead>
              <tbody>
                {(data?.items?.length ?? 0) > 0
                  ? data?.items?.map((item: CancelBookingItem, idx: number) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid #e5e5e5",
                          padding: "10px 0",
                        }}
                      >
                        <td>{item?.productName}</td>
                        <td>
                          {formatCurrency(item?.totalPayment ?? 0)} {currentCurrency}
                        </td>
                        <td>
                          {formatCurrency(item?.totalRefund ?? 0)} {currentCurrency}
                        </td>
                        <td>
                          {item?.lastDateFree &&
                            ((item?.totalRefund ?? 0) > 0
                              ? t("COMMON.CANCEL_BEFORE_REFUND", { date: formatStringToDate(
                                  item.lastDateFree,
                                  { isHideDay: true }
                                ) })
                              : item?.totalRefund === 0 &&
                                t("COMMON.CANCEL_AFTER_NO_REFUND", { date: formatStringToDate(
                                  item?.lastDateFree,
                                  { isHideDay: true }
                                ) }))}
                        </td>
                      </tr>
                    ))
                  : "No Data"}
                {(data?.items?.length ?? 0) > 0 && (
                  <>
                    <tr>
                      <td>{t("COMMON.TOTAL")}</td>
                      <td className="text-danger fw-600 text-18">
                        {formatCurrency(data?.totalPayment ?? 0)} {currentCurrency}
                        <p className="text-14 text-dark-1">
                          ({t("COMMON.PRICE_INCLUDES_ADDON")})
                        </p>
                      </td>
                      <td className="text-success fw-600 text-18">
                        {formatCurrency(data?.totalRefund ?? 0)} {currentCurrency}
                        <p className="text-14 text-dark-1">&nbsp;</p>
                      </td>
                      <td></td>
                    </tr>
                    {(data?.totalRefund ?? 0) <= 0 && (
                      <tr className="hide-border-bottom">
                        <td colSpan={4} className="text-danger">
                          * {t("COMMON.BOOKING_EXPIRED_WARNING")}
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
                      <button
                        className="button -outline-blue-1 py-20 -dark-1 text-blue-1 mr-10"
                        style={{ width: 100, height: 50 }}
                        onClick={handleCloseModal}
                      >
                        <span>{t("COMMON.EXIT")}</span>
                      </button>
                      {(data?.totalRefund ?? 0) > 0 && (
                        <button
                          className="button py-20 -dark-1 bg-blue-1 text-white "
                          style={{ width: 150, height: 50 }}
                          onClick={handleCancelBooking}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="loader"></span>
                              <span className="ml-10">{t("COMMON.PROCESSING")}</span>
                            </>
                          ) : (
                            <span>{t("COMMON.CANCEL_BOOKING")}</span>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(CancelBookingInformationModal);
