import React, { useEffect, useState } from "react";
import "./TimeRemainning.style.scss";
import { getBookingExpired, getHoldTime } from "@/api/booking.api";
import { clearSessionStorage, getFromSessionStorage } from "@/utils/utils";
import {
  hold_code,
  info_booking,
  previous_item,
  tax_include,
  booking_id,
  create_invoice,
} from "@/utils/constants";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TimeRemainning = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [holdTime, setHoldTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(
    (holdTime && calculateRemainingTime(new Date(holdTime))) || ""
  );
  const infoBooking = getFromSessionStorage(info_booking);
  const slug = getFromSessionStorage(previous_item);
  const hotelInfo = infoBooking?.hotelInfo || {};
  function calculateRemainingTime(targetDateTime) {
    const currentTime = new Date();
    const timeDifference = targetDateTime.getTime() - currentTime.getTime();
    const remainingSeconds = Math.max(timeDifference / 1000, 0); // Ensure remaining time is not negative
    return remainingSeconds;
  }

  function formatRemainingTime(time) {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  useEffect(() => {
    const holdCode = getFromSessionStorage(hold_code);

    try {
      getHoldTime(holdCode)
        .then((res) => {
          const isSuccess = res.success;
          if (isSuccess) {
            setHoldTime(res?.data || "");
          } else {
            setHoldTime("");
            Swal.fire({
              title: t("COMMON.NOTIFICATION"),
              icon: "info",
              text: t("HOTEL_BOOKING.ROOM_EXPIRED"),
              confirmButtonText: t("HOTEL_BOOKING.BACK_HOTEL_LIST"),
              confirmButtonColor: "#f52549",
              cancelButtonText: t("HOTEL_BOOKING.CHOOSE_ANOTHER_ROOM"),
              cancelButtonColor: "#13bbc3",
              showCancelButton: true,
              allowEscapeKey: false,
              allowEnterKey: true,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                clearSessionStorage(hold_code);
                clearSessionStorage(info_booking);
                clearSessionStorage(previous_item);
                clearSessionStorage(tax_include);
                clearSessionStorage(booking_id);
                clearSessionStorage(create_invoice);
                navigate("/hotels");
                return;
              }
              if (infoBooking && slug) {
                clearSessionStorage(hold_code);
                clearSessionStorage(info_booking);
                clearSessionStorage(previous_item);
                clearSessionStorage(tax_include);
                clearSessionStorage(booking_id);
                clearSessionStorage(create_invoice);
                navigate(
                  `${slug}?checkIn=${hotelInfo?.fromDate}&checkOut=${hotelInfo?.toDate}&adults=${hotelInfo?.adults}&children=${hotelInfo?.children}&room=${hotelInfo?.room}`
                );
              } else {
                clearSessionStorage(hold_code);
                clearSessionStorage(info_booking);
                clearSessionStorage(previous_item);
                clearSessionStorage(tax_include);
                clearSessionStorage(booking_id);
                clearSessionStorage(create_invoice);
                navigate("/hotels");
              }
            });
          }
        })
        .catch(() => {
          setHoldTime("");
        });
    } catch (error) {
      handleRenderNoti(t("HOTEL_BOOKING.PLEASE_TRY_AGAIN"), "error");
      throw error;
    }

    return () => {
      getBookingExpired(holdCode);
    };
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const intervalID = setInterval(() => {
      holdTime && setRemainingTime(calculateRemainingTime(new Date(holdTime)));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    // eslint-disable-next-line no-undef
    return () => clearInterval(intervalID);
  }, [holdTime]);

  useEffect(() => {
    if (typeof remainingTime === "number" && remainingTime <= 0) {
      Swal.fire({
        title: t("COMMON.NOTIFICATION"),
        imageUrl: "/images/Booking/icon-info.png", // Đường dẫn đến hình ảnh
        imageWidth: 72, // Độ rộng của hình ảnh (tùy chỉnh)
        imageHeight: 72, // Độ cao của hình ảnh (tùy chỉnh)
        imageAlt: "Custom icon", // Văn bản thay thế nếu không hiển thị được hình ảnh
        text: t("HOTEL_BOOKING.ROOM_EXPIRED"),
        confirmButtonText: t("HOTEL_BOOKING.BACK_HOTEL_LIST"),
        confirmButtonColor: "#00AEED",
        allowEscapeKey: false,
        allowEnterKey: true,
        allowOutsideClick: false,
        position: "top",
        customClass: {
          popup: "mt-30", // Thêm class để tùy chỉnh khoảng cách
        },
      }).then((result) => {
        if (result.isConfirmed) {
          clearSessionStorage(hold_code);
          clearSessionStorage(info_booking);
          clearSessionStorage(previous_item);
          clearSessionStorage(tax_include);
          clearSessionStorage(booking_id);
          clearSessionStorage(create_invoice);
          navigate("/");
        }
      });
    }
  }, [remainingTime]);

  return (
    <div className="time_remainning xl:mt-20">
      <p className="time_remainning-text text-16 lg:text-15 md:text-14 fw-600">
        <span>{t("HOTEL_BOOKING.TIME_REMAINING")}</span>
        <span> {remainingTime && formatRemainingTime(remainingTime)}</span>
      </p>
    </div>
  );
};

export default TimeRemainning;
