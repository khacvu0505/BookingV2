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
} from "@/utils/constants";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchServicesByRoom } from "@/features/hotel-detail/reducers";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import { useAppDispatch } from "@/store/hooks";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { useEffect, useState } from "react";
import { checkAddOnServices } from "@/api/hotel.api";
import Swal from "sweetalert2";
import { getHoldBooking, getCartSummary } from "@/api/booking.api";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";

interface AddOnItem {
  serviceID?: string;
  serviceName?: string;
  finalPrice?: number;
  count?: number;
  [key: string]: unknown;
}

interface BookingServiceItem {
  roomID?: string;
  roomName?: string;
  serviceID?: string;
  serviceName?: string;
  finalPrice?: number;
  listedPrice?: number;
  isNeedApproval?: boolean;
  source?: string;
  addOn?: AddOnItem[];
  [key: string]: unknown;
}

interface BookingSessionData {
  hotelInfo?: {
    hotelCode?: string;
    hotelName?: string;
    fromDate?: string;
    toDate?: string;
    adults?: number;
    children?: number;
    room?: number;
    [key: string]: unknown;
  };
  services?: BookingServiceItem[];
  voucherApplies?: unknown[];
  voucherCode?: string;
  totalDiscountSUP?: number;
  totalDiscountOK?: number;
  totalDiscountMember?: number;
  totalPayment?: number;
  [key: string]: unknown;
}

interface SidebarRightProps {
  holdTime?: string;
  setPromotionCode?: (code: string) => void;
  isCreateInvoice?: boolean;
}

