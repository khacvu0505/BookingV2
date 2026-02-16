import React, { useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";

const TourPrices = ({ tourPrices }) => {
  const { t } = useTranslation();
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
        return <p className="text-14 fw-400">{t("COMMON.OVER_140CM")}</p>;
      case "Child":
        return <p className="text-14 fw-400">{t("COMMON.FROM_100_TO_140CM")}</p>;
      case "Old":
        return <p className="text-14 fw-400">{t("COMMON.OVER_60_YEARS")}</p>;
      default:
        break;
    }
  };

  const renderTypePerson = (typePersonName) => {
    switch (typePersonName) {
      case "Adult":
        return t("COMMON.ADULT");
      case "Child":
        return t("COMMON.CHILD");
      case "Old":
        return t("COMMON.OLD_PERSON");
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
                  title: t("COMMON.NOTIFICATION"),
                  icon: "info",
                  text: t("COMMON.TOUR_SOLD_OUT"),
                  confirmButtonText: t("COMMON.BACK_TO_TOUR_LIST"),
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
                  title: t("COMMON.NOTIFICATION"),
                  icon: "info",
                  text: t("COMMON.TOUR_HELD_BY_ANOTHER"),
                  confirmButtonText: t("COMMON.AGREE"),
                  confirmButtonColor: "#f52549",
                  allowEnterKey: true,
                });
                break;
              case "5":
                Swal.fire({
                  title: t("COMMON.NOTIFICATION"),
                  icon: "warning",
                  text: t("COMMON.TOUR_BOOKING_LIMIT"),
                  confirmButtonText: t("COMMON.BACK_TO_HOMEPAGE"),
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
                  t("COMMON.ERROR_TRY_AGAIN"),
                  "error"
                );
            }
          }
        })
        .catch(() => {
          handleRenderNoti(t("COMMON.ERROR_TRY_AGAIN"), "error");
        });
    } catch (error) {
      handleRenderNoti(t("COMMON.ERROR_TRY_AGAIN"), "error");
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
                {renderTypePerson(item?.serviceName) || item?.serviceName}
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
              <p className="text-16 lg:text-14 fw-600 ">{t("COMMON.TOTAL_PRICE")}</p>
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
            {t("COMMON.BOOK_NOW")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourPrices;
