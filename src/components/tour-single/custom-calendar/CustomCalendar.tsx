import React, { useEffect, useState } from "react";
import "./CustomCalendar.css";
import { clearSessionStorage, getDaysBetween } from "@/utils/utils";
import DateTimeCustom from "./DateTimeCustom";
import { useDispatch, useSelector } from "react-redux";
import { setTourBookingInfo } from "@/features/tour/tourSlice";
import { info_booking_tour } from "@/utils/constants";

const CustomCalendar = ({ locale }: { locale: any }) => {
  const [dateArray, setDateArray] = useState<any[]>([]);
  const { tourBookingInfo } = useSelector((state) => state.tour);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    renderListDay(today, locale);
  }, [locale]);

  const renderListDay = (date, locale, isFirst = true) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 6);
    const listDate = getDaysBetween(date, endDate, locale);
    setDateArray(listDate);
    dispatch(
      setTourBookingInfo({
        ...tourBookingInfo,
        date: listDate[0].key,
        ServicePrices: isFirst ? tourBookingInfo?.ServicePrices : [],
        tourID: isFirst ? tourBookingInfo?.tourID : null,
        tourName: isFirst ? tourBookingInfo?.tourName : "",
      })
    );
    !isFirst && clearSessionStorage(info_booking_tour);
  };

  const changeDate = (date) => {
    dispatch(
      setTourBookingInfo({
        ...tourBookingInfo,
        date,
        ServicePrices: [],
        tourID: null,
        tourName: "",
      })
    );
    clearSessionStorage(info_booking_tour);
  };

  const handleChooseDate = (date) => {
    if (dateArray.some((item) => item.key === date)) {
      changeDate(date);
    } else {
      const choseDate = new Date(date);
      renderListDay(choseDate, locale, false);
    }
  };

  return (
    <div className="d-flex gap-2 justify-center">
      {dateArray?.map((item, index) => (
        <div
          key={item.key}
          className={`border-neutral-50  text-center w-100-px rounded-4 cursor-pointer date-item ${
            tourBookingInfo?.date === item.key ? "is-active-date" : ""
          }`}
          onClick={() => {
            clearSessionStorage(info_booking_tour);
            changeDate(item.key);
          }}
        >
          <div className="fw-500 text-16">{item.month}</div>
          <div className="text-32 fw-500">{item.date}</div>
          <div className="text-16 fw-400">{item.day}</div>
        </div>
      ))}
      <DateTimeCustom handleChooseDate={handleChooseDate} />
    </div>
  );
};

export default CustomCalendar;
