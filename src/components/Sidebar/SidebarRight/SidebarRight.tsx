import { useMemo } from "react";
import {
  calculateNights,
  formatCurrency,
  formatStringToDate,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { info_booking, tax_include, create_invoice } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import { useEffect, useState } from "react";
import { getCartSummary } from "@/api/booking.api";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import "./SidebarRight.style.scss";
import BookNowButton from "./BookNowButton";
import TotalPrice from "./TotalPrice";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import useStorageListener from "@/hooks/useStorageListener";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/utils";
import type { BookingInfo, AddonService } from "@/types";

interface SidebarRightProps {
  isOffcanvas?: boolean;
}

const SidebarRight = ({ isOffcanvas = false }: SidebarRightProps) => {
  const { t } = useTranslation();
  const { currentCurrency } = useSelector((state) => state.app);
  const [searchParams, setSearchParams] = useQueryParams();
  const dispatch = useDispatch();
  const infoBookingFromSession = getFromSessionStorage(info_booking) as BookingInfo | null;
  const firstVoucher = infoBookingFromSession?.voucherApplies;
  const taxInclude = Boolean(!getFromSessionStorage(tax_include));
  const createInvoice = useStorageListener<boolean>(create_invoice);

  const [infoBooking, setInfoBooking] = useState<Record<string, any> | null>(infoBookingFromSession);
  const fromDate = infoBooking?.hotelInfo?.fromDate;
  const toDate = infoBooking?.hotelInfo?.toDate;
  const numberNights = calculateNights(fromDate, toDate);
  const [showDetail, setShowDetail] = useState(
    new Array(infoBooking?.services?.length).fill(true)
  );

  const { pathname } = useLocation();
  const isBookingPage = pathname === "/booking";
  const isHotelDetailPage = pathname.includes("/hotels");
  const isAddonPage = pathname === "/addon-services";

  const hanldeChangeBookingInfo = () => {
    setInfoBooking(getFromSessionStorage(info_booking) as Record<string, any> | null);
  };

  const handleDetailAddon = (indexRoom: number) => {
    setShowDetail((prev) =>
      prev.map((item: boolean, index: number) => (index === indexRoom ? !item : item))
    );
  };

  const hanldeClearBookingInfo = () => {
    handleSetDefaultBooking({
      hotelCode: infoBooking?.hotelInfo?.hotelCode,
      hotelName: infoBooking?.hotelInfo?.hotelName,
      searchParams,
    });
    setSearchParams({
      ...searchParams,
      roomActive: 1,
    });
    dispatch(setRoomActive(1));
    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);
  };

  useEffect(() => {
    if (isHotelDetailPage) {
      setToSessionStorage(info_booking, {
        ...infoBookingFromSession,
        services: infoBookingFromSession?.services?.map((item: any) => ({
          ...item,
          addOn: [],
        })),
      });
      // eslint-disable-next-line no-undef
      const event = new Event("triggerSearch");
      // eslint-disable-next-line no-undef
      window.dispatchEvent(event);
    }
    // eslint-disable-next-line no-undef
    window.addEventListener("triggerSearch", hanldeChangeBookingInfo);

    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("triggerSearch", hanldeChangeBookingInfo);
    };
  }, []);

  const totalPriceDiscount = useMemo(() => {
    if (!isBookingPage) return 0;
    return (
      (infoBooking?.totalDiscountSUP || 0) +
      (infoBooking?.totalDiscountOK || 0) +
      (infoBooking?.totalDiscountMember || 0)
    );
  }, [infoBooking, isBookingPage]);

  useEffect(() => {
    if (isBookingPage) {
      const dataRequest = {
        fromDate: infoBooking?.hotelInfo?.fromDate,
        toDate: infoBooking?.hotelInfo?.toDate,
        adults: infoBooking?.hotelInfo?.adults || 2,
        childrens: infoBooking?.hotelInfo?.children || 0,
        totalRoom: infoBooking?.hotelInfo?.room || 1,
        roomInfos: infoBooking?.services?.map((item: any) => ({
          roomID: item.roomID,
          serviceID: item.serviceID,
          addOns: item.addOn,
        })),
        voucherCode: infoBooking?.services?.[0]?.voucherCodes || "",
      };

      getCartSummary(dataRequest)
        .then((res: any) => {
          if (res?.success) {
            const dataResponse = {
              ...res.data,
              voucherCodes: infoBooking?.services?.[0]?.voucherCodes || "",
            };
            setInfoBooking(dataResponse);
            setToSessionStorage(info_booking, dataResponse);
            return;
          }
          setInfoBooking(infoBooking);
        })
        .catch(() => {
          setInfoBooking(infoBooking);
        });
    } else {
      setInfoBooking(infoBooking);
    }
  }, [isBookingPage]);

  return (
    <>
      <div
        className={classNames("is-sticky sidebar_right_booking_hotel ", {
          "sidebar-sticky": isHotelDetailPage && !isOffcanvas,
          "sidebar-sticky-addon":
            (isAddonPage || isBookingPage) && !isOffcanvas,
        })}
      >
        <aside
          className={`border-light-2 rounded-8 shadow-4  lg:border-none lg:rounded-none lg:shadow-none`}
        >
          <div
            className={classNames(
              "d-flex justify-content-between  px-15 py-15 border-bottom-light-2 w-100 bg-primary-500 sidebar_right_booking_hotel-header lg:rounded-none",
              {
                "sticky-info-booking-header": isOffcanvas,
              }
            )}
          >
            <p className="text-16 fw-600 text-white">
              {t("HOTEL_BOOKING.BOOKING_INFORMATION")}
            </p>

            {!isBookingPage &&
              !isAddonPage &&
              infoBooking?.services?.length > 0 &&
              infoBooking?.services[0]?.serviceID && (
                <div
                  className="cursor-pointer"
                  onClick={hanldeClearBookingInfo}
                >
                  <i className="icon-trash text-14 text-white" />
                </div>
              )}
          </div>

          <div className="px-20 side_bar_right_booking_info">
            <div className="py-10">
              <p className="text-16 fw-500 text-primary-500 mb-1 ">
                {infoBooking?.hotelInfo?.hotelName || ""}{" "}
                <span className="text-12 fw-400 text-neutral-500">
                  {numberNights && `(${numberNights} ${t("COMMON.NIGHT")})`}
                </span>
              </p>
              <p className="text-14 fw-400 text-neutral-500">
                {formatStringToDate(fromDate)} ~ {formatStringToDate(toDate)}
              </p>
            </div>
            <div className="border-bottom-light">
              {infoBooking?.services?.map(
                (item: any, index: number) =>
                  item.roomID && (
                    <div key={index} className="border-top-light py-10">
                      <div className="row justify-content-between ">
                        <p className="col-auto text-14 text-neutral-800 fw-600">
                          {t("COMMON.ROOM")} {index + 1} - {item?.roomName}
                        </p>
                      </div>
                      <div className="row justify-content-between items-center mt-10">
                        <div className="col-auto">
                          <div>
                            <span className="text-12 fw-500 text-primary-500 mr-10">
                              x 1
                            </span>
                            <span className="text-14 fw-400 text-neutral-500">
                              {item?.serviceName}
                            </span>
                          </div>
                        </div>
                        <p className="col-auto text-14 fw-500 text-primary-500">
                          {formatCurrency(item?.finalPrice * numberNights)}{" "}
                          {currentCurrency}
                        </p>
                      </div>
                      {infoBookingFromSession?.services &&
                        infoBookingFromSession?.services[index]?.addOn?.length >
                          0 && (
                          <div className="mt-10">
                            <div className="bg-gray-1 w-100 rounded-4 px-8 py-8">
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="text-14 fw-400 text-action-success w-100">
                                  Dịch vụ mua thêm
                                </p>
                                <button
                                  className="button text-13 text-primary-500 w-50 justify-content-end"
                                  onClick={() => handleDetailAddon(index)}
                                >
                                  <i
                                    className={`${
                                      showDetail[index]
                                        ? "ri-arrow-down-s-line"
                                        : "ri-arrow-up-s-line"
                                    } text-16 ml-5`}
                                  />
                                </button>
                              </div>

                              {showDetail[index] &&
                                infoBookingFromSession?.services &&
                                infoBookingFromSession?.services[
                                  index
                                ]?.addOn?.map((addOn: AddonService, addOnIndex: number) => (
                                  <div key={`${addOn}${addOnIndex}`}>
                                    <div className="d-flex justify-content-between w-100">
                                      <div className="text-12 fw-500 text-neutral-500">
                                        <span className="text-12 text-primary-500 fw-500 mr-10">
                                          x {addOn?.count}
                                        </span>
                                        {addOn?.serviceName}
                                      </div>

                                      <span className=" text-12 fw-500 text-neutral-800">
                                        {formatCurrency(addOn?.finalPrice)}{" "}
                                        {currentCurrency}
                                      </span>
                                    </div>
                                    <div className="text-15 text-end fw-500">
                                      {formatCurrency(
                                        addOn?.finalPrice * addOn?.count
                                      )}{" "}
                                      {currentCurrency}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                    </div>
                  )
              )}
            </div>
            {(infoBooking?.totalDiscountSUP > 0 ||
              infoBooking?.totalDiscountOK > 0 ||
              infoBooking?.totalDiscountMember > 0) && (
              <div className="border-bottom-light py-10">
                {isBookingPage && infoBooking?.totalDiscountSUP > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="side_bar_right_booking_info-title">
                      Giảm giá từ khách sạn
                    </p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountSUP)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
                {isBookingPage && infoBooking?.totalDiscountOK > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="side_bar_right_booking_info-title">
                      Mã giảm giá{" "}
                      {infoBooking?.voucherCode &&
                        `(${infoBooking?.voucherCode})`}
                    </p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountOK)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
                {isBookingPage && infoBooking?.totalDiscountMember > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="side_bar_right_booking_info-title">
                      Giảm giá thành viên
                    </p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountMember)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
              </div>
            )}

            {!!createInvoice && taxInclude && (
              <div className="d-flex justify-content-between w-100 border-bottom-light py-10">
                <p className="side_bar_right_booking_info-title">
                  Thuế và phí dịch vụ khách sạn
                </p>
                <p className="text-dark fw-500">
                  {infoBooking?.totalPayment > 0
                    ? formatCurrency(infoBooking?.totalPayment * 0.1)
                    : 0}{" "}
                  {currentCurrency}
                </p>
              </div>
            )}

          {/* Applied Voucher Section */}
          {/*infoBookingFromSession?.voucherApplies?.length > 0 && (
            <div className="border-bottom-light py-10">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <p className="text-14 fw-500 text-neutral-800">
                  {t('VOUCHER.TITLE')} ({infoBookingFromSession.voucherApplies.length})
                </p>
              </div>
              <div className="space-y-10">
                {infoBookingFromSession.voucherApplies.map((voucher, index) => (
                  <div key={`voucher-${index}`} className="bg-green-1 rounded-4 px-10 py-10 mb-10">
                    <div className="d-flex align-items-center">
                      <img
                        src="../images/HotelDetail/icon-promotion.png"
                        alt="promotion"
                        className="me-3"
                        style={{ width: '24px', height: '24px', minWidth: '24px' }}
                      />
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                          <p className="text-14 fw-500 text-neutral-800 mb-1">
                            {voucher?.voucherName}
                          </p>
                          <p className="text-12 text-neutral-500">
                            {t('VOUCHER.DISCOUNT')} {voucher?.totalPercent}% • {t('VOUCHER.EXPIRY')}: {voucher?.expiryDate}
                          </p>
                        </div>
                        <span className="bg-gray-1 rounded-6 px-12 py-4 text-12 fw-500 whitespace-nowrap">
                          {t('VOUCHER.APPLIED')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )*/}
            <TotalPrice />
            <p className="text-14 text-primary-500 mb-10">
              {!taxInclude
                ? `(${t("HOTEL_BOOKING.INCLUDE_VAT")})`
                : `(${t("HOTEL_BOOKING.WITHOUT_VAT")})`}
            </p>

            {isBookingPage && totalPriceDiscount > 0 && (
              <div className="row justify-content-end mb-20 ml-0 pl-0">
                <span className="bg-pink-light text-blue-1 rounded-4 text-right">
                  <span className="px-5 text-truncate text-13 ">
                    {t("HOTEL_BOOKING.SAVING")}
                  </span>
                  <span className="fw-bold">
                    {formatCurrency(totalPriceDiscount)} {currentCurrency}
                  </span>
                </span>
              </div>
            )}

            <BookNowButton isOffcanvas={isOffcanvas} />
          </div>
        </aside>
      </div>
    </>
  );
};

export default SidebarRight;
