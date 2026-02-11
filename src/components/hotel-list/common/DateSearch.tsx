import useQueryParams from "@/hooks/useQueryParams";
import { formatDateCalendar } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
const DateSearch = ({ handleChangeDataFilter }: { handleChangeDataFilter?: any }) => {
  const [params] = useQueryParams();
  const { checkIn: checkInParam, checkOut: checkOutParam } = params;

  const [dates, setDates] = useState([
    new DateObject().setDay(15),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  const handleChangeDates = (dates) => {
    if (dates.length === 1) {
      handleChangeDataFilter("checkIn", formatDateCalendar(dates[0]));
    } else if (dates.length === 2) {
      handleChangeDataFilter("checkIn", formatDateCalendar(dates[0]));
      handleChangeDataFilter("checkOut", formatDateCalendar(dates[1]));
    }

    setDates(dates);
  };

  useEffect(() => {
    setDates([
      new DateObject(new Date(checkInParam)),
      new DateObject(new Date(checkOutParam)),
    ]);
  }, [checkInParam]);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={handleChangeDates}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="YYYY-MM-DD"
        weekDays={weekDays}
        months={months}
        minDate={new DateObject(new Date())}
      />
    </div>
  );
};

export default DateSearch;
