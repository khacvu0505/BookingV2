import useQueryParams from "@/hooks/useQueryParams";
import React, { forwardRef, useImperativeHandle, useState } from "react";
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

const DateSearch = (_, ref) => {
  const [searchParams, setSearchParams] = useQueryParams();
  const today = new DateObject(new Date());
  const [dates, setDates] = useState([
    new DateObject(new Date(searchParams.checkIn) || today),
    new DateObject(new Date(searchParams.checkOut) || today),
  ]);

  const handleChangeDate = (value) => {
    setDates(value);
  };

  useImperativeHandle(
    ref,
    () => ({
      dates,
    }),
    [dates]
  );

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker  cursor-pointer"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={handleChangeDate}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="YYYY-MM-DD"
        minDate={new DateObject(new Date())}
        editable={false}
        weekDays={weekDays}
        months={months}
      />
    </div>
  );
};

export default forwardRef(DateSearch);
