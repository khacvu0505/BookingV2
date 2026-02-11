import React, { useEffect, useState } from "react";
import "./CustomCalendar.css";
import { clearSessionStorage, getDaysBetween } from "@/utils/utils";
import DateTimeCustom from "./DateTimeCustom";
import { useDispatch, useSelector } from "react-redux";
import { setTourBookingInfo } from "@/features/tour/tourSlice";
import { info_booking_tour } from "@/utils/constants";

interface CustomCalendarProps {
  locale: string;
}

const CustomCalendar = ({ locale }: CustomCalendarProps) => {
  const [dateArray, setDateArray] = useState<any[]>([]);
  const { tourBookingInfo } = useSelector((state) => state.tour);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    renderListDay(today, locale);
  }, [locale]);

  const renderListDay = (date: any, locale: string, isFirst = true) => {
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

  const changeDate = (date: string) => {
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

  const handleChooseDate = (date: string) => {
    if (dateArray.some((item) => item.key === date)) {
      changeDate(date);
    } else {
      const choseDate = new Date(date);
      renderListDay(choseDate, locale, false);
    }
  };

  return (
    <div className="d-flex gap-1 gap-md-2 justify-center flex-wrap">
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
          <div className="fw-500 text-16 lg:text-15 md:text-14">
            {item.month}
          </div>
          <div className="text-32 xl:text-30 lg:text-28 md:text-26  fw-500">
            {item.date}
          </div>
          <div className="text-16 lg:text-15 md:text-14 fw-400">{item.day}</div>
        </div>
      ))}
      <DateTimeCustom handleChooseDate={handleChooseDate} />
    </div>
  );
};

export default CustomCalendar;
