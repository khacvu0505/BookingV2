import React, { lazy, useEffect, useMemo, useRef, useState } from "react";
import Header3 from "@/components/header/header-3";
import {
  clearSessionStorage,
  formatCurrency,
  formatStringToDate,
} from "@/utils/utils";
import { getBookingDetailTour } from "@/api/user.api";
import { useNavigate, useParams } from "react-router-dom";

import { hold_code } from "@/utils/constants";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { resendInfoBooking } from "@/api/booking.api";
import classNames from "classnames";
import useWindowSize from "@/utils/useWindowSize";
import { useSelector } from "react-redux";
import MetaComponent from "@/apps/MetaComponent";
import Button from "@/apps/Button";
import Breadcrumb from "@/apps/Breadcrumb";
import PolicyModal from "@/apps/PolicyDetail";
import BookingTourInfo from "./BookingTourInfo";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const TagComponent = lazy(() => import("@/apps/TagComponent"));
const CancelBookingInformationModal = lazy(() =>
  import("./CancelBookingInformationModal")
);
const RatingComponent = lazy(() => import("@/components/rating"));
const RatingModal = lazy(() => import("@/apps/RatingModal"));
const UpdateCustomerReceiveModal = lazy(() =>
  import("@/components/profile/update-customer-receive")
);
const Policy = lazy(() => import("../Booking/BookingOverview/Policy"));

const metadata = {
  title: "Tour List",
  description: "OKdimall - Travel & Tour ",
};

const BookingDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const refRatingModal = useRef(null);
  const policyRef = useRef(null);
  const refCancelBookingInfo = useRef(null);
  const isDesktop = useWindowSize().width > 768;
  const { currentCurrency } = useSelector((state: any) => state.app);

  const { id } = useParams();
  const [bookingDetail, setBookingDetail] = useState(null);

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

  const handleGetBookingDetail = () => {
    getBookingDetailTour(id as any)
      .then((res) => {
        if (res?.success) {
          setBookingDetail(res?.data || null);
        } else {
          setBookingDetail(null);
        }
      })
      .catch(() => {
        setBookingDetail(null);
      });
    clearSessionStorage(hold_code);
  };

  useEffect(() => {
    handleGetBookingDetail();
  }, []);

  const isHasBtnCancelBooking = useMemo(() => {
    if (["Ready", "WaitingApprove"].includes(bookingDetail?.bookingStatus)) {
      return true;
    }
    return false;
  }, [bookingDetail]);

  const isFinish = useMemo(() => {
    return bookingDetail?.bookingStatus === "Completed";
  }, [bookingDetail]);

  const isHasBtnRating =
    bookingDetail?.bookingStatus === "Completed" && !bookingDetail?.isFeedback;

  if (!bookingDetail) return null;

  return (
    <div className="mb-50">
      <MetaComponent meta={metadata} />

      <section className="mt-100">
        <div className="container">
          <Breadcrumb
            data={[
              {
                title: t("COMMON.MY_PROFILE"),
                link: "/profile/information",
              },
              {
                title: t("PROFILE.BOOKING_HISTORY"),
                link: "/profile/booking-history-tour",
              },
              {
                title: bookingDetail?.supplierName,
              },
            ]}
          />
          <div className="d-flex align-items-center flex-wrap mt-30">
            <img
              src={
                bookingDetail?.thumbs?.length > 0
                  ? bookingDetail?.thumbs[0]
                  : ""
              }
              alt="hotel"
              width={264}
              className="rounded-8 mr-20 h-240 object-cover sm:w-1/1 sm:mr-0"
            />

            <div className="md:w-1/1">
              <div className="d-flex items-center mb-20 sm:flex-column sm:items-start sm:mt-10">
                <div className="d-flex items-center mr-16">
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
                  alt="location"
                  className="mr-4"
                  width={20}
                  height={20}
                />
                <p className="text-14 fw-400 text-neutral-500 mr-8">
                  {t("COMMON.LABEL_PHONE")}:
                </p>
                <p className="text-14 fw-500 text-neutral-800">
                  {bookingDetail?.customerMobileNo}
                </p>
              </div>

              <p
                className="italic underline text-14 fw-400 text-secondary-500 mb-8 pointer"
                onClick={() => policyRef.current.setIsVisible(true)}
              >
                {t("PROFILE.TOUR_RULE")}
              </p>

              <Button
                type="secondary"
                onClick={() =>
                  bookingDetail?.slug &&
                  navigate(`/tour/${bookingDetail?.slug}`)
                }
                className="sm:w-1/1"
              >
                {t("PROFILE.BOOKING_TOUR_AGAIN")}
              </Button>
            </div>
          </div>
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
                {formatStringToDate(bookingDetail?.formDate)}
              </p>
            </div>
            <div className="col-md-6 py-24 sm:py-10">
              <p className="text-14 fw-400 text-neutral-500">
                {t("COMMON.CHECK_IN_DATE")}
              </p>
              <p className="text-18 lg:text-17 md:text-15 fw-500 text-neutral-800">
                {formatStringToDate(bookingDetail?.toDate)}
              </p>
            </div>
          </div>
          <div>
            <BookingTourInfo overview={bookingDetail} />
          </div>
          <div>
            <Policy item={bookingDetail} />
          </div>

          <div className="mt-24">
            <div className="d-flex justify-content-between flex-wrap">
              <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800">
                {t("COMMON.YOUR_INFORMATION")}
              </p>
              <div>
                {/* <p
                  className="text-20 underline italic text-primary fw-500 cursor-pointer"
                  onClick={handleClickUpdateInfo}
                >
                  Cập nhật thông tin
                </p> */}
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
              {/* <div className="d-flex items-center col-md-6 mb-16">
                <p className="text-14 fw-400 text-neutral-800 mr-4">
                  Số người ở:
                </p>{" "}
                <p className="fw-600 text-14 text-neutral-800">
                  {bookingDetail?.totalAdult + bookingDetail?.totalChildren} (
                  {bookingDetail?.totalAdult} Người lớn +{" "}
                  {bookingDetail?.totalChildren} Trẻ em)
                </p>
              </div> */}
              <div className="d-flex items-center col-md-6 mb-16 md:mb-0">
                <p className="text-14 fw-400 text-neutral-800 mr-4">Email:</p>{" "}
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
              {bookingDetail?.pickUp && (
                <div className="d-flex items-center col-md-6 mb-16 md:mb-6">
                  <p className="text-14 fw-400 text-neutral-800 mr-4">
                    {t("TOUR_BOOKING.PICKUP_LOCATION")}:{" "}
                  </p>
                  <p className="fw-600 text-14 text-neutral-800">
                    {bookingDetail?.pickUp}
                  </p>
                </div>
              )}
              {bookingDetail?.dropOff && (
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
                  {" "}
                  {t("COMMON.SPECIAL_REQUEST")}:
                </p>
                <br />
                <p className="fw-600 text-14 text-neutral-800">
                  {bookingDetail?.specialRequest ||
                    t("COMMON.NO_SPECIAL_REQUEST")}
                </p>
              </div>
            </div>

            {/* <div
              className="accordion js-accordion -simple mt-20"
              id="InfoBooking"
            >
              {bookingDetail?.servicePrices?.map((item, idx) => (
                <div
                  key={idx}
                  className={`accordion__item px-20 py-20 mb-20 border-primary-500 rounded-8`}
                >
                  <div
                    aria-expanded={1 === idx + 1 ? "true" : "false"}
                    className={`accordion__button d-flex items-center `}
                    data-bs-toggle="collapse"
                    data-bs-target={`#InfoBooking${idx + 1}`}
                  >
                    <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-5">
                      <i className="icon-plus" />
                      <i className="icon-minus" />
                    </div>
                    <div className="button text-24 text-action-highlight ml-24">
                      {item?.serviceName}
                    </div>
                  </div>
                  <div
                    className={`accordion-collapse collapse ml-20
                       ${idx + 1 === 1 && "show"}
                      `}
                    id={`InfoBooking${idx + 1}`}
                    data-bs-parent="#InfoBooking"
                  >
                    <div className="d-flex align-items-center ml-50">
                      {item?.totalAmount === item?.totalPayment ||
                      item?.totalAmount < item?.totalPayment ? (
                        <>
                          <p className="text-24 text-primary-500 fw-500">
                            {" "}
                            {formatCurrency(item?.totalPayment)}{" "}
                            {currentCurrency}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-24 text-primary-500 fw-500">
                            {formatCurrency(item?.totalAmount)}{" "}
                            {currentCurrency}{" "}
                          </p>
                          {item?.totalPayment > 0 && (
                            <>
                              <p>&nbsp; - &nbsp;</p>
                              <p className="text-success">
                                {" "}
                                {formatCurrency(item?.totalPayment)}{" "}
                                {currentCurrency}
                              </p>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mt-5 mt-md-20">
                      <Policy item={item} />
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
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
                    className="d-block sm:d-none"
                    onClick={() => {
                      Swal.fire({
                        title: t("COMMON.CANCEL_BOOKING_TOUR"),
                        imageUrl: "/images/Booking/icon-info-yellow.png", // Đường dẫn đến hình ảnh
                        imageWidth: 72, // Độ rộng của hình ảnh (tùy chỉnh)
                        imageHeight: 72, // Độ cao của hình ảnh (tùy chỉnh)
                        imageAlt: "Custom icon", // Văn bản thay thế nếu không hiển thị được hình ảnh
                        // text: "Bạn có chắc chắn muốn huỷ phòng?",
                        html: `
                      ${t("COMMON.DO_YOU_WANT_CANCEL_BOOKING_TOUR")} <br />
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
                    }}
                  >
                    {t("COMMON.CANCEL_BOOKING_TOUR")}
                  </Button>
                )}
              </div>

              <div className="d-flex align-items-center">
                <p className="text-16 lg:text-15 md:text-14 fw-500 mr-8">
                  {t("COMMON.TOTAL_AMOUNT")}:
                </p>
                <p className="text-18 lg:text-17 md:text-16 fw-600 text-primary-500">
                  {formatCurrency(bookingDetail?.totalPayment)}{" "}
                  {currentCurrency}
                </p>
              </div>
              {bookingDetail?.paymentRemarks && (
                <p className="text-14 fw-400 text-neutral-500">
                  ({bookingDetail?.paymentRemarks})
                </p>
              )}

              {(isHasBtnCancelBooking || cancelSuccess) && (
                <Button
                  className="mt-20 w-100 d-none sm:d-block"
                  onClick={() => {
                    Swal.fire({
                      title: t("COMMON.CANCEL_BOOKING_TOUR"),

                      imageUrl: "/images/Booking/icon-info-yellow.png", // Đường dẫn đến hình ảnh
                      imageWidth: 72, // Độ rộng của hình ảnh (tùy chỉnh)
                      imageHeight: 72, // Độ cao của hình ảnh (tùy chỉnh)
                      imageAlt: "Custom icon", // Văn bản thay thế nếu không hiển thị được hình ảnh
                      // text: "Bạn có chắc chắn muốn huỷ phòng?",
                      html: `
                      ${t("COMMON.DO_YOU_WANT_CANCEL_BOOKING_TOUR")} <br />
                      ${t("COMMON.CHOOSE_AGREE_TO_CANCEL")}
                    `,
                      confirmButtonText: t("COMMON.AGREE_TEXT"),

                      confirmButtonColor: "#FFC414",
                      allowEscapeKey: false,
                      allowEnterKey: true,
                      allowOutsideClick: false,
                      position: "top",
                      customClass: {
                        popup: "mt-30", // Thêm class để tùy chỉnh khoảng cách
                      },
                    }).then((result) => {
                      if (result.isConfirmed) {
                        refCancelBookingInfo.current.setIsVisible(true);
                      }
                    });
                  }}
                >
                  {t("COMMON.CANCEL_BOOKING_TOUR")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <RatingModal
        bookingId={id as string}
        ref={refRatingModal}
        handleRatingSuccess={handleGetBookingDetail}
      />
      <CancelBookingInformationModal
        ref={refCancelBookingInfo}
        bookingDetail={bookingDetail}
        setCancelSuccess={setCancelSuccess}
      />
      <PolicyModal ref={policyRef} bookingDetail={bookingDetail} isTour />
    </div>
  );
};

export default BookingDetail;
