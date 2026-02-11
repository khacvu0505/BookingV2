import { getBookingInfo } from "@/api/booking.api";
import { formatCurrency, formatStringToDate } from "@/utils/utils";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const InfoBookingCustomerModal = (_, ref) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [star, setStar] = useState(5);
  const { currentCurrency } = useSelector((state) => state.app);

  const [roomInfo, setRoomInfo] = useState(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
    setSelectedRoom,
  }));

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleChangeRating = (value) => {
    setStar(value);
  };

  useEffect(() => {
    if (selectedRoom) {
      setIsLoadingRoom(true);
      getBookingInfo(selectedRoom)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            setRoomInfo(data);
          } else {
            setRoomInfo(null);
          }
          setIsLoadingRoom(false);
        })
        .catch(() => {
          setIsLoadingRoom(false);
          setRoomInfo(null);
        });
    }
  }, [selectedRoom]);

  const isLoading = isLoadingRoom || !roomInfo;

  return (
    <div
      className={`currencyMenu js-currencyMenu pt-20 ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div className="currencyMenu__content bg-white rounded-4modal-custom-size2">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        <div className="d-flex items-center justify-between sm:px-15">
          <div className="text-20 fw-500 lh-15 w-100 text-center">
            <img src="/img/general/logo-okdimall.svg" alt="logo" width={100} />
            <p className="mt-10 text-dark-1 text-24 pr-20">
              {t("COMMON.BOOKING_ROOM_INFO")}
            </p>
          </div>
        </div>
        {isLoading ? (
          <Skeleton count={5} />
        ) : (
          <div className="h-600 overflow-y-scroll mb-20">
            <div className="mx-auto mb-10 info-booking-customer-container">
              <h4 className="text-20 fw-500 mb-10 pt-20">
                {t("COMMON.ROOM_INFO")}{" "}
              </h4>
              <div className="accordion js-accordion -simple" id="InfoBooking">
                {roomInfo?.details.map((item) => (
                  <div
                    key={item?.roomIndex}
                    className={`accordion__item px-20 py-20 mb-20 border-light rounded-4`}
                  >
                    <div
                      aria-expanded={1 === item?.roomIndex ? "true" : "false"}
                      className={`accordion__button d-flex items-center `}
                      data-bs-toggle="collapse"
                      data-bs-target={`#InfoBooking${item.roomIndex}`}
                    >
                      <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-5">
                        <i className="icon-plus" />
                        <i className="icon-minus" />
                      </div>
                      <div className="button text-dark-1 text-start">
                        {t("COMMON.ROOM")} {item?.roomIndex}: {item?.roomName}
                      </div>
                    </div>
                    <div
                      className={`accordion-collapse collapse ml-20
                       ${item.roomIndex === 1 && "show"}
                      `}
                      id={`InfoBooking${item.roomIndex}`}
                      data-bs-parent="#InfoBooking"
                    >
                      <div className="d-flex align-items-center pt-10">
                        <p className="text-dark-1 mr-10">
                          {t("COMMON.ROOM_NAME")} {item?.roomIndex}:{" "}
                          {item?.roomName} -
                        </p>
                        <p className="text-dark-1">
                          {t("COMMON.SERVICE")}: {item?.serviceName}
                        </p>
                      </div>

                      {item?.addOns.length > 0 && (
                        <>
                          <p className="text-dark-1">
                            {t("COMMON.ADDON_SERVICE")}
                          </p>
                          {item?.addOns.map((addOn, idx) => (
                            <div
                              key={idx}
                              className="d-flex align-items-center pl-20"
                            >
                              <p className="text-dark-1 mr-10">
                                {t("COMMON.SERVICE_NAME")}: {addOn?.serviceName}{" "}
                                -{" "}
                              </p>
                              <p className="text-dark-1">
                                {t("COMMON.SERVICE_PRICE")}:{" "}
                                {addOn?.totalPayment}
                              </p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="info-booking-customer-container mx-auto">
              <h4 className="text-20 fw-500 mb-10 pt-20">
                {t("COMMON.YOUR_INFORMATION")}
              </h4>
              <div className="border-type-1 rounded-8 px-20 mb-70 ">
                <div className="row y-gap-10 py-20">
                  <div className="col-12">
                    <div className="d-flex justify-between ">
                      <div className="text-15 lh-16">
                        {t("COMMON.FULLNAME")}{" "}
                      </div>
                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {roomInfo?.customerName}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">Email</div>
                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {roomInfo?.email}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.LABEL_PHONE")}
                      </div>
                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {roomInfo?.customerPhone}
                      </div>
                    </div>
                  </div>
                  {/* End .col */}
                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.CHECK_IN_DATE")}
                      </div>

                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {" "}
                        {formatStringToDate(roomInfo?.checkInDate)}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.CHECK_OUT_DATE")}
                      </div>

                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {" "}
                        {formatStringToDate(roomInfo?.checkOutDate)}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.HOTEL_NAME")}
                      </div>

                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {roomInfo?.supplierName}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.TOTAL_AMOUNT")}
                      </div>

                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {formatCurrency(roomInfo?.totalAmount)}{" "}
                        {currentCurrency}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.DISCOUNT")}
                      </div>

                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {formatCurrency(roomInfo?.totalDiscount)}{" "}
                        {currentCurrency}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.TOTAL_PAYMENT")}
                      </div>

                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {formatCurrency(roomInfo?.totalPayment)}{" "}
                        {currentCurrency}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex justify-between border-top-light pt-10">
                      <div className="text-15 lh-16">
                        {t("COMMON.SPECIAL_REQUEST")}
                      </div>
                      <div className="text-15 lh-16 fw-500 text-blue-1">
                        {roomInfo?.specialRequest ||
                          t("COMMON.NO_SPECIAL_REQUEST")}
                      </div>
                    </div>
                  </div>
                  {/* End .col */}
                </div>
                {/* End .row */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(InfoBookingCustomerModal);
