import { useMemo } from "react";
/* eslint-disable no-undef */
import FilterBox from "../../components/hotel-single/filter-box";
import {
  addDate,
  calculateNights,
  clearSessionStorage,
  formatCurrency,
  formatDate,
  formatStringToDate,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import {
  info_booking,
  hold_code,
  defaultServices,
  tax_include,
  info_booking_tour,
} from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchServicesByRoom } from "@/features/hotel-detail/reducers";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { useEffect, useState } from "react";
import { checkAddOnServices } from "@/api/hotel.api";
import Swal from "sweetalert2";
import {
  getHoldBooking,
  getCartSummary,
  getCartTourSummary,
} from "@/api/booking.api";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";

interface TourServiceItem {
  serviceID?: string;
  serviceName?: string;
  finalPrice?: number;
  quantity?: number;
  addOn?: Array<{ serviceName?: string; finalPrice?: number; count?: number; [key: string]: unknown }>;
  [key: string]: unknown;
}

interface TourBookingSessionData {
  tourInfo?: {
    tourName?: string;
    date?: string;
    [key: string]: unknown;
  };
  hotelInfo?: {
    fromDate?: string;
    toDate?: string;
    [key: string]: unknown;
  };
  services?: TourServiceItem[];
  ServicePrices?: Array<{ serviceID?: string; quantity?: number; [key: string]: unknown }>;
  date?: string;
  tourID?: string;
  supplierCode?: string;
  isNeedApproval?: boolean;
  voucherCode?: string;
  totalDiscountSUP?: number;
  totalDiscountOK?: number;
  totalDiscountMember?: number;
  totalPayment?: number;
  [key: string]: unknown;
}

interface SidebarRightTourProps {
  holdTime?: string;
  setPromotionCode?: (code: string) => void;
  isCreateInvoice?: boolean;
}

