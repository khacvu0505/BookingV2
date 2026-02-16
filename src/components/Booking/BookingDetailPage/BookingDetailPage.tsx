import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  clearSessionStorage,
  formatStringToDate,
} from "@/utils/utils";
import { getBookingDetail, getBookingDetailTour } from "@/api/user.api";
import { useNavigate, useParams } from "react-router-dom";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";
import { hold_code } from "@/utils/constants";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { resendInfoBooking } from "@/api/booking.api";
import classNames from "classnames";
import MetaComponent from "@/components/MetaComponent";
import TagComponent from "@/components/TagComponent";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";
import PolicyModal from "@/components/PolicyDetail";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { bookingKeys } from "@/lib/query-keys";

const RatingModal = dynamic(() => import("@/components/ratings/RatingModal"));
const RatingComponent = dynamic(() => import("@/components/ratings/RatingSvg"));
const Policy = dynamic(() => import("@/screens/Booking/BookingOverview/Policy"));
const BookingTourInfo = dynamic(
  () => import("@/screens/BookingDetailTour/BookingTourInfo")
);
const CancelBookingModal = dynamic(
  () => import("@/components/Booking/CancelBookingModal/CancelBookingModal")
);

interface BookingDetailPageProps {
  supplierType: "Hotel" | "Tour";
}

const SUPPLIER_CONFIG = {
  Hotel: {
    apiFn: getBookingDetail,
    queryKeyFn: bookingKeys.detail,
    breadcrumbLink: "/profile/booking-history-hotel",
    policyText: "PROFILE.HOTEL_RULE",
    bookAgainRoute: "/hotels",
    bookAgainText: "PROFILE.BOOKING_HOTEL_AGAIN",
    infoTitle: "PROFILE.BOOKING_ROOM_INFO",
    cancelTitle: "COMMON.CANCEL_BOOKING_ROOM",
    cancelConfirmHtml: "COMMON.DO_YOU_WANT_CANCEL_BOOKING_ROOM",
    cancelStatuses: ["Ready", "WaitingApproved"],
  },
  Tour: {
    apiFn: getBookingDetailTour,
    queryKeyFn: bookingKeys.detailTour,
    breadcrumbLink: "/profile/booking-history-tour",
    policyText: "PROFILE.TOUR_RULE",
    bookAgainRoute: "/tour",
    bookAgainText: "PROFILE.BOOKING_TOUR_AGAIN",
    infoTitle: "COMMON.YOUR_INFORMATION",
    cancelTitle: "COMMON.CANCEL_BOOKING_TOUR",
    cancelConfirmHtml: "COMMON.DO_YOU_WANT_CANCEL_BOOKING_TOUR",
    cancelStatuses: ["Ready", "WaitingApprove"],
  },
} as const;

const metadata = {
  title: "Tour List",
  description: "OKdimall - Travel & Tour",
};

