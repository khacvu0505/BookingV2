import { getBookingInfo, getPaymentBooking, sendOTP } from "@/api/booking.api";
import { create_invoice, tax_include } from "@/utils/constants";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import {
  clearSessionStorage,
  formatCurrency,
  formatStringToDate,
} from "@/utils/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import "./BookingOverview.style.scss";
import Policy from "./Policy";
import Button from "@/apps/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";

const BookingOverView = ({ email, bookingID, refOTPModal }, ref) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [overview, setOverview] = useState(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const { currentCurrency } = useSelector((state) => state.app);

  const handleClickContinue = () => {
    if (!isAccepted) {
      handleRenderNoti(t("COMMON.AGREE_TERM_AND_CONDITION"), "error");
      return;
    }
    setIsSubmitting(true);

    getPaymentBooking(bookingID).then((res) => {
      const { success, error } = res;

      if (success) {
        clearSessionStorage(tax_include);
        clearSessionStorage(create_invoice);
        if (res.data.includes("https")) {
          // eslint-disable-next-line no-undef
          window.open(res.data, "_self");
        } else {
          navigate(`/booking-hotel/${bookingID}`);
        }
      } else {
        setIsVisible(false);

        Swal.fire({
          title: t("COMMON.NOTIFICATION"),
          imageUrl: "/images/Booking/icon-info.png", // Đường dẫn đến hình ảnh
          imageWidth: 72, // Độ rộng của hình ảnh (tùy chỉnh)
          imageHeight: 72, // Độ cao của hình ảnh (tùy chỉnh)
          imageAlt: "Custom icon", // Văn bản thay thế nếu không hiển thị được hình ảnh
          text: typeof error === "string" ? error : t("COMMON.TRY_AGAIN_LATER"),
          confirmButtonText: "Okay",
          confirmButtonColor: "#00AEED",
          allowEscapeKey: false,
          allowEnterKey: true,
          allowOutsideClick: false,
          position: "top",
          customClass: {
            popup: "mt-30", // Thêm class để tùy chỉnh khoảng cách
          },
        }).then((result) => {});
      }
      setIsSubmitting(false);
    });
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
    if (bookingID && isVisible) {
      setIsLoadingRoom(true);
      getBookingInfo(bookingID)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            setOverview(data);
          } else {
            setOverview(null);
          }
          setIsLoadingRoom(false);
        })
        .catch(() => {
          setIsLoadingRoom(false);
          setOverview(null);
        });
    }
  }, [bookingID, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setIsAccepted(false);
    }
  }, [isVisible]);

  const isLoading = isLoadingRoom || !overview;

  if (isLoading) return <></>;

  return (
    <div
      className={`currencyMenu js-currencyMenu pt-20 sm:pt-0  ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg"></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size2">
        <div className="overflow-y-scroll h-70vh sm:h-100vh booking_overview_hotel">
          <div className="mt-16">
            <div className="d-flex justify-content-between">
              <h4 className="booking_overview_hotel_supplier-name mb-19">
                {overview?.supplierName}{" "}
              </h4>
              <button
                className="pointer mr-10 mb-19 lg:mr-16"
                onClick={handleCloseModal}
              >
                <i className="icon-close" />
              </button>
            </div>
            <div className="px-24 lg:px-10">
              <div
                className="accordion js-accordion -simple border-primary-500 rounded-8"
                id="BookingOverview"
              >
                {overview?.details.map((item, index) => {
                  const benefits = item?.benefits?.split(",") || [];
                  return (
                    <div
                      key={item?.roomIndex}
                      className={`accordion__item px-20 py-20 mb-20 rounded-4`}
                    >
                      <div
                        aria-expanded={1 === item?.roomIndex ? "true" : "false"}
                        className="accordion__button d-flex"
                        data-bs-toggle="collapse"
                        data-bs-target={`#OverviewBooking${item.roomIndex}`}
                      >
                        <div className="accordion__icon size-40 flex-center bg-primary-500 rounded-full mr-5 mt-14">
                          <i className="icon-plus text-white" />
                          <i className="icon-minus text-white" />
                        </div>
                        <div className="d-flex justify-content-between w-100 flex-wrap">
                          <div className="ml-24">
                            <div className="d-flex items-center flex-wrap">
                              <p className="text-16 fw-500 text-action-highlight mr-10">
                                {t("COMMON.ROOM")} {index + 1}:{" "}
                              </p>
                              <p className="text-20 lg:text-20 md:text-16 text-action-highlight fw-500">
                                {item?.roomName}
                              </p>
                            </div>
                            <p>
                              <img
                                src="/images/HotelList/icon-bed.png"
                                alt="img"
                                className="mr-8"
                              />
                              {item.serviceName}
                            </p>
                            <div className="d-flex align-items-center">
                              {item?.totalAmount === item?.totalPayment ||
                              item?.totalAmount < item?.totalPayment ? (
                                <PriceWithVND
                                  price={item?.totalPayment}
                                  currencyRate={overview?.currencyRate}
                                  currencyCode={overview?.currencyCode}
                                  className="text-primary-500 fw-500 text-22 lg:text-20 md:text-18"
                                  helperClassName="text-12 text-neutral-500"
                                />
                              ) : (
                                <>
                                  <PriceWithVND
                                    price={item?.totalAmount}
                                    currencyRate={overview?.currencyRate}
                                    currencyCode={overview?.currencyCode}
                                    className="text-18 fw-500 text-decoration-line-through"
                                    helperClassName="text-12 text-neutral-500"
                                  />
                                  <p>&nbsp; - &nbsp;</p>
                                  <PriceWithVND
                                    price={item?.totalPayment}
                                    currencyRate={overview?.currencyRate}
                                    currencyCode={overview?.currencyCode}
                                    className="text-primary-500 text-24 lg:text-20 sm:text-18 fw-500"
                                    helperClassName="text-12 text-neutral-500"
                                  />
                                </>
                              )}
                            </div>
                          </div>
                          {benefits?.length > 0 && (
                            <div
                              className=" p-2 rounded-end ml-10 mt-16"
                              style={{
                                borderLeft:
                                  "1px solid var(--color-action-success)",
                                background:
                                  "linear-gradient(90deg, rgba(236, 236, 236, 0.2) 0%, rgba(143, 143, 143, 0) 100%)",
                              }}
                            >
                              <p className="text-dark fw-500 text-16 lg:text-15 md:text-14">
                                {t("COMMON.INCLUDED_OFFERS")}
                              </p>
                              {benefits?.length > 0 &&
                                benefits.map((item, index) => (
                                  <div
                                    key={index}
                                    className="d-flex align-items-top"
                                  >
                                    <i className="icon-check text-green-2 text-12 ml-10 mt-5" />
                                    <span className="w-100 pl-10 text-14">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`accordion-collapse collapse
                       ${item.roomIndex === 1 && "show"}
                      `}
                        id={`OverviewBooking${item.roomIndex}`}
                        data-bs-parent="#InfoBooking"
                      >
                        {item?.addOns.length > 0 && (
                          <>
                            <p className="text-neutral-800 text-16 lg:text-15 md:text-14 mr-10">
                              {t("COMMON.ADDON_SERVICE")}
                            </p>
                            {item?.addOns.map((addOn, idx) => (
                              <div
                                key={idx}
                                className="d-flex align-items-center pl-20"
                              >
                                <p className="text-neutral-800 text-16 lg:text-15 md:text-14 mr-10">
                                  {addOn?.serviceName} (
                                  <PriceWithVND
                                    price={addOn?.totalPayment / addOn.quantity}
                                    currencyRate={overview?.currencyRate}
                                    currencyCode={overview?.currencyCode}
                                    helperClassName="text-12 text-neutral-500"
                                  />
                                  {" "}x {addOn.quantity}):{" "}
                                </p>
                                <div className="text-neutral-800 text-16 lg:text-15 md:text-14 mr-10">
                                  <PriceWithVND
                                    price={addOn?.totalPayment}
                                    currencyRate={overview?.currencyRate}
                                    currencyCode={overview?.currencyCode}
                                    helperClassName="text-12 text-neutral-500"
                                  />
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                        <div className="mt-20">
                          <Policy item={item} />
                        </div>
                      </div>

                      {overview?.specialRequest && (
                        <div className="mt-20">
                          <p className="text-neutral-800 fw-700 text-18">
                            {t("COMMON.SPECIAL_REQUEST")}
                          </p>
                          <p className="text-16 fw-400 text-neutral-800">
                            {overview?.specialRequest}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="px-24 lg:px-10 md:mb-200">
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
                  <div className="d-flex justify-between py-20 lg:py-10">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.FULLNAME")}{" "}
                    </div>
                    <div className="text-16 fw-600 uppercase text-neutral-800">
                      {overview?.customerName}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between py-20 lg:py-10">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.TOTAL_AMOUNT")}
                    </div>

                    <div className="text-15 lh-16 fw-500">
                      <PriceWithVND
                        price={overview?.totalAmount}
                        currencyRate={overview?.currencyRate}
                        currencyCode={overview?.currencyCode}
                        helperClassName="text-12 text-neutral-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20 lg:py-10">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      Email
                    </div>
                    <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500">
                      {overview?.email}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20 lg:py-10">
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
                      <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500 text-success">
                        <PriceWithVND
                          price={overview?.totalDiscount}
                          currencyRate={overview?.currencyRate}
                          currencyCode={overview?.currencyCode}
                          helperClassName="text-12 text-neutral-500"
                        />
                      </div>
                    ) : (
                      // text-blue-1
                      <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500 text-success">
                        <PriceWithVND
                          price={overview?.totalDiscount}
                          currencyRate={overview?.currencyRate}
                          currencyCode={overview?.currencyCode}
                          helperClassName="text-12 text-neutral-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20 lg:py-10">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.LABEL_PHONE")}
                    </div>
                    <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500">
                      {overview?.customerPhone}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20">
                    <div className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                      {t("COMMON.TOTAL_PAYMENT")}
                    </div>

                    <div className="text-18 lg:text-17 md:text-16 lg:text-17 md:text-16 lh-16 fw-500 text-danger">
                      <PriceWithVND
                        price={overview?.totalPayment}
                        currencyRate={overview?.currencyRate}
                        currencyCode={overview?.currencyCode}
                        className="text-18 lg:text-17 md:text-16 lg:text-17 md:text-16 lh-16 fw-500 text-danger"
                        helperClassName="text-12 text-neutral-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20 lg:py-10">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.CHECK_IN_DATE")}
                    </div>

                    <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500">
                      {" "}
                      {formatStringToDate(overview?.checkInDate)}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-between border-top-light py-20 lg:py-10">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800">
                      {t("COMMON.CHECK_OUT_DATE")}
                    </div>

                    <div className="text-16 lg:text-15 md:text-14 lh-16 fw-500">
                      {" "}
                      {formatStringToDate(overview?.checkOutDate)}
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
                <div className="form-checkbox px-10 mt-4 mb-20 pl-0">
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
              <p className="fw-400 text-16 lg:text-15 md:text-14 text-neutral-500">
                
                {t("COMMON.AGREE")} {" "}<span
              className="underline pointer text-primary-500"
              onClick={() => {
                // eslint-disable-next-line no-undef
                window.open("/privacy-policy", "_blank");
              }}
            >
              {t("COMMON.PRIVATE_POLICY")} 
            </span>
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
              {isSubmitting ? (
                <>
                  <span className="loader"></span>
                  <span className="ml-10">{t("COMMON.PROCESSING")}...</span>
                </>
              ) : (
                <span>{t("COMMON.PAYMENT")}</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(BookingOverView);
