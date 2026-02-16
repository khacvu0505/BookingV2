import React from "react";
import Button from "@/components/Button";
import { hold_code, info_booking, previous_item } from "@/utils/constants";
import {
  addDate,
  formatDate,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import { useDispatch } from "react-redux";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import { getHoldBooking } from "@/api/booking.api";
import { checkAddOnServices } from "@/api/hotel.api";
import Swal from "sweetalert2";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import useStorageListener from "@/hooks/useStorageListener";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface BookNowButtonProps {
  isOffcanvas?: boolean;
}

const BookNowButton = ({ isOffcanvas = false }: BookNowButtonProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useQueryParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isBookingPage = pathname === "/booking";
  const isAddonPage = pathname === "/addon-services";
  const infoBooking = useStorageListener<Record<string, any>>(info_booking);

  const handleContinue = async () => {
    if (!isBookingPage && !isAddonPage) {
      const roomActive = +searchParams.roomActive;
      const isNotFullData = infoBooking?.services?.some((item: any) => !item.roomID);
      const countServiceHaveData = infoBooking?.services?.filter(
        (item: any) => item.roomID
      )?.length;
      const holdCode = getFromSessionStorage(hold_code);

      if (
        roomActive < +searchParams.room &&
        isNotFullData &&
        infoBooking?.services?.[roomActive - 1]?.roomID
      ) {
        setSearchParams({
          ...searchParams,
          roomActive: (countServiceHaveData || 0) + 1,
        });
        dispatch(setRoomActive((countServiceHaveData || 0) + 1));
      }

      if (!isNotFullData) {
        const data = {
          fromDate: infoBooking?.hotelInfo?.fromDate,
          toDate: infoBooking?.hotelInfo?.toDate,
          roomInfos: infoBooking?.services?.map((item: any) => ({
            roomID: item.roomID,
            serviceID: item.serviceID,
          })),
        };
        try {
          getHoldBooking(
            data,
            infoBooking?.services?.length > 0 &&
              infoBooking?.services?.[0]?.isNeedApproval === true
              ? `request-${new Date().getTime()}`
              : holdCode
          )
            .then(async (res: any) => {
              const isSuccess = res?.success;
              if (isSuccess) {
                setToSessionStorage(hold_code, res?.data);
                const isHaveAddons = await checkAddOnServices({
                  supplierCode: infoBooking?.hotelInfo?.hotelCode,
                });
                setToSessionStorage(previous_item, pathname);
                if (!(isHaveAddons as any)?.data) {
                  navigate("/booking");
                } else {
                  navigate("/addon-services");
                }
              } else {
                switch (res?.data) {
                  case "2":
                    Swal.fire({
                      title: t("COMMON.NOTIFICATION"),
                      icon: "info",
                      text: t("COMMON.HOTEL_SOLD_OUT"),
                      confirmButtonText: t("COMMON.BACK_TO_HOTEL_LIST"),
                      confirmButtonColor: "#f52549",
                      cancelButtonText: t("COMMON.CHOOSE_ROOM_PLEASE"),
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
                      title: t("COMMON.NOTIFICATION"),
                      icon: "info",
                      text: t("COMMON.ROOM_HELD_BY_ANOTHER"),
                      confirmButtonText: t("COMMON.AGREE"),
                      confirmButtonColor: "#f52549",
                      allowEnterKey: true,
                    });
                    break;
                  case "5":
                    Swal.fire({
                      title: t("COMMON.NOTIFICATION"),
                      icon: "warning",
                      text: t("COMMON.BOOKING_LIMIT_REACHED"),
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
      }

      if (!infoBooking?.services?.[roomActive - 1]?.roomID) {
        handleRenderNoti(t("COMMON.CHOOSE_ROOM_PLEASE"), "warning");
      }
    }
    if (isAddonPage) {
      navigate("/booking");
    }
  };

  return (
    <>
      {!isBookingPage && (
        <Button
          data-bs-dismiss="offcanvas"
          onClick={handleContinue}
          className={classNames("w-100 mb-20", {
            "sticky-button-book-now": isOffcanvas,
          })}
        >
          {infoBooking?.services?.some((item: any) => !item.roomID)
            ? t("HOTEL_BOOKING.CHOOSE_NEXT_ROOM")
            : t("HOTEL_BOOKING.BOOKING_NOW")}
        </Button>
      )}
    </>
  );
};

export default BookNowButton;
