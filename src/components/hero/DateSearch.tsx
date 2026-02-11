import { defaultDateRange } from "@/utils/constants";
import { formatDateCalendar } from "@/utils/utils";
import React, { memo, useEffect, useState } from "react";
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
const DateSearch = ({ handleChangeValue }: { handleChangeValue?: any }) => {
  const [dates, setDates] = useState(defaultDateRange);

  const handleChangeDate = (value) => {
    setDates(value);
    handleChangeValue({
      name: "checkIn",
      value: formatDateCalendar(value[0]),
    });
    handleChangeValue({
      name: "checkOut",
      value: formatDateCalendar(value[1]),
    });
  };

  useEffect(() => {
    handleChangeValue({
      name: "checkIn",
      value: formatDateCalendar(dates[0]),
    });
    handleChangeValue({
      name: "checkOut",
      value: formatDateCalendar(dates[1]),
    });
  }, []);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={handleChangeDate}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="YYYY-MM-DD"
        minDate={new DateObject(new Date())}
        weekDays={weekDays}
        months={months}
      />
    </div>
  );
};

export default memo(DateSearch);
