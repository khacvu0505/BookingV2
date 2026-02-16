import { BREAKPOINT_LG, defaultDateRange } from "@/utils/constants";
import useWindowSize from "@/utils/useWindowSize";
import { formatDateCalendar } from "@/utils/utils";
import React, { memo, useEffect, useMemo, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const isDesktop = useWindowSize().width > BREAKPOINT_LG;
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
