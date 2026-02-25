/* eslint-disable no-undef */
import {
  getBookingInfo,
  getBookingInfoTour,
  getOnePayCallback,
} from "@/api/booking.api";
import { useEffect, useState, ComponentType } from "react";
import dynamic from "next/dynamic";
import { useNavigate, useParams } from "react-router-dom";
import { formatStringToDate } from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { clearSessionStorage } from "@/utils/utils";
import {
  booking_id,
  create_invoice,
  info_booking,
  info_booking_tour,
  tax_include,
} from "@/utils/constants";
import useWindowSize from "@/utils/useWindowSize";
import { useTranslation } from "react-i18next";

const Breadcrumb = dynamic(() => import("@/components/Breadcrumb"));
const Loading = dynamic(() => import("@/screens/Loading"));

interface BookingSuccessPageProps {
  supplierType: "Hotel" | "Tour";
  InvoiceComponent: ComponentType<{ bookingInfo: any }>;
}

const SUPPLIER_CONFIG = {
  Hotel: {
    apiFn: getBookingInfo,
    sessionKey: info_booking,
    breadcrumbTitle: "BOOKING_SUCCESS_HOTEL.HOTELS",
    breadcrumbLink: "/hotels",
    slugPrefix: "/hotels",
    callbackRoute: "/booking-hotel",
    historyRoute: "/profile/booking-history-hotel",
    failedText: "BOOKING_SUCCESS_HOTEL.BOOKING_FAILED",
    bookingCodeText: "BOOKING_SUCCESS_HOTEL.BOOKING_CODE",
    col2Label: "COMMON.CHECK_IN_DATE",
    col2Field: "checkInDate" as const,
    col3Label: "BOOKING_SUCCESS_HOTEL.PAYMENT_STATUS",
    getIsPaid: (info: any) => info?.paymentStatus === "Full",
    col4Field: "paymentMethod" as const,
  },
  Tour: {
    apiFn: getBookingInfoTour,
    sessionKey: info_booking_tour,
    breadcrumbTitle: "TOURS.TOUR_TITLE",
    breadcrumbLink: "/tour",
    slugPrefix: "/tour",
    callbackRoute: "/booking-tour",
    historyRoute: "/profile/booking-history-tour",
    failedText: "BOOKING_SUCCESS_TOUR.BOOKING_FAILED",
    bookingCodeText: "BOOKING_SUCCESS_TOUR.BOOKING_CODE",
    col2Label: "COMMON.TIME",
    col2Field: "bookingDate" as const,
    col3Label: "COMMON.STATUS",
    getIsPaid: (info: any) => info?.isPayment,
    col4Field: "paymentType" as const,
  },
} as const;

