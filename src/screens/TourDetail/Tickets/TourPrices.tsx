import React, { useMemo, useState } from "react";
import { personType } from "@/types/types";
import {
  formatCurrency,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setTourBookingInfo } from "@/features/tour/tourSlice";
import { useNavigate } from "react-router-dom";
import { getHoldBookingTour } from "@/api/booking.api";
import Swal from "sweetalert2";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { hold_code, info_booking_tour } from "@/utils/constants";
import NumberControl from "./NumberControl";
import Button from "@/components/Button";
import { checkAddOnServices } from "@/api/hotel.api";

const TourPrices = ({ tourPrices }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDetailPrices, setShowDetailPrices] = useState(false);
  const { tourBookingInfo } = useSelector((state) => state.tour);
  const { currentCurrency } = useSelector((state) => state.app);

  const renderNumberControl = (serviceID, position) => {
    const service = tourBookingInfo?.ServicePrices?.find(
      (ser) => serviceID === ser?.serviceID
    );

    if (service && service?.serviceID === serviceID) {
      return (
        <NumberControl
          count={service?.quantity}
          setCount={(nextCount) =>
            dispatch(
              setTourBookingInfo({
                ...tourBookingInfo,
                ServicePrices: tourBookingInfo?.ServicePrices.map((item) =>
                  item.serviceID === serviceID
                    ? { ...item, quantity: nextCount }
                    : item
                ),
              })
            )
          }
          maxQuantity={service?.maxQuantity}
          allowZero={position === 0 ? false : true}
        />
      );
    }
  };

  const renderCondition = (typePersonName) => {
    switch (typePersonName) {
      case "Adult":
        return <p className="text-14 fw-400">Trên 140 cm</p>;
      case "Child":
        return <p className="text-14 fw-400">Từ 100 - 140cm</p>;
      case "Old":
        return <p className="text-14 fw-400">Trên 60 tuổi</p>;
      default:
        break;
    }
  };

  const renderTypePerson = (typePersonName) => {
    switch (typePersonName) {
      case "Adult":
        return "Người lớn";
      case "Child":
        return "Trẻ em";
      case "Old":
        return "Người già";
      default:
        break;
    }
  };

  const renderPrices = useMemo(() => {
    const sum = tourBookingInfo?.ServicePrices.reduce((acc, cur) => {
      return acc + cur.quantity * cur.finalPrice;
    }, 0);

    return formatCurrency(sum);
  }, [tourBookingInfo?.ServicePrices]);

  const handleBookTicket = () => {
    const holdCode = getFromSessionStorage(hold_code);
    const data = {
      date: tourBookingInfo?.date,
      tourID: tourBookingInfo?.tourID,
      ServicePrices:
        tourBookingInfo?.ServicePrices?.map((item) => ({
          serviceID: item?.serviceID,
          quantity: item?.quantity || 0,
        })) || [],
    };
    try {
      getHoldBookingTour(
        data,
        tourBookingInfo?.isNeedApproval === true
          ? `request-${new Date().getTime()}`
          : holdCode
      )
        .then(async (res) => {
          const isSuccess = res?.success;
          if (isSuccess) {
            setToSessionStorage(hold_code, res?.data);
            setToSessionStorage(info_booking_tour, tourBookingInfo);
            const isHaveAddons = await checkAddOnServices({
              supplierCode: tourBookingInfo?.supplierCode,
            });
            if (!isHaveAddons?.data) {
              navigate("/booking-tour");
            } else {
              navigate("/addon-services-tour");
            }
          } else {
            switch (res?.data) {
              case "2":
                Swal.fire({
                  title: "Thông báo",
                  icon: "info",
                  text: "Tour đã hết số lượng, vui lòng chọn tour khác",
                  confirmButtonText: "Về danh sách Tour",
                  confirmButtonColor: "#f52549",
                  // cancelButtonText: "Chọn tour khác",
                  // cancelButtonColor: "#051036",
                  // showCancelButton: true,
                  allowEscapeKey: false,
                  allowEnterKey: true,
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    navigate(`/tour`);
                  }
                });
                break;
              case "3":
                Swal.fire({
                  title: "Thông báo",
                  icon: "info",
                  text: "Tour đang được giữ bởi người khác, vui lòng đặt tour khác hoặc quay lại sau 6 phút",
                  confirmButtonText: "Đồng ý",
                  confirmButtonColor: "#f52549",
                  allowEnterKey: true,
                });
                break;
              case "5":
                Swal.fire({
                  title: "Thông báo",
                  icon: "warning",
                  text: "Bạn đã hết lượt đặt tour trong hôm nay",
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
  };

  return (
    <div className="px-20 lg:px-15 lg:pb-15 lg:pt-5 py-20 ">
      <div style={{ background: "#FAFAFA" }} className="rounded-4">
        {tourPrices?.map((item, idx) => (
          <div
            key={item.serviceID}
            className="pb-20 lg:pb-10  px-20 lg:px-15  d-flex justify-content-between align-items-center border-bottom-light"
          >
            <div className="mt-2">
              <p className="text-16 lg:text-14 fw-400 text-neutral-500">
                {personType[item?.serviceName] || item?.serviceName}
              </p>
              <h3 className="text-16 lg:text-14 fw-500">
                {formatCurrency(item?.finalPrice)} {currentCurrency}
              </h3>
              {renderCondition(item?.serviceName)}
            </div>
            {renderNumberControl(item?.serviceID, idx)}
          </div>
        ))}

        <div className="lg:d-block d-flex justify-content-between align-items-end px-20 lg:px-15 pb-20 lg:pb-15">
          <div>
            <div className="d-flex align-items-center mt-12">
              <p className="text-16 lg:text-14 fw-600 ">Tổng giá tiền</p>
              <span
                className="ml-2 text-dark cursor-pointer"
                onClick={() => setShowDetailPrices(!showDetailPrices)}
              >
                {!showDetailPrices && (
                  <i className="ri-arrow-up-s-line text-20 "></i>
                )}
                {showDetailPrices && (
                  <i className="ri-arrow-down-s-line text-20 "></i>
                )}
              </span>
            </div>
            {showDetailPrices && (
              <div className="d-lg-flex justify-content-between align-items-end w-100">
                <div>
                  {tourBookingInfo?.ServicePrices.map((item) => {
                    if (item?.quantity > 0) {
                      return (
                        <div
                          className="d-flex justify-content-between"
                          key={item.serviceID}
                        >
                          <p className="text-16 lg:text-14 fw-400 text-primary-500 mr-16 lg:mr-10">
                            {renderTypePerson(item?.serviceName)}( x
                            {item?.quantity} )
                          </p>
                          <div className="text-16 lg:text-14 fw-400 text-neutral-500">
                            {formatCurrency(item?.finalPrice * item?.quantity)}{" "}
                            {currentCurrency}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
            <h2 className="text-24 lg:text-20 fw-500 text-primary-500 mt-8">
              {renderPrices} {currentCurrency}{" "}
            </h2>
          </div>

          <Button
            onClick={handleBookTicket}
            disabled={
              !tourBookingInfo?.ServicePrices?.some(
                (item) => item?.quantity > 0
              )
            }
            className="lg:mt-10 lg:w-1/1"
          >
            Đặt ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourPrices;
