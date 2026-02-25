import { formatDateCalendar } from "@/utils/utils";
import React, { useMemo, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useTranslation } from "react-i18next";

interface DateTimeCustomProps {
  handleChooseDate: (date: string) => void;
}

const DateTimeCustom = ({ handleChooseDate }: DateTimeCustomProps) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(new DateObject(new Date()));
  const weekDays = useMemo(() => [
    t("COMMON.WEEKDAY_SUN"), t("COMMON.WEEKDAY_MON"), t("COMMON.WEEKDAY_TUE"),
    t("COMMON.WEEKDAY_WED"), t("COMMON.WEEKDAY_THU"), t("COMMON.WEEKDAY_FRI"),
    t("COMMON.WEEKDAY_SAT"),
  ], [t]);
  const months = useMemo(() => [
    t("COMMON.MONTH_1"), t("COMMON.MONTH_2"), t("COMMON.MONTH_3"),
    t("COMMON.MONTH_4"), t("COMMON.MONTH_5"), t("COMMON.MONTH_6"),
    t("COMMON.MONTH_7"), t("COMMON.MONTH_8"), t("COMMON.MONTH_9"),
    t("COMMON.MONTH_10"), t("COMMON.MONTH_11"), t("COMMON.MONTH_12"),
  ], [t]);

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
              {t("COMMON.ADD_DATE")}
            </p>
          </div>
        </div>
      )}
    />
  );
};

export default DateTimeCustom;