const SidebarRight = ({
  holdTime = "",
  setPromotionCode,
  isCreateInvoice = false,
}: SidebarRightProps) => {
  const { currentCurrency } = useSelector((state) => state.app);
  const [searchParams, setSearchParams] = useQueryParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const infoBookingFromSession = getFromSessionStorage<BookingSessionData>(info_booking);
  const taxInclude = Boolean(!getFromSessionStorage(tax_include));

  const [infoBooking, setInfoBooking] = useState<BookingSessionData | null>(infoBookingFromSession);
  const fromDate = infoBooking?.hotelInfo?.fromDate ?? "";
  const toDate = infoBooking?.hotelInfo?.toDate ?? "";
  const numberNights = calculateNights(fromDate, toDate);
  const [priceAddons, setPriceAddons] = useState(0);
  const [showDetail, setShowDetail] = useState(
    new Array(infoBooking?.services?.length ?? 0).fill(true)
  );
  const [remainingTime, setRemainingTime] = useState<number | string>(
    (holdTime && calculateRemainingTime(new Date(holdTime))) || ""
  );

  const { pathname } = useLocation();
  const isBookingPage = pathname === "/booking";
  const isHotelDetailPage = pathname.includes("/hotels");
  const isAddonPage = pathname === "/addon-services";

  const hanldeChangeBookingInfo = () => {
    setInfoBooking(getFromSessionStorage<BookingSessionData>(info_booking));
  };

  // const handleEdit = (index, room) => {
  //   const newSearchParams = { ...searchParams, roomActive: index + 1 };
  //   setSearchParams(newSearchParams);
  //   dispatch(setRoomActive(index + 1));
  //   dispatch(
  //     fetchServicesByRoom({
  //       roomID: room?.roomID,
  //       roomName: room?.roomName,
  //       searchParams: newSearchParams,
  //     })
  //   );
  // };

  const handleContinue = async () => {
    if (!isBookingPage && !isAddonPage) {
      const roomActive = +searchParams.roomActive;
      const isNotFullData = infoBooking?.services?.some((item: BookingServiceItem) => !item.roomID);
      const countServiceHaveData = infoBooking?.services?.filter(
        (item: BookingServiceItem) => item.roomID
      )?.length ?? 0;
      const holdCode = getFromSessionStorage<string>(hold_code);

      if (
        roomActive < +searchParams.room &&
        isNotFullData &&
        infoBooking?.services?.[roomActive - 1]?.roomID
      ) {
        setSearchParams({
          ...searchParams,
          roomActive: countServiceHaveData + 1,
        });
        dispatch(setRoomActive(countServiceHaveData + 1));
      }

      if (!isNotFullData) {
        const data = {
          fromDate: infoBooking?.hotelInfo?.fromDate ?? "",
          toDate: infoBooking?.hotelInfo?.toDate ?? "",
          roomInfos: (infoBooking?.services ?? []).map((item: BookingServiceItem) => ({
            roomID: item.roomID,
            serviceID: item.serviceID,
          })),
        };
        try {
          getHoldBooking(
            data,
            (infoBooking?.services?.length ?? 0) > 0 &&
              infoBooking?.services?.[0]?.isNeedApproval === true
              ? `request-${new Date().getTime()}`
              : (holdCode ?? "")
          )
            .then(async (res) => {
              const isSuccess = res?.success;
              if (isSuccess) {
                setToSessionStorage(hold_code, res?.data);
                const isHaveAddons = await checkAddOnServices({
                  supplierCode: infoBooking?.hotelInfo?.hotelCode,
                });
                if (!isHaveAddons?.data) {
                  navigate("/booking");
                } else {
                  navigate("/addon-services");
                }
              } else {
                switch (res?.data) {
                  case "2":
                    Swal.fire({
                      title: "Thông báo",
                      icon: "info",
                      text: "Khách sạn đã hết phòng, vui lòng chọn khách sạn khác",
                      confirmButtonText: "Về danh sách khách sạn",
                      confirmButtonColor: "#f52549",
                      cancelButtonText: "Chọn phòng khác",
                      cancelButtonColor: "#051036",
                      showCancelButton: true,
                      allowEscapeKey: false,
                      allowEnterKey: true,
                      allowOutsideClick: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(
                          `/hotels?checkIn=${formatDate(
                            new Date()
                          )}&checkOut=${addDate(
                            new Date(),
                            3
                          )}&page=1&adults=2&children=0&room=1`
                        );
                      }
                    });
                    break;
                  case "3":
                    Swal.fire({
                      title: "Thông báo",
                      icon: "info",
                      text: "Phòng đang được giữ bởi người khác, vui lòng đặt phòng khác hoặc quay lại sau 6 phút",
                      confirmButtonText: "Đồng ý",
                      confirmButtonColor: "#f52549",
                      allowEnterKey: true,
                    });
                    break;
                  case "5":
                    Swal.fire({
                      title: "Thông báo",
                      icon: "warning",
                      text: "Bạn đã hết lượt đặt phòng trong hôm nay",
                      confirmButtonText: "Về trang chủ",
                      confirmButtonColor: "#f52549",
                      allowEscapeKey: false,
                      allowEnterKey: true,
                      allowOutsideClick: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/");
                      }
                    });
                    break;
                  default:
                    handleRenderNoti(
                      "Có lỗi xảy ra, vui lòng thử lại sau",
                      "error"
                    );
                }
              }
            })
            .catch(() => {
              handleRenderNoti("Có lỗi xảy ra, vui lòng thử lại sau", "error");
            });
        } catch (error) {
          handleRenderNoti("Có lỗi xảy ra, vui lòng thử lại sau", "error");
          throw error;
        }
      }

      if (!infoBooking?.services?.[roomActive - 1]?.roomID) {
        handleRenderNoti("Vui lòng chọn phòng", "warning");
      }
    }
    if (isAddonPage) {
      navigate("/booking");
    }
  };

  const handleDetailAddon = (indexRoom: number) => {
    setShowDetail((prev) =>
      prev.map((item: boolean, index: number) => (index === indexRoom ? !item : item))
    );
  };

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

  const hanldeClearBookingInfo = () => {
    handleSetDefaultBooking({
      hotelCode: infoBooking?.hotelInfo?.hotelCode ?? "",
      hotelName: infoBooking?.hotelInfo?.hotelName ?? "",
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
        services: infoBookingFromSession?.services?.map((item: BookingServiceItem) => ({
          ...item,
          addOn: [],
        })),
        voucherApplies: infoBookingFromSession?.voucherApplies || []
      });
      const event = new Event("triggerSearch");
      window.dispatchEvent(event);
    }
    window.addEventListener("triggerSearch", hanldeChangeBookingInfo);

    return () => {
      window.removeEventListener("triggerSearch", hanldeChangeBookingInfo);
    };
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      holdTime && setRemainingTime(calculateRemainingTime(new Date(holdTime)));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalID);
  }, [holdTime]);

  // useEffect(() => {
  //   if (typeof remainingTime === "number" && remainingTime <= 0) {
  //     Swal.fire({
  //       title: "Thông báo",
  //       icon: "warning",
  //       text: "Hết thời gian giữ phòng, vui lòng chọn lại phòng khác",
  //       confirmButtonText: "Về trang chủ",
  //       confirmButtonColor: "#f52549",
  //       allowEscapeKey: false,
  //       allowEnterKey: true,
  //       allowOutsideClick: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         clearSessionStorage(hold_code);
  //         navigate("/");
  //       }
  //     });
  //   }
  // }, [remainingTime]);

  useEffect(() => {
    if ((infoBookingFromSession?.services?.length ?? 0) > 0) {
      const addOns = infoBookingFromSession?.services?.map((item: BookingServiceItem) =>
        (item?.addOn?.length ?? 0) > 0 ? item?.addOn ?? [] : []
      ) ?? [];
      const listAddon: AddOnItem[] = ([] as AddOnItem[]).concat(...addOns);
      setPriceAddons(
        listAddon.reduce((acc: number, cur: AddOnItem) => acc + (cur?.finalPrice ?? 0) * (cur?.count ?? 0), 0)
      );
    }
  }, [infoBookingFromSession]);

  const totalPrice = useMemo(() => {
    return (
      (infoBooking?.services?.reduce(
        (acc: number, cur: BookingServiceItem) => acc + (cur?.finalPrice ?? 0) * numberNights,
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

  useEffect(() => {
    if (isBookingPage) {
      const dataRequest = {
        fromDate: infoBooking?.hotelInfo?.fromDate ?? "",
        toDate: infoBooking?.hotelInfo?.toDate ?? "",
        adults: infoBooking?.hotelInfo?.adults ?? 2,
        childrens: infoBooking?.hotelInfo?.children ?? 0,
        totalRoom: infoBooking?.hotelInfo?.room ?? 1,
        roomInfos: (infoBooking?.services ?? []).map((item: BookingServiceItem) => ({
          roomID: item.roomID,
          serviceID: item.serviceID,
          addOns: item.addOn,
        })),
      };

      getCartSummary(dataRequest)
        .then((res) => {
          if (res?.success) {
            setInfoBooking(res?.data as BookingSessionData);
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
      {!isBookingPage && !isAddonPage && (
        <aside
          className={`border-light-2 rounded-22 shadow-4  mb-10 mx-3 mx-md-0  `}
        >
          <div className="fs-18 fw-500   px-20 py-10 border-bottom-light-2">
            Tìm kiếm
          </div>
          <div className="px-20 py-20 ">
            <div className="row y-gap-20">
              <FilterBox />
            </div>
          </div>
        </aside>
      )}
      <div
        className={`is-sticky ${window.innerWidth >= 1200 && "sidebar-sticky"}`}
      >
        <aside
          className={`border-light-2 rounded-22 shadow-4 mx-3 mx-md-0 mb-3 mb-md-0`}
        >
          <div className="d-flex justify-content-between  px-15 py-15 border-bottom-light-2 w-100">
            <div className="fs-18 fw-500">Thông tin khách sạn</div>
            {isBookingPage && (
              <div className="text-end text-blue-1 fw-500 fs-20">
                {remainingTime && formatRemainingTime(remainingTime)}
              </div>
            )}
            {!isBookingPage &&
              !isAddonPage &&
              (infoBooking?.services?.length ?? 0) > 0 &&
              infoBooking?.services?.[0]?.serviceID && (
                <div
                  className="cursor-pointer"
                  onClick={hanldeClearBookingInfo}
                >
                  <i className="icon-trash text-14 text-red-1" />
                </div>
              )}
          </div>

          <div className="px-20">
            <div className="py-10">
              <div className="fw-500 fs-18">
                {infoBooking?.hotelInfo?.hotelName || ""}
              </div>
              <div className="fs-15">
                {formatStringToDate(fromDate)} ~ {formatStringToDate(toDate)}
              </div>
              <div className="fs-13">{numberNights} đêm</div>
            </div>
            <div className="border-bottom-light">
              {infoBooking?.services?.map(
                (item: BookingServiceItem, index: number) =>
                  item.roomID && (
                    <div key={index} className="border-top-light py-10">
                      <div className="row justify-content-between ">
                        <div className="col-auto fs-18 fw-500">
                          Phòng {index + 1} - {item?.roomName}
                        </div>
                        {/* {+searchParams.roomActive !== index + 1 &&
                        !isBookingPage &&
                        !isAddonPage && (
                          <button
                            className="col-auto button text-blue-1 mb-10"
                            onClick={() => handleEdit(index, item)}
                          >
                            <i className="icon icon-edit text-12 text-blue-1"></i>
                          </button>
                        )} */}
                      </div>
                      <div className="row justify-content-between mt-10">
                        <div className="col-auto">
                          {/* <div className="fs-13">{item.totalAdult} adults</div> */}
                          <div>
                            <span className="fs-13 text-blue-1">X 1 </span>
                            {item?.serviceName}
                          </div>
                        </div>
                        <div className="col-auto fs-16 fw-500">
                          {formatCurrency((item?.finalPrice ?? 0) * numberNights)}{" "}
                          {currentCurrency}
                        </div>
                      </div>
                      {infoBookingFromSession?.services &&
                        (infoBookingFromSession?.services[index]?.addOn?.length ?? 0) >
                          0 && (
                          <div className="mt-10">
                            <button
                              className="button text-13 text-blue-1 w-100 justify-content-end mb-10"
                              onClick={() => handleDetailAddon(index)}
                            >
                              {showDetail[index] ? "Ẩn" : "Chi tiết"}
                              <i className="icon-chevron-sm-down text-10 ml-5" />
                            </button>
                            {showDetail[index] && (
                              <div className="bg-gray-1 w-100 rounded px-10 py-10">
                                <div className=" text-light-1 fw-500 text-14">
                                  Dịch vụ mua thêm
                                </div>
                                {infoBookingFromSession?.services &&
                                  infoBookingFromSession?.services[
                                    index
                                  ]?.addOn?.map((addOn: AddOnItem, addOnIndex: number) => (
                                    <div key={`${addOn}${addOnIndex}`}>
                                      <div className="d-flex w-100">
                                        <div className="text-14 mr-10">
                                          <i className="icon-check text-10 text-green-2 mr-10" />
                                          {addOn?.serviceName}
                                          <span className="italic text-12 fw-500">
                                            {" "}
                                            ({formatCurrency(
                                              addOn?.finalPrice ?? 0
                                            )}{" "}
                                            {currentCurrency} )
                                          </span>
                                        </div>
                                        <div className="text-14 text-info-2 fw-500">
                                          x {addOn?.count}
                                        </div>
                                      </div>
                                      <div className="text-15 text-end fw-500">
                                        {formatCurrency(
                                          (addOn?.finalPrice ?? 0) * (addOn?.count ?? 0)
                                        )}{" "}
                                        {currentCurrency}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}
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
                    <p className="text-dark">Giảm giá từ khách sạn</p>
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
                <p className="text-dark">Thuế và phí dịch vụ khách sạn</p>
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

            {!isBookingPage && (
              <div className="button-item h-full mb-20">
                <button
                  className="button -dark-1 px-35 h-40 col-12 bg-blue-1 text-white"
                  onClick={handleContinue}
                >
                  {infoBooking?.services?.some((item: BookingServiceItem) => !item.roomID)
                    ? "Chọn phòng tiếp theo"
                    : "Đặt ngay"}
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default SidebarRight;