const BookingSuccessPage = ({
  supplierType,
  InvoiceComponent,
}: BookingSuccessPageProps) => {
  const { t } = useTranslation();
  const isMobile = useWindowSize().width < 768;
  const [params, _] = useQueryParams();
  const { vpc_Amount = "" } = params;
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const config = SUPPLIER_CONFIG[supplierType];

  const handleGetBookingInfo = async () => {
    try {
      setIsLoading(true);
      const res = await config.apiFn(id as string);
      if (res.success) {
        setBookingInfo(res.data);
        navigate(`${config.callbackRoute}/${id}`);
      } else {
        setBookingInfo(null);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setBookingInfo(null);
    }
  };

  useEffect(() => {
    if (vpc_Amount) {
      getOnePayCallback({
        bookingID: id as string,
        // eslint-disable-next-line no-undef
        url: window.location.href,
      })
        .then((res) => {
          const { success } = res;
          if (success) {
            handleGetBookingInfo();
          } else {
            setIsLoading(false);
            setBookingInfo(null);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setBookingInfo(null);
        });
    } else {
      handleGetBookingInfo();
    }
  }, []);

  useEffect(() => {
    clearSessionStorage(config.sessionKey);
    clearSessionStorage(booking_id);
    clearSessionStorage(tax_include);
    clearSessionStorage(create_invoice);
  }, []);

  if (!id) {
    navigate("/page-not-found");
    return;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mt-100 lg:px-0 md:mt-80">
      <Breadcrumb
        data={[
          {
            title: t(config.breadcrumbTitle),
            link: config.breadcrumbLink,
          },
          {
            title: bookingInfo?.supplierName,
            link: `${config.slugPrefix}/${bookingInfo?.slug}`,
          },
          {
            title: t("COMMON.BOOKING_PAYMENT_STATUS"),
            link: window.location.href,
          },
        ]}
      />
      <div>
        <div className="order-completed-wrapper">
          {!bookingInfo ? (
            <div className="d-flex flex-column justify-content-center items-center mt-40 lg:md-40 sm:mt-24">
              <div className="size-80 md:size-60 flex-center rounded-full bg-danger">
                <span className="text-30 lg:text-26 text-white">X</span>
              </div>
              <div className="text-30 lg:text-26 md:text-22 lh-1 fw-600 mt-20">
                {t(config.failedText)}
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center items-center mt-40 lg:md-40 sm:mt-24">
              <img
                alt="booking"
                src="/images/Booking/icon-booking-success.png"
              />
              <div className="text-24 lg:text-20 md:text-18 text-primary-400 fw-600">
                {t("COMMON.BOOKING_SUCCESS")}
              </div>
              <div className="text-18 lg:text-17 md:text-16 fw-400 text-neutral-500 d-flex sm:flex-column sm:items-center">
                {t("COMMON.SEND_INFO_TITLE")}
                <span className="text-dark-1 ml-5">{bookingInfo?.email}</span>
              </div>
              <div className="d-flex items-center mt-10 mb-53 sm:mb-30">
                <p className="text-18 lg:text-17 md:text-16 fw-400 text-neutral-500 mr-5">
                  {t("COMMON.MANAGE_BOOKING")}{" "}
                </p>

                <p
                  className="italic underline text-18 lg:text-17 md:text-16 text-primary-500 pointer"
                  onClick={() => navigate(config.historyRoute)}
                >
                  {t("COMMON.HERE")}
                </p>
              </div>
            </div>
          )}
          {!bookingInfo ? (
            <p className="text-center mt-30 text-18 lg:text-17 md:text-16 text-dark-1 mb-120 lg:mb-60">
              {t("COMMON.SOMETHING_WENT_WRONG_DURING_BOOKING")}{" "}
              {!isMobile && <br />}
              {t("COMMON.SOMETHING_WENT_WRONG_TRY_TO_FIX_LATER")}
            </p>
          ) : (
            <>
              <div
                className="d-flex flex-wrap justify-content-center lg:justify-between border-type-1 rounded-8 px-24 xl:px-16 lg:px-10 py-24 xl:py-16 lg:py-10 mb-53 lg:mb-30 relative"
                style={{
                  backgroundColor: "#fef0f3",
                }}
              >
                <div className="col-12 col-md-6 col-lg-3 px-0">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t(config.bookingCodeText)}
                  </div>
                  <div className="text-18 lg:text-17 md:text-16 fw-500 text-primary-500">
                    {bookingInfo?.bookingNo}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 px-0">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t(config.col2Label)}
                  </div>
                  <div className="text-18 lg:text-17 md:text-16 fw-500 text-primary-500">
                    {formatStringToDate(bookingInfo?.[config.col2Field])}
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 px-0">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t(config.col3Label)}
                  </div>
                  <div className="text-18 lg:text-17 md:text-16 fw-500 text-primary-500">
                    {config.getIsPaid(bookingInfo)
                      ? t("COMMON.PAID")
                      : t("COMMON.UNPAID")}
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 px-0">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.PAYMENT_METHOD")}
                  </div>
                  <div className="text-18 lg:text-17 md:text-16 fw-500 text-primary-500">
                    {bookingInfo?.[config.col4Field]}
                  </div>
                </div>
                <img
                  className="absolute sm:d-none"
                  src="/images/Booking/icon-pin.png"
                  alt="okdimall booking"
                  style={{
                    right: "-14px",
                    top: "-15px",
                  }}
                />
              </div>

              <InvoiceComponent bookingInfo={bookingInfo} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