const BookingDetailPage = ({ supplierType }: BookingDetailPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const refRatingModal = useRef<any>(null);
  const refCancelBookingInfo = useRef<any>(null);
  const policyRef = useRef<any>(null);
  const config = SUPPLIER_CONFIG[supplierType];

  const { id } = useParams();

  const { data: bookingDetail, refetch: refetchBookingDetail } = useQuery({
    queryKey: config.queryKeyFn(String(id ?? "")),
    queryFn: async () => {
      clearSessionStorage(hold_code);
      const res = await config.apiFn(id as any);
      if (res?.success) return res.data ?? null;
      return null;
    },
    enabled: !!id,
  });

  const handleClickRating = () => {
    refRatingModal.current.setIsVisible(true);
  };

  const handleResendInfoBooking = () => {
    resendInfoBooking(id as string)
      .then((res) => {
        if (res?.success) {
          handleRenderNoti(t("COMMON.SEND_INFO_SUCCESS"), "success");
          return;
        }
        handleRenderNoti(t("COMMON.TRY_AGAIN_LATER"), "error");
      })
      .catch(() => {
        handleRenderNoti(t("COMMON.TRY_AGAIN_LATER"), "error");
      });
  };

  const isHasBtnCancelBooking = useMemo(() => {
    return config.cancelStatuses.includes(bookingDetail?.bookingStatus);
  }, [bookingDetail, config.cancelStatuses]);

  const isHasBtnRating =
    bookingDetail?.bookingStatus === "Completed" && !bookingDetail?.isFeedback;

  const handleCancelConfirm = () => {
    Swal.fire({
      title: t(config.cancelTitle),
      imageUrl: "/images/Booking/icon-info-yellow.png",
      imageWidth: 72,
      imageHeight: 72,
      imageAlt: "Custom icon",
      html: `
        ${t(config.cancelConfirmHtml)} <br />
        ${t("COMMON.CHOOSE_AGREE_TO_CANCEL")}
      `,
      confirmButtonText: t("COMMON.AGREE_TEXT"),
      confirmButtonColor: "#FFC414",
      allowEscapeKey: false,
      allowEnterKey: true,
      allowOutsideClick: false,
      position: "top",
      customClass: {
        popup: "mt-30",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        refCancelBookingInfo.current.setIsVisible(true);
      }
    });
  };

  if (!bookingDetail) return null;

  const phoneNumber =
    supplierType === "Hotel"
      ? bookingDetail?.supplierPhone
      : bookingDetail?.customerMobileNo;

  return (
    <div className="mb-50">
      <MetaComponent meta={metadata} />

      <section className="mt-100">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb
            data={[
              {
                title: t("COMMON.MY_PROFILE"),
                link: "/profile/information",
              },
              {
                title: t("PROFILE.BOOKING_HISTORY"),
                link: config.breadcrumbLink,
              },
              {
                title: bookingDetail?.supplierName,
              },
            ]}
          />

          {/* Header: Image + Supplier Info */}
          <div className="d-flex align-items-center flex-wrap mt-30">
            <img
              src={
                bookingDetail?.thumbs?.length > 0
                  ? bookingDetail?.thumbs[0]
                  : ""
              }
              alt="booking"
              width={264}
              className="rounded-8 mr-20 h-240 object-cover sm:w-1/1 sm:mr-0"
            />

            <div className="md:w-1/1">
              <div className="d-flex items-center mb-20 sm:flex-column sm:items-start sm:mt-10">
                <div className="d-flex items-center mr-16 sm:mb-10">
                  <TagComponent type="primary" text={t("COMMON.BOOKING_NO")} />
                  <p className="ml-4 text-14 fw-500 text-neutral-500">
                    {bookingDetail?.bookingNo}
                  </p>
                </div>
                <div className="d-flex items-center">
                  <TagComponent
                    type="info"
                    text={t("COMMON.BOOKING_ROOM_DATE")}
                  />
                  <p className="ml-4 text-14 fw-500 text-neutral-500">
                    {formatStringToDate(bookingDetail?.bookingDate)}
                  </p>
                </div>
              </div>
              <div className="d-flex items-center mb-12 sm:flex-column sm:items-start">
                <h1 className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mr-16">
                  {bookingDetail?.supplierName}
                </h1>
                {bookingDetail?.supplierClass ? (
                  <RatingComponent
                    stop={bookingDetail?.supplierClass}
                    initialRating={bookingDetail?.supplierClass}
                  />
                ) : null}
              </div>

              {bookingDetail?.supplierAddress && (
                <div className="d-flex items-center mb-12">
                  <img
                    src="/images/Profile/icon-location.png"
                    alt="location"
                    className="mr-4"
                    width={20}
                    height={20}
                  />
                  <p className="text-14 fw-400 text-neutral-500">
                    {bookingDetail?.supplierAddress}
                  </p>
                </div>
              )}

              <div className="d-flex items-center mb-12">
                <img
                  src="/images/Profile/icon-phone.png"
                  alt="phone"
                  className="mr-4"
                  width={20}
                  height={20}
                />
                <p className="text-14 fw-400 text-neutral-500 mr-8">
                  {t("COMMON.LABEL_PHONE")}:
                </p>
                <p className="text-14 fw-500 text-neutral-800">
                  {phoneNumber}
                </p>
              </div>

              <p
                className="italic underline text-14 fw-400 text-secondary-500 mb-8 pointer"
                onClick={() => policyRef.current.setIsVisible(true)}
              >
                {t(config.policyText)}
              </p>
              <Button
                type="secondary"
                onClick={() =>
                  bookingDetail?.slug &&
                  navigate(`${config.bookAgainRoute}/${bookingDetail?.slug}`)
                }
                className="sm:w-1/1"
              >
                {t(config.bookAgainText)}
              </Button>
            </div>
          </div>

          {/* Date Section */}
          <div
            className="row mt-60 sm:mt-30 mx-0 mb-24"
            style={{
              borderLeft: "3px solid #F52549",
              backgroundColor: "#FBFBFB",
            }}
          >
            <div className="col-md-6 py-24 sm:py-10">
              <p className="text-14 fw-400 text-neutral-500">
                {t("COMMON.CHECK_IN_DATE")}
              </p>
              <p className="text-18 lg:text-17 md:text-15 fw-500 text-neutral-800">
                {supplierType === "Hotel"
                  ? `${formatStringToDate(bookingDetail?.checkInDate)} (${bookingDetail?.checkInTime})`
                  : formatStringToDate(bookingDetail?.formDate)}
              </p>
            </div>
            <div className="col-md-6 py-24 sm:py-10">
              <p className="text-14 fw-400 text-neutral-500">
                {t("COMMON.CHECK_OUT_DATE")}
              </p>
              <p className="text-18 lg:text-17 md:text-15 fw-500 text-neutral-800">
                {supplierType === "Hotel"
                  ? `${formatStringToDate(bookingDetail?.checkOutDate)} (${bookingDetail?.checkOutTime})`
                  : formatStringToDate(bookingDetail?.toDate)}
              </p>
            </div>
          </div>

          {/* Hotel: Room Accordion / Tour: BookingTourInfo + Policy */}
          {supplierType === "Hotel" ? (
            <HotelRoomAccordion bookingDetail={bookingDetail} />
          ) : (
            <>
              <div>
                <BookingTourInfo overview={bookingDetail} />
              </div>
              <div>
                <Policy item={bookingDetail} />
              </div>
            </>
          )}

          {/* Customer Info + Payment */}
          <div className={supplierType === "Tour" ? "mt-24" : ""}>
            <div className="d-flex justify-content-between flex-wrap">
              <p className="text-18 lg:text-17 md:text-15 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
                {t(config.infoTitle)}
              </p>
              <div>
                {isHasBtnRating && (
                  <p
                    className="text-14 underline pointer italic text-secondary-500"
                    onClick={handleClickRating}
                  >
                    {t("COMMON.RATING")}
                  </p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="d-flex items-center col-md-6 mb-16 md:mb-6">
                <p className="text-14 fw-400 text-neutral-800 mr-4">
                  {t("COMMON.CUSTOMER")}:{" "}
                </p>
                <p className="text-uppercase fw-600 text-14 text-neutral-800">
                  {bookingDetail?.customerName}
                </p>
              </div>

              {supplierType === "Hotel" && (
                <div className="d-flex items-center col-md-6 mb-16">
                  <p className="text-14 fw-400 text-neutral-800 mr-4">
                    {t("PROFILE.NUMBER_OF_GUEST")}:{" "}
                  </p>{" "}
                  <p className="fw-600 text-14 text-neutral-800">
                    {bookingDetail?.totalAdult + bookingDetail?.totalChildren} (
                    {bookingDetail?.totalAdult} {t("COMMON.ADULT")} +{" "}
                    {bookingDetail?.totalChildren} {t("COMMON.CHILD")})
                  </p>
                </div>
              )}

              <div className="d-flex items-center col-md-6 mb-16 md:mb-0">
                <p className="text-14 fw-400 text-neutral-800 mr-4">Email: </p>
                <br />
                <div className="d-flex items-center flex-wrap">
                  <p className="fw-600 text-14 text-neutral-800 mr-4">
                    {bookingDetail?.email}{" "}
                  </p>
                  <p
                    className="italic underline text-secondary-500 pointer text-14 fw-400 d-block sm:d-none"
                    onClick={handleResendInfoBooking}
                  >
                    {t("PROFILE.SEND_RESERVATION_CONFIRMATION")}
                  </p>
                </div>
              </div>
              <p
                className="italic underline text-secondary-500 pointer text-14 fw-400 d-none sm:d-block mb-0 sm:mb-6"
                onClick={handleResendInfoBooking}
              >
                {t("PROFILE.SEND_RESERVATION_CONFIRMATION")}
              </p>

              {supplierType === "Tour" && bookingDetail?.pickUp && (
                <div className="d-flex items-center col-md-6 mb-16 md:mb-6">
                  <p className="text-14 fw-400 text-neutral-800 mr-4">
                    {t("TOUR_BOOKING.PICKUP_LOCATION")}:{" "}
                  </p>
                  <p className="fw-600 text-14 text-neutral-800">
                    {bookingDetail?.pickUp}
                  </p>
                </div>
              )}
              {supplierType === "Tour" && bookingDetail?.dropOff && (
                <div className="d-flex items-center col-md-6 mb-16 md:mb-6">
                  <p className="text-14 fw-400 text-neutral-800 mr-4">
                    {t("TOUR_BOOKING.DROP_OFF_LOCATION")}:{" "}
                  </p>
                  <p className="fw-600 text-14 text-neutral-800">
                    {bookingDetail?.dropOff}
                  </p>
                </div>
              )}

              <div className="d-flex items-center col-md-6 mb-16 md:mb-6">
                <p className="text-14 fw-400 text-neutral-800 mr-4">
                  {t("COMMON.PROMOTION")}:{" "}
                </p>
                <p className="fw-600 text-14 text-neutral-800">
                  {bookingDetail?.voucherName || t("COMMON.NOT_PROMOTION")}
                </p>
              </div>
              <div className="d-flex items-center col-md-6 mb-16 md:mb-6">
                <p className="text-14 fw-400 text-neutral-800 mr-4">
                  {t("COMMON.SPECIAL_REQUEST")}:
                </p>
                <br />
                <p className="fw-600 text-14 text-neutral-800">
                  {bookingDetail?.specialRequest ||
                    t("COMMON.NO_SPECIAL_REQUEST")}
                </p>
              </div>
            </div>

            {/* Payment Status + Cancel */}
            <div>
              <div className="d-flex justify-content-between">
                <p
                  className={classNames(
                    "text-18 lg:text-17 md:text-16 fw-500",
                    {
                      "text-action-success": bookingDetail?.isPayment,
                      "text-primary-500": !bookingDetail?.isPayment,
                    }
                  )}
                >
                  {bookingDetail?.isPayment
                    ? t("COMMON.PAID")
                    : t("COMMON.UNPAID")}
                </p>
                {(isHasBtnCancelBooking || cancelSuccess) && (
                  <Button
                    onClick={handleCancelConfirm}
                    className="d-block sm:d-none"
                  >
                    {t(config.cancelTitle)}
                  </Button>
                )}
              </div>

              <div className="d-flex align-items-center">
                <p className="text-16 lg:text-15 md:text-14 fw-500 mr-8">
                  {t("COMMON.TOTAL_AMOUNT")}:
                </p>
                <PriceWithVND
                  price={bookingDetail?.totalPayment}
                  currencyRate={bookingDetail?.currencyRate}
                  currencyCode={bookingDetail?.currencyCode}
                  className="text-18 lg:text-17 md:text-16 fw-600 text-primary-500"
                  helperClassName="text-12 text-neutral-500"
                />
              </div>
              {bookingDetail?.paymentRemarks && (
                <p className="text-14 fw-400 text-neutral-500">
                  ({bookingDetail?.paymentRemarks})
                </p>
              )}

              {(isHasBtnCancelBooking || cancelSuccess) && (
                <Button
                  onClick={handleCancelConfirm}
                  className="sm:w-1/1 sm:mt-20 d-none sm:d-block"
                >
                  {t(config.cancelTitle)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <RatingModal
        bookingId={id as string}
        ref={refRatingModal}
        handleRatingSuccess={refetchBookingDetail}
      />
      <CancelBookingModal
        ref={refCancelBookingInfo}
        bookingDetail={bookingDetail}
        setCancelSuccess={setCancelSuccess}
        supplierType={supplierType}
      />
      <PolicyModal
        ref={policyRef}
        bookingDetail={bookingDetail}
        isTour={supplierType === "Tour"}
      />
    </div>
  );
};

/* Hotel Room Accordion - extracted to keep the main component clean */
const HotelRoomAccordion = ({ bookingDetail }: { bookingDetail: any }) => {
  const { t } = useTranslation();

  return (
    <div className="accordion js-accordion -simple mt-20" id="InfoBooking">
      {bookingDetail?.roomInfos?.map((item, idx) => {
        const benefits = item?.benefits?.split(",") || [];

        return (
          <div
            key={item?.roomIndex}
            className="accordion__item px-20 py-20 mb-20 border-primary-500 rounded-8 sm:px-10 sm:py-10"
          >
            <div
              aria-expanded={1 === item?.roomIndex ? "true" : "false"}
              className="accordion__button d-flex items-center"
              data-bs-toggle="collapse"
              data-bs-target={`#InfoBooking${item.roomIndex}`}
            >
              <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-5">
                <i className="icon-plus" />
                <i className="icon-minus" />
              </div>
              <div className="button text-24 lg:text-20 sm:text-18 text-action-highlight ml-16 d-flex items-center sm:flex-column sm:items-start sm:justify-start">
                <p className="mr-10 text-16 text-action-highlight fw-500">
                  {t("COMMON.ROOM")} {idx + 1}:{" "}
                </p>
                <p className="text-16 lg:text-15 md:text-14 text-action-highlight fw-500 text-truncate">
                  {item?.roomName}
                </p>
              </div>
            </div>
            <div
              className={`accordion-collapse collapse ml-20 ${
                item.roomIndex === 1 && "show"
              }`}
              id={`InfoBooking${item.roomIndex}`}
              data-bs-parent="#InfoBooking"
            >
              <div className="d-flex justify-content-between md:flex-column">
                <div>
                  <div className="d-flex items-center ml-50 mb-8 sm:mt-10 lg:ml-30">
                    <img
                      src="/images/HotelList/icon-bed.png"
                      alt="okdimall booking"
                      width={24}
                      height={24}
                    />
                    <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500 ml-8">
                      {item?.serviceName}
                    </p>
                  </div>
                  <div className="d-flex align-items-center ml-50 lg:ml-30">
                    {item?.totalAmount === item?.totalPayment ||
                    item?.totalAmount < item?.totalPayment ? (
                      <PriceWithVND
                        price={item?.totalPayment}
                        currencyRate={bookingDetail?.currencyRate}
                        currencyCode={bookingDetail?.currencyCode}
                        className="text-24 text-primary-500 fw-500"
                        helperClassName="text-12 text-neutral-500"
                      />
                    ) : (
                      <>
                        <PriceWithVND
                          price={item?.totalAmount}
                          currencyRate={bookingDetail?.currencyRate}
                          currencyCode={bookingDetail?.currencyCode}
                          className="text-24 lg:text-22 md:text-20 text-primary-500 fw-500"
                          helperClassName="text-12 text-neutral-500"
                        />
                        {item?.totalPayment > 0 && (
                          <>
                            <p>&nbsp; - &nbsp;</p>
                            <PriceWithVND
                              price={item?.totalPayment}
                              currencyRate={bookingDetail?.currencyRate}
                              currencyCode={bookingDetail?.currencyCode}
                              className="text-success"
                              helperClassName="text-12 text-neutral-500"
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {benefits?.length > 0 && (
                  <div
                    className="p-2 rounded-end ml-10 mt-16 sm:py-0"
                    style={{
                      borderLeft: "1px solid var(--color-action-success)",
                      background:
                        "linear-gradient(90deg, rgba(236, 236, 236, 0.2) 0%, rgba(143, 143, 143, 0) 100%)",
                    }}
                  >
                    <p className="text-dark fw-500 text-16 lg:text-15 md:text-14">
                      {t("COMMON.INCLUDED_OFFERS")}
                    </p>
                    {benefits.map((benefit, index) => (
                      <div key={index} className="d-flex align-items-top">
                        <i className="icon-check text-green-2 text-12 ml-10 mt-5" />
                        <span className="w-100 pl-10 text-14">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {item?.addOns.length > 0 && (
                <>
                  <p className="text-dark-1">{t("COMMON.ADDON_SERVICE")}</p>
                  {item?.addOns.map((addOn, addOnIdx) => (
                    <div
                      key={addOnIdx}
                      className="d-flex align-items-center pl-10 pl-md-20"
                    >
                      <p className="text-dark-1 mr-10">
                        {addOn?.serviceName}:{" "}
                      </p>
                      <PriceWithVND
                        price={addOn?.totalPayment}
                        currencyRate={bookingDetail?.currencyRate}
                        currencyCode={bookingDetail?.currencyCode}
                        className="text-dark-1"
                        helperClassName="text-12 text-neutral-500"
                      />
                    </div>
                  ))}
                </>
              )}
              <div className="mt-5 mt-md-20">
                <Policy item={item} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingDetailPage;
