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
interface DateTimeCustomProps {
  handleChooseDate: (date: string) => void;
}

const DateTimeCustom = ({ handleChooseDate }: DateTimeCustomProps) => {
  const [date, setDate] = useState(new DateObject(new Date()));

  const handleChangeDate = (newValue: any) => {
    setDate(newValue);
    handleChooseDate(formatDateCalendar(newValue));
  };

  return (
    <DatePicker
      value={date}
      onChange={handleChangeDate}
      offsetY={10}
      format="YYYY-MM-DD"
      minDate={new DateObject(new Date())}
      weekDays={weekDays}
      months={months}
      render={(value: any, openCalendar: () => void) => (
        <div
          className={
            "border-neutral-50 p-10 text-center w-100-px rounded-4 cursor-pointer date-item"
          }
          onClick={openCalendar}
        >
          <div className="pt-21 pb-13">
            <i className="ri-calendar-2-fill text-30 text-primary-500"></i>
            <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
              Thêm ngày
            </p>
          </div>
        </div>
      )}
    />
  );
};

export default DateTimeCustom;
