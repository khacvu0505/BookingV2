import useQueryParams from "@/hooks/useQueryParams";
import { formatDateCalendar } from "@/utils/utils";
import React, { useEffect, useMemo, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useTranslation } from "react-i18next";

const DateSearch = ({ handleChangeDataFilter }: { handleChangeDataFilter?: any }) => {
  const { t } = useTranslation();
  const [params] = useQueryParams();
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
