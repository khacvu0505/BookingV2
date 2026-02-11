import { BREAKPOINT_LG, defaultDateRange } from "@/utils/constants";
import useWindowSize from "@/utils/useWindowSize";
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
interface DateSearchProps {
  handleChangeValue: (value: Record<string, any>) => void;
  defaultDate?: any;
  value?: any;
}

const DateSearch = ({
  handleChangeValue,
  defaultDate = defaultDateRange,
  value,
}: DateSearchProps) => {
  const isDesktop = useWindowSize().width > BREAKPOINT_LG;
  const [dates, setDates] = useState(defaultDate);

  const handleChangeDate = (value: any) => {
    if (!value || value?.length <= 1) return;
    setDates(value);
    handleChangeValue({
      checkIn: formatDateCalendar(value[0]),
      checkOut: formatDateCalendar(value[1]),
    });
  };

  useEffect(() => {
    if (value) {
      setDates(value);
    }
  }, [value]);

  const attributesActive = isDesktop
    ? {}
    : {
        "data-bs-toggle": "offcanvas",
        "aria-controls": "offcanvas-date-search",
        "data-bs-target": "#offcanvas-date-search",
      };

  return (
    <div className="custom_dual_datepicker" {...attributesActive}>
      <DatePicker
        inputClass="custom_input-picker text-18 xl:text-16 lg:text-14 text-neutral-800 fw-700"
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
        readOnly={!isDesktop}
      />
    </div>
  );
};

export default memo(DateSearch);
