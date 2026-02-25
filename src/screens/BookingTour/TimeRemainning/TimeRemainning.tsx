import React, { useEffect, useRef, useState } from "react";
import "./TimeRemainning.style.scss";
import { clearSessionStorage, getFromSessionStorage } from "@/utils/utils";
import { hold_code, booking_id, info_booking_tour, tax_include, create_invoice } from "@/utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getBookingExpired, getHoldTime } from "@/api/booking.api";
import { useQuery } from "@tanstack/react-query";
import { bookingKeys } from "@/lib/query-keys";
import { useTranslation } from "react-i18next";

const TimeRemainning = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState<number | string>("");
  const holdCode = getFromSessionStorage(hold_code);
  const holdCodeRef = useRef(holdCode);

  function formatRemainingTime(remainingTime) {
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = Math.floor(remainingTime % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function calculateRemainingTime(targetDateTime) {
    const currentTime = new Date();
    const timeDifference = targetDateTime.getTime() - currentTime.getTime();
    const remainingSeconds = Math.max(timeDifference / 1000, 0);
    return remainingSeconds;
  }

  const { data: holdTime = "" } = useQuery({
    queryKey: [...bookingKeys.all, "holdTimeTour", holdCode],
    queryFn: async () => {
      const res = await getHoldTime(holdCode);
      if (res?.success) {
        return res?.data || "";
      }
      Swal.fire({
        title: t("COMMON.NOTIFICATION"),
        icon: "info",
        text: t("COMMON.TOUR_HOLD_EXPIRED"),
        confirmButtonText: t("COMMON.BACK_TO_TOUR_LIST"),
        confirmButtonColor: "#f52549",
        cancelButtonText: t("COMMON.CHOOSE_ANOTHER_TOUR"),
        cancelButtonColor: "#13bbc3",
        showCancelButton: true,
        allowEscapeKey: false,
        allowEnterKey: true,
        allowOutsideClick: false,
      }).then((result) => {
        clearSessionStorage(hold_code);
        clearSessionStorage(booking_id);
        clearSessionStorage(info_booking_tour);
        clearSessionStorage(tax_include);
        clearSessionStorage(create_invoice);
        if (result.isConfirmed) {
          navigate("/tour");
        } else {
          navigate(-1);
        }
      });
      return "";
    },
    enabled: !!holdCode,
    retry: false,
    staleTime: Infinity,
  });

  // Cleanup: expire booking on unmount
  useEffect(() => {
    return () => {
      if (holdCodeRef.current) {
        getBookingExpired(holdCodeRef.current);
      }
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
        imageUrl: "/images/Booking/icon-info.png",
        imageWidth: 72,
        imageHeight: 72,
        imageAlt: "Custom icon",
        text: t("COMMON.TOUR_HOLD_TIMEOUT"),
        confirmButtonText: t("COMMON.BACK_TO_HOMEPAGE"),
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
          clearSessionStorage(booking_id);
          clearSessionStorage(info_booking_tour);
          clearSessionStorage(tax_include);
          clearSessionStorage(create_invoice);
          navigate("/");
        }
      });
    }
  }, [remainingTime]);

  return (
    <div className="time_remainning xl:mt-20">
      <p className="time_remainning-text text-16 lg:text-15 md:text-14 fw-600">
        <span>{t("COMMON.TIME_REMAINING")}</span>
        <span> {remainingTime && formatRemainingTime(remainingTime)}</span>
      </p>
    </div>
  );
};

export default TimeRemainning;
