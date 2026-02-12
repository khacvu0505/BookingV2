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
import type { BookingInfo } from "@/types";

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
                      title: "Thong bao",
                      icon: "info",
                      text: "Khach san da het phong, vui long chon khach san khac",
                      confirmButtonText: "Ve danh sach khach san",
                      confirmButtonColor: "#f52549",
                      cancelButtonText: "Chon phong khac",
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
                      title: "Thong bao",
                      icon: "info",
                      text: "Phong dang duoc giu boi nguoi khac, vui long dat phong khac hoac quay lai sau 6 phut",
                      confirmButtonText: "Dong y",
                      confirmButtonColor: "#f52549",
                      allowEnterKey: true,
                    });
                    break;
                  case "5":
                    Swal.fire({
                      title: "Thong bao",
                      icon: "warning",
                      text: "Ban da het luot dat phong trong hom nay",
                      confirmButtonText: "Ve trang chu",
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
                      "Co loi xay ra, vui long thu lai sau",
                      "error"
                    );
                }
              }
            })
            .catch(() => {
              handleRenderNoti("Co loi xay ra, vui long thu lai sau", "error");
            });
        } catch (error) {
          handleRenderNoti("Co loi xay ra, vui long thu lai sau", "error");
          throw error;
        }
      }

      if (!infoBooking?.services?.[roomActive - 1]?.roomID) {
        handleRenderNoti("Vui long chon phong", "warning");
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
