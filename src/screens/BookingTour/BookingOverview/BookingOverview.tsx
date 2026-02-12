import { getBookingInfoTour, getPaymentBooking } from "@/api/booking.api";
import { create_invoice, tax_include } from "@/utils/constants";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import {
  clearSessionStorage,
  formatCurrency,
  formatStringToDate,
} from "@/utils/utils";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./BookingOverview.style.scss";
import Policy from "./Policy";
import BookingTourInfo from "../BookingTourInfo";
import isEmpty from "lodash/isEmpty";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { bookingKeys } from "@/lib/query-keys";

const BookingOverView = ({ email, bookingID, refOTPModal }, ref) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const { currentCurrency } = useSelector((state) => state.app);
  const [isShowMore, setIsShowMore] = useState(false);

  const { data: overview = null, isLoading: isLoadingRoom } = useQuery({
    queryKey: [...bookingKeys.all, "overviewTour", bookingID],
    queryFn: async () => {
      const res = await getBookingInfoTour(bookingID);
      if (res?.success) return res.data;
      return null;
    },
    enabled: !!bookingID && isVisible,
  });

  const paymentMutation = useMutation({
    mutationFn: () => getPaymentBooking(bookingID),
    onSuccess: (res) => {
      const { success, error } = res;
      if (success) {
        clearSessionStorage(tax_include);
        clearSessionStorage(create_invoice);
        if (res.data.includes("https")) {
          // eslint-disable-next-line no-undef
          window.open(res.data, "_self");
        } else {
          navigate(`/booking-tour/${bookingID}`);
        }
      } else {
        setIsVisible(false);
        Swal.fire({
          title: t("COMMON.NOTIFICATION"),
          imageUrl: "/images/Booking/icon-info.png",
          imageWidth: 72,
          imageHeight: 72,
          imageAlt: "Custom icon",
          text: typeof error === "string" ? error : t("COMMON.TRY_AGAIN_LATER"),
          confirmButtonText: "Okay",
          confirmButtonColor: "#00AEED",
          allowEscapeKey: false,
          allowEnterKey: true,
          allowOutsideClick: false,
          position: "top",
          customClass: {
            popup: "mt-30",
          },
        });
      }
    },
  });

  const handleClickContinue = () => {
    if (!isAccepted) {
      handleRenderNoti(t("COMMON.AGREE_TERM_AND_CONDITION"), "error");
      return;
    }
    paymentMutation.mutate();
  };

  const handleCloseModal = () => {
    setIsVisible(false);
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
    // eslint-disable-next-line no-undef
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsAccepted(false);
    }
  }, [isVisible]);

  const isLoading = isLoadingRoom || !overview;

  const benefits = useMemo(() => {
    if (overview?.benefits) {
      return overview.benefits.split(",");
    }
    return [];
  }, [overview]);
  const handleShowMoreService = () => {
    setIsShowMore((prev) => !prev);
  };

  const renderServiceOffer = useCallback((item, index) => {
    return (
      <div key={index} className="d-flex align-items-top">
        <i className="icon-check text-green-2 text-12 ml-10 mt-5" />
        <span className="w-100 pl-10 text-14">{item}</span>
      </div>
    );
  }, []);

  if (isLoading) return <></>;

  return (
    <div
      className={`currencyMenu js-currencyMenu pt-20 sm:pt-0 ${
        isVisible ? "" : "is-hidden"
      }`}
      style={{ paddingTop: 20 }}
    >
      <div className="currencyMenu__bg"></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size2">
        <div className="overflow-y-scroll h-70vh sm:h-100vh booking_overview_hotel">
          <div className="mt-10">
            <div className="d-flex justify-content-end mb-10">
              <button
                className="pointer mr-10 mv-19 lg:mr-16"
                onClick={handleCloseModal}
              >
                <i className="icon-close" />
              </button>
            </div>
            <div className="px-24 lg:px-16 sm:px-10">
              <div className="border-primary-500 rounded-8 px-24 lg:px-16 sm:px-10 py-24 lg:py-16">
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="d-flex">
                    <img
                      src="/images/Booking/info-booking-tour.png"
                      alt="OKdimall booking"
                      width={56}
                      style={{ height: 56 }}
                    />
                    <div className="ml-24 lg:ml-16">
                      <p className="text-24 lg:text-20 md:text-18 fw-600  text-primary-500">
                        {overview?.supplierName}
                      </p>
                      {overview?.totalPaymentOK > 0 && (
                        <p className="text-24 lg:text-20 sm:text-18 fw-500 text-primary-500">
                          {formatCurrency(overview?.totalPaymentOK)}{" "}
                          {currentCurrency}
                        </p>
                      )}
                    </div>
                  </div>
                  {benefits?.length > 0 && (
                    <div
                      className=" p-2 rounded-end ml-10 mt-16"
                      style={{
                        borderLeft: "1px solid var(--color-action-success)",
                        background:
                          "linear-gradient(90deg, rgba(236, 236, 236, 0.2) 0%, rgba(143, 143, 143, 0) 100%)",
                      }}
                    >
                      <span className="text-16 lg:text-15 md:text-14 text-dark fw-500 mr-10">
                        {t("COMMON.INCLUDED_OFFERS")}
                      </span>

                      <span
                        className={classNames(
                          "text-16 lg:text-15 md:text-14 fw-400 text-primary-500 italic cursor-pointer",
                          {
                            " visible-hidden": isShowMore,
                            "visible-visible":
                              !isShowMore && benefits?.length > 5,
                          }
                        )}
                        onClick={handleShowMoreService}
                      >
                        {t("COMMON.VIEW_MORE")}
                      </span>

                      {!isEmpty(benefits) &&
                        benefits
                          ?.slice(0, 5)
                          ?.map((item, index) =>
                            renderServiceOffer(item, index)
                          )}
                      {isShowMore &&
                        benefits
                          ?.slice(5)
                          ?.map((item, index) =>
                            renderServiceOffer(item, index)
                          )}
                    </div>
                  )}
                </div>
                <div className="mt-24">
                  <BookingTourInfo overview={overview} />
                </div>
                <div className="mt-24">
                  <p className="text-neutral-800 fw-700 text-18 lg:text-17 md:text-16 mb-16">
                    {t("COMMON.ADDON_SERVICE")}
                  </p>
                  {overview?.addOns?.length > 0 &&
                    overview?.addOns?.map((item, idx) => (
                      <div
                        key={idx}
                        className="d-flex items-center ml-10 sm:ml-0"
                      >
                        <p className="text-neutral-800 text-16 lg:text-15 md:text-14">
                          {item?.serviceName}
                        </p>
                        <p className="text-primary-500 fw-600 ml-4">
                          x{item?.quantity}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="mt-24">
                  <Policy item={overview} />
                </div>
              </div>
            </div>
          </div>
          <div className="px-24 lg:px-16 sm:px-10">
            <h4 className="text-18 lg:text-17 md:text-16 fw-500 mb-16 text-neutral-800 mt-32">
              {t("COMMON.YOUR_INFORMATION")}
            </h4>
            <div
              className="border-type-1 rounded-8 px-20 mb-20 relative"
              style={{
                backgroundColor: "#fef0f3",
              }}
            >
              <div className="row py-5">
                <div className="col-md-6">
                  <div className="d-flex justify-between py-20">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.FULLNAME")}{" "}
                    </div>
                    <div className="text-16 lg:text-15 md:text-14 fw-600 uppercase text-neutral-800">
                      {overview?.customerName}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between py-20">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.AMOUNT")}
                    </div>

                    <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500">
                      {formatCurrency(overview?.totalAmount)} {currentCurrency}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      Email
                    </div>
                    <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500">
                      {overview?.email}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20">
                    <div className="d-flex align-items-center">
                      <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800 mr-4">
                        {t("COMMON.DISCOUNT")}
                      </div>
                      <div className="searchMenu-loc js-form-dd js-liverSearch">
                        <div
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="true"
                          data-bs-offset="0,22"
                        >
                          <div className="cursor-pointer">
                            {/* <i className="icon-location-2 text-20 text-light-1 mt-5 cursor-pointer"></i> */}
                            <svg
                              width="26px"
                              height="26px"
                              viewBox="0 0 48 48"
                              version={"1" as any}
                              xmlns="http://www.w3.org/2000/svg"
                              enableBackground="new 0 0 48 48"
                            >
                              <circle fill="#2196F3" cx={24} cy={24} r={21} />
                              <rect
                                x={22}
                                y={22}
                                fill="#ffffff"
                                width={4}
                                height={11}
                              />
                              <circle
                                fill="#ffffff"
                                cx={24}
                                cy="16.5"
                                r="2.5"
                              />
                            </svg>

                            {/* End ml-10 */}
                          </div>
                        </div>

                        <div className="shadow-2 dropdown-menu min-width-400">
                          <div className="bg-white sm:px-0 sm:py-15 rounded-4">
                            <ul className="y-gap-5 js-results">
                              {overview?.vouchers?.length > 0 &&
                                overview?.vouchers.map((voucher, idx) => (
                                  <li
                                    key={idx}
                                    className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 active"`}
                                    role="button"
                                  >
                                    <div className="d-flex">
                                      <div className="text-13 fw-400 js-search-option-target">
                                        {voucher?.voucherName} {"("}
                                        <span className="text-success fw-600 ">
                                          {" "}
                                          {formatCurrency(
                                            voucher?.totalDiscount
                                          )}{" "}
                                          {currentCurrency}
                                        </span>{" "}
                                        {")"}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {overview?.totalDiscount > 0 ? (
                      <div className="text-15 lh-16 fw-500 text-success">
                        {formatCurrency(overview?.totalDiscount)}{" "}
                        {currentCurrency}
                      </div>
                    ) : (
                      <div className="text-15 lh-16 fw-500 text-success">
                        {formatCurrency(overview?.totalDiscount)}{" "}
                        {currentCurrency}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.LABEL_PHONE")}
                    </div>
                    <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500">
                      {overview?.customerMobileNo}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20">
                    <div className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                      {t("COMMON.TOTAL_PAYMENT")}
                    </div>

                    <div className="text-18 lg:text-17 md:text-16 lh-16 fw-500 text-danger">
                      {formatCurrency(overview?.totalPayment)} {currentCurrency}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="d-flex items-center justify-between flex-wrap border-top-light py-20">
                    <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("TOUR_BOOKING.PICKUP_LOCATION")}
                    </p>
                    <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800 text-truncate-3">
                      {overview?.pickupPoint}{" "}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex items-center justify-between flex-wrap border-top-light py-20">
                    <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("TOUR_BOOKING.PICKUP_LOCATION")}
                    </p>
                    <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800 text-truncate-3">
                      {overview?.DROP_OFF_LOCATION}
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex items-center justify-between border-top-light py-20">
                    <div className="text-16 fw-400 text-neutral-800">
                      {t("COMMON.STARTING_FROM")}
                    </div>

                    <div className="text-15 lh-16 fw-500">
                      {" "}
                      {formatStringToDate(overview?.formDate)}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex itém-center justify-between border-top-light py-20">
                    <div className="text-16 fw-400 text-neutral-800">
                      {t("COMMON.END_AFTER")}
                    </div>

                    <div className="text-15 lh-16 fw-500">
                      {" "}
                      {formatStringToDate(overview?.toDate)}
                    </div>
                  </div>
                </div>

                {/* End .col */}
              </div>
              <img
                src="/images/Booking/icon-pin.png"
                alt="img"
                className="absolute"
                style={{
                  top: -12,
                  right: -9,
                }}
              />

              {/* End .row */}
            </div>
          </div>
        </div>

        <div
          className="d-flex items-center justify-content-between flex-wrap px-28 py-24 lg:pt-0 lg:px-10 sm:sticky sm:bottom-0 bg-white"
          style={{
            boxShadow: "0px -1px 8px 0px #00000026",
          }}
        >
          <div className="d-flex justyfy-content-between">
            <div className="text-14 text-light-1 d-flex justify-content-start mt-10">
              <p className="mr-10 mt-1">
                <div className="form-checkbox mt-4 mb-20 pl-0">
                  <input
                    type="checkbox"
                    name="isInvoice"
                    value={isAccepted as any}
                    onChange={() => setIsAccepted(!isAccepted)}
                  />
                  <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon icon-check" />
                  </div>
                </div>
              </p>
              <p className="fw-400 text-16 lg:text-15 md:text-14 lg:text-16 text-neutral-500">
                {t("COMMON.AGREE")}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-10 w-100">
            <Button
              isOutline={true}
              onClick={handleCloseModal}
              className="px-38"
            >
              {t("COMMON.CLOSE")}
            </Button>
            <Button onClick={handleClickContinue} className="ml-16">
              {paymentMutation.isPending ? (
                <>
                  <span className="loader"></span>
                  <span className="ml-10">{t("COMMON.PROCESSING")}...</span>
                </>
              ) : (
                <span>{t("COMMON.PAYMENT")}</span>
              )}
            </Button>
            {/* <button
                  className="button py-20 -dark-1 bg-blue-1 text-white "
                  style={{ width: 150, height: 50 }}
                  onClick={handleClickContinue}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loader"></span>
                      <span className="ml-10">Đang xử lý...</span>
                    </>
                  ) : (
                    <span>Thanh toán</span>
                  )}
                </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(BookingOverView);