const SidebarRightTour = ({
  holdTime = "",
  setPromotionCode,
  isCreateInvoice = false,
}: SidebarRightTourProps) => {
  const [searchParams, setSearchParams] = useQueryParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoBookingFromSession = getFromSessionStorage<TourBookingSessionData>(info_booking_tour);
  const taxInclude = Boolean(!getFromSessionStorage(tax_include));
  const { currentCurrency } = useSelector((state) => state.app);

  const [infoBooking, setInfoBooking] = useState<TourBookingSessionData | null>(infoBookingFromSession);
  const fromDate = infoBooking?.hotelInfo?.fromDate ?? "";
  const toDate = infoBooking?.hotelInfo?.toDate ?? "";
  const [priceAddons, setPriceAddons] = useState(0);
  const [showDetail, setShowDetail] = useState(
    new Array(infoBooking?.services?.length ?? 0).fill(true)
  );
  const [remainingTime, setRemainingTime] = useState<number | string>(
    (holdTime && calculateRemainingTime(new Date(holdTime))) || ""
  );

  const { pathname } = useLocation();
  const isBookingPage = pathname.includes("/booking");
  const isAddonPage = pathname === "/addon-services";
  const numberNights = calculateNights(fromDate, toDate);

  function formatRemainingTime(remainingTime: number | string) {
    const rt = typeof remainingTime === "number" ? remainingTime : 0;
    const minutes = Math.floor((rt % 3600) / 60);
    const seconds = Math.floor(rt % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  function calculateRemainingTime(targetDateTime: Date) {
    const currentTime = new Date();
    const timeDifference = targetDateTime.getTime() - currentTime.getTime();
    const remainingSeconds = Math.max(timeDifference / 1000, 0); // Ensure remaining time is not negative
    return remainingSeconds;
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      holdTime && setRemainingTime(calculateRemainingTime(new Date(holdTime)));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalID);
  }, [holdTime]);

  useEffect(() => {
    if (typeof remainingTime === "number" && remainingTime <= 0) {
      Swal.fire({
        title: "Thông báo",
        icon: "warning",
        text: "Hết thời gian giữ phòng, vui lòng chọn lại phòng khác",
        confirmButtonText: "Về trang chủ",
        confirmButtonColor: "#f52549",
        allowEscapeKey: false,
        allowEnterKey: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          clearSessionStorage(hold_code);
          navigate("/");
        }
      });
    }
  }, [navigate, remainingTime]);

  useEffect(() => {
    if ((infoBookingFromSession?.services?.length ?? 0) > 0) {
      const addOns = infoBookingFromSession?.services?.map((item: TourServiceItem) =>
        (item?.addOn?.length ?? 0) > 0 ? item?.addOn ?? [] : []
      ) ?? [];
      const listAddon = ([] as Array<{ finalPrice?: number; count?: number; [key: string]: unknown }>).concat(...addOns);
      setPriceAddons(
        listAddon.reduce((acc: number, cur) => acc + (cur?.finalPrice ?? 0) * (cur?.count ?? 0), 0)
      );
    }
  }, [infoBookingFromSession]);

  const totalPrice = useMemo(() => {
    return (
      (infoBooking?.services?.reduce(
        (acc: number, cur: TourServiceItem) => acc + (cur?.finalPrice ?? 0) * numberNights,
        0
      ) ?? 0) + priceAddons
    );
  }, [infoBooking?.services, numberNights, priceAddons]);

  const totalPriceDiscount = useMemo(() => {
    if (!isBookingPage) return 0;
    return (
      (infoBooking?.totalDiscountSUP ?? 0) +
      (infoBooking?.totalDiscountOK ?? 0) +
      (infoBooking?.totalDiscountMember ?? 0)
    );
  }, [infoBooking, isBookingPage]);

  const totalPeople = useMemo(() => {
    return infoBooking?.services?.reduce((acc: number, cur: TourServiceItem) => acc + (cur?.quantity ?? 0), 0) ?? 0;
  }, [infoBooking]);

  const handleRenderPeople = (type: string) => {
    switch (type) {
      case "Adult":
        return "Người lớn";
      case "Child":
        return "Trẻ em";
      case "Old":
        return "Người già";

      default:
        return "Người lớn";
    }
  };

  useEffect(() => {
    if (isBookingPage) {
      const dataRequest = {
        date: infoBooking?.date,
        tourID: infoBooking?.tourID,
        tourInfos: infoBooking?.ServicePrices?.map((item) => ({
          serviceID: item?.serviceID,
          quantity: item?.quantity,
        })),
      };

      getCartTourSummary(dataRequest)
        .then((res) => {
          if (res?.success) {
            setInfoBooking(res?.data as TourBookingSessionData);
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
        className={`is-sticky ${window.innerWidth >= 1200 && "sidebar-sticky"}`}
      >
        <aside
          className={`border-light-2 rounded-22 shadow-4 mx-3 mx-md-0 mb-3 mb-md-0`}
        >
          <div className="d-flex justify-content-between  px-15 py-15 border-bottom-light-2 w-100">
            <div className="fs-18 fw-500">Tóm tắt đặt chỗ</div>

            <div className="text-end text-blue-1 fw-500 fs-20">
              {remainingTime && formatRemainingTime(remainingTime)}
            </div>
          </div>

          <div className="px-20">
            <div className="py-10">
              <div className="fw-500 fs-18">
                {infoBooking?.tourInfo?.tourName || ""}
              </div>
              <div className="fs-15">
                {formatStringToDate(infoBooking?.tourInfo?.date || new Date().toISOString())}
              </div>
              <div className="fs-13">{totalPeople} người</div>
            </div>
            <div className="border-bottom-light">
              {infoBooking?.services?.map(
                (item: TourServiceItem, index: number) =>
                  (item.quantity ?? 0) > 0 && (
                    <div key={index} className="border-top-light py-10">
                      <div className="row justify-content-between ">
                        {/* <div className="col-auto fs-18 fw-500">
                          Phòng {index + 1} - {item?.roomName}
                        </div> */}
                      </div>
                      <div className="row justify-content-between mt-10">
                        <div className="col-auto">
                          {/* <div className="fs-13">{item.totalAdult} adults</div> */}
                          <div>
                            {handleRenderPeople(item?.serviceName ?? "")} x{" "}
                            {item?.quantity || 1}
                          </div>
                        </div>
                        <div className="col-auto fs-16 fw-500">
                          {formatCurrency(item?.finalPrice ?? 0)} {currentCurrency}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
            {((infoBooking?.totalDiscountSUP ?? 0) > 0 ||
              (infoBooking?.totalDiscountOK ?? 0) > 0 ||
              (infoBooking?.totalDiscountMember ?? 0) > 0) && (
              <div className="border-bottom-light py-10">
                {isBookingPage && (infoBooking?.totalDiscountSUP ?? 0) > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="text-dark">Giảm giá tour</p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountSUP ?? 0)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
                {isBookingPage && (infoBooking?.totalDiscountOK ?? 0) > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="text-dark">
                      Mã giảm giá{" "}
                      {infoBooking?.voucherCode &&
                        `(${infoBooking?.voucherCode})`}
                    </p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountOK ?? 0)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
                {isBookingPage && (infoBooking?.totalDiscountMember ?? 0) > 0 && (
                  <div className="d-flex justify-content-between w-100">
                    <p className="text-dark">Giảm giá thành viên</p>
                    <p className="text-success fw-500">
                      -{formatCurrency(infoBooking?.totalDiscountMember ?? 0)}{" "}
                      {currentCurrency}
                    </p>
                  </div>
                )}
              </div>
            )}

            {isCreateInvoice && taxInclude && (
              <div className="d-flex justify-content-between w-100 border-bottom-light py-10">
                <p className="text-dark">Thuế và phí</p>
                <p className="text-dark fw-500">
                  {(infoBooking?.totalPayment ?? 0) > 0
                    ? formatCurrency((infoBooking?.totalPayment ?? 0) * 0.1)
                    : 0}{" "}
                  {currentCurrency}
                </p>
              </div>
            )}

            <div className="row justify-content-between py-10">
              <div className="col-auto fs-18 fw-500">Tổng thanh toán</div>
              <div className=" col-auto fs-20 fw-500 text-blue-1">
                {isBookingPage ? (
                  <>
                    {isCreateInvoice && taxInclude
                      ? `${
                          formatCurrency((infoBooking?.totalPayment ?? 0) * 1.1) || 0
                        } ${currentCurrency}`
                      : `${
                          formatCurrency(infoBooking?.totalPayment ?? 0) || 0
                        } ${currentCurrency}`}
                  </>
                ) : (
                  <>{`${formatCurrency(totalPrice) || 0} ${currentCurrency}`}</>
                )}
              </div>
            </div>
            {isBookingPage && totalPriceDiscount > 0 && (
              <div className="row justify-content-end mb-20 ml-0 pl-0">
                <span className="bg-pink-light text-blue-1 rounded-4 text-right">
                  <span className="px-5 text-truncate text-13 ">
                    Chúc mừng bạn đã tiết kiệm được
                  </span>
                  <span className="fw-bold">
                    {formatCurrency(totalPriceDiscount)} {currentCurrency}
                  </span>
                </span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default SidebarRightTour;
