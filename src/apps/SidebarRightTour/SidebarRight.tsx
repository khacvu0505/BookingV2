import { useMemo } from "react";
import {
  formatCurrency,
  formatStringToDate,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import {
  tax_include,
  info_booking_tour,
  create_invoice,
} from "@/utils/constants";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartTourSummary } from "@/api/booking.api";
import "./SidebarRight.style.scss";
import useStorageListener from "@/hooks/useStorageListener";
import TotalPrice from "./TotalPrice";
import BookNowButton from "./BookNowButton";
import type { TourBookingInfo, AddonService, TourServicePrice } from "@/types";

interface TourBookingData extends Partial<TourBookingInfo> {
  totalDiscountSUP?: number;
  totalDiscountOK?: number;
  totalDiscountMember?: number;
  totalPayment?: number;
  voucherCode?: string;
  [key: string]: unknown;
}

interface SidebarRightProps {
  isOffcanvas?: boolean;
}

const SidebarRight = ({ isOffcanvas = false }: SidebarRightProps) => {
  const { currentCurrency } = useSelector((state) => state.app);
  const infoBookingFromSession = useStorageListener<TourBookingData>(info_booking_tour);

  const taxInclude = Boolean(!getFromSessionStorage(tax_include));
  const createInvoice = useStorageListener<boolean>(create_invoice);

  const [infoBooking, setInfoBooking] = useState<TourBookingData | null>(infoBookingFromSession);

  const { pathname } = useLocation();
  const isBookingPage = pathname.includes("/booking-tour");

  const totalPriceDiscount = useMemo(() => {
    if (!isBookingPage) return 0;
    return (
      (infoBooking?.totalDiscountSUP || 0) +
      (infoBooking?.totalDiscountOK || 0) +
      (infoBooking?.totalDiscountMember || 0)
    );
  }, [infoBooking, isBookingPage]);

  const totalPeople = useMemo(() => {
    return infoBooking?.ServicePrices?.reduce(
      (acc: number, cur: TourServicePrice) => acc + (cur?.quantity || 0),
      0
    );
  }, [infoBooking]);

  useEffect(() => {
    if (isBookingPage) {
      const dataRequest = {
        date: infoBookingFromSession?.date,
        tourID: infoBookingFromSession?.tourID,
        tourInfos: infoBookingFromSession?.ServicePrices?.map((item: TourServicePrice) => ({
          serviceID: item?.serviceID,
          quantity: item?.quantity,
        })),
        addOns: infoBookingFromSession?.addons || [],
      };

      if (!dataRequest?.tourInfos?.length) {
        setInfoBooking(infoBookingFromSession);
        return;
      }

      getCartTourSummary(dataRequest)
        .then((res: any) => {
          if (res?.success) {
            const { data } = res || {};
            const { tourInfo, services, addOns, ...rest } = data || {};
            const convertedInfoBooking: TourBookingData = {
              ...tourInfo,
              ...rest,
              supplierCode: tourInfo.tourCode,
              supplierName: tourInfo.tourName,
              tourID: tourInfo.tourPackageID,
              tourName: tourInfo.tourPackageName,
              slug: infoBookingFromSession?.slug || "",
              ServicePrices: services,
              addons: addOns,
            };
            setInfoBooking(convertedInfoBooking);
            setToSessionStorage(info_booking_tour, convertedInfoBooking);
            return;
          }
          setInfoBooking(infoBookingFromSession);
        })
        .catch(() => {
          setInfoBooking(infoBookingFromSession);
        });
    } else {
      setInfoBooking(infoBookingFromSession);
    }
  }, [isBookingPage]);

  useEffect(() => {
    if (infoBookingFromSession) {
      setInfoBooking(infoBookingFromSession);
    }
  }, [infoBookingFromSession]);

  return (
    <>
      <div
        className={`is-sticky sidebar_right_booking_hotel ${
          // eslint-disable-next-line no-undef
          !isOffcanvas && "sidebar-sticky-addon"
        }`}
      >
        <aside
          className={`border-light-2 rounded-8 shadow-4 mx-3 mx-md-0 mb-3 mb-md-0`}
        >
          <div className="d-flex justify-content-between  px-15 py-15 border-bottom-light-2 w-100 sidebar_right_booking_hotel-header">
            <p className="sidebar_right_booking_hotel-header-title">
              Thong tin dat cho
            </p>
          </div>

          <div className="px-20 side_bar_right_booking_info">
            <div className="py-10">
              <p className="side_bar_right_booking_info_hotel-name">
                {infoBooking?.tourName || ""}
              </p>
              <p className="side_bar_right_booking_info_booking-date">
                {formatStringToDate(infoBooking?.date as any || new Date())}
              </p>
              <div className="side_bar_right_booking_info_booking-date">
                {totalPeople} nguoi
              </div>
            </div>
            <div className="border-bottom-light">
              {infoBooking?.ServicePrices?.map(
                (item: TourServicePrice, index: number) =>
                  (item.quantity || 0) > 0 && (
                    <div key={index} className="border-top-light py-10">
                      <div className="row justify-content-between items-center mt-10">
                        <div className="col-auto">
                          <div className="fw-400 text-15">
                            {item?.serviceName} x {item?.quantity || 1}
                          </div>
                        </div>
                        <p className="col-auto side_bar_right_booking_info_service-price">
                          {formatCurrency(item?.finalPrice || 0)} {currentCurrency}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
            {((infoBooking?.totalDiscountSUP || 0) > 0 ||
              (infoBooking?.totalDiscountOK || 0) > 0 ||
              (infoBooking?.totalDiscountMember || 0) > 0) && (
              <div className="border-bottom-light py-10">
                {isBookingPage && (infoBooking?.totalDiscountSUP || 0) > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="side_bar_right_booking_info-title">
                      Giam gia tour
                    </p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountSUP || 0)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
                {isBookingPage && (infoBooking?.totalDiscountOK || 0) > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="side_bar_right_booking_info-title">
                      Ma giam gia{" "}
                      {infoBooking?.voucherCode &&
                        `(${infoBooking?.voucherCode})`}
                    </p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountOK || 0)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
                {isBookingPage && (infoBooking?.totalDiscountMember || 0) > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="side_bar_right_booking_info-title">
                      Giam gia thanh vien
                    </p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountMember || 0)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
              </div>
            )}

            {!!createInvoice && taxInclude && (
              <div className="d-flex justify-content-between w-100 border-bottom-light py-10">
                <p className="side_bar_right_booking_info-title">Thue va phi</p>
                <p className="text-dark fw-500">
                  {(infoBooking?.totalPayment || 0) > 0
                    ? formatCurrency((infoBooking?.totalPayment || 0) * 0.1)
                    : 0}{" "}
                  {currentCurrency}
                </p>
              </div>
            )}
            {(infoBooking?.addons?.length || 0) > 0 && (
              <>
                <div className="border-bottom-light py-10">
                  <p className="fw-400 text-16 lg:text-15 md:text-14 text-neutral-800">
                    Dich vu mua them
                  </p>
                  {infoBooking?.addons?.map((addOn: AddonService) => (
                    <div key={addOn.serviceID}>
                      <div className="d-flex justify-content-between w-100">
                        <div className="text-14 fw-500 text-neutral-500">
                          <span className="text-14 text-primary-500 fw-500 mr-10">
                            x {addOn?.count}
                          </span>
                          {addOn?.serviceName}
                        </div>

                        <span className=" text-13 fw-500 text-neutral-800">
                          {formatCurrency(addOn?.finalPrice)} {currentCurrency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <TotalPrice />
            <p className="text-14 text-primary-500 mb-10">
              {!taxInclude
                ? "(Da bao gom thue phi)"
                : "(Chua bao gom thue phi)"}
            </p>

            {isBookingPage && totalPriceDiscount > 0 && (
              <div className="row justify-content-end mb-20 ml-0 pl-0">
                <span className="bg-pink-light text-blue-1 rounded-4 text-right">
                  <span className="px-5 text-truncate text-13 ">
                    Chuc mung ban da tiet kiem duoc
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
