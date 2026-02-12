import React, { useEffect, useRef, useState } from "react";
import "./TimeRemainning.style.scss";
import { clearSessionStorage, getFromSessionStorage } from "@/utils/utils";
import { hold_code, booking_id, info_booking_tour, tax_include, create_invoice } from "@/utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getBookingExpired, getHoldTime } from "@/api/booking.api";
import { useQuery } from "@tanstack/react-query";
import { bookingKeys } from "@/lib/query-keys";

const TimeRemainning = () => {
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
        title: "Thông báo",
        icon: "info",
        text: "Giữ tour đã hết hạn",
        confirmButtonText: "Về danh sách tour",
        confirmButtonColor: "#f52549",
        cancelButtonText: "Chọn tour khác",
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
        title: "Thông báo",
        imageUrl: "/images/Booking/icon-info.png", // Đường dẫn đến hình ảnh
        imageWidth: 72, // Độ rộng của hình ảnh (tùy chỉnh)
        imageHeight: 72, // Độ cao của hình ảnh (tùy chỉnh)
        imageAlt: "Custom icon", // Văn bản thay thế nếu không hiển thị được hình ảnh
        text: "Hết thời gian giữ tour, vui lòng lựa chọn tour khác",
        confirmButtonText: "Về trang chủ",
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
        <span>Thời gian còn lại:</span>
        <span> {remainingTime && formatRemainingTime(remainingTime)}</span>
      </p>
    </div>
  );
};

export default TimeRemainning;
