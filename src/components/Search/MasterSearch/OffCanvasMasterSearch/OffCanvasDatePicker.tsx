import OffCanvasComponent from "@/components/OffCanvas/OffCanvasComponent";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "@/features/app/appSlice";
import { Calendar, DateObject } from "react-multi-date-picker";
import "./OffCanvasMasterSearch.styles.scss";
import {
  calculateNights,
  formatDateCalendar,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { info_booking } from "@/utils/constants";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import useQueryParams from "@/hooks/useQueryParams";

const OffCanvasLocation = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useQueryParams();
  const { searchValue } = useSelector((state) => state.app);

  const [currentDate, setCurrentDate] = useState({
    checkIn: searchValue.checkIn,
    checkOut: searchValue.checkOut,
  });
  const calendarRef = useRef<any>(null);
  const offcanvasRef = useRef<any>(null);
  const { t } = useTranslation();

  const handleChangeValue = (value: Record<string, any>) => {
    dispatch(setSearchValue(value));
    if (Object.keys(searchParams).includes("checkIn")) {
      setSearchParams({
        ...searchParams,
        checkIn: value.checkIn,
        checkOut: value.checkOut,
      });
      const infoBooking = getFromSessionStorage(info_booking) as Record<string, any> | null;
      if (infoBooking) {
        const valueToSetLocal = {
          ...infoBooking,
          hotelInfo: {
            ...infoBooking.hotelInfo,
            fromDate: value.checkIn,
            toDate: value.checkOut,
          },
        };
        setToSessionStorage(info_booking, valueToSetLocal);
      }
    }
  };

  const handleChangeDate = (value: any) => {
    if (!value || value?.length <= 1) return;
    setCurrentDate({
      checkIn: formatDateCalendar(value[0]),
      checkOut: formatDateCalendar(value[1]),
    });
  };

  useEffect(() => {
    const offcanvasElement = offcanvasRef.current.offcanvasRef?.current;

    const handleShown = () => {
      if (calendarRef.current) {
        const activeDate = calendarRef.current.querySelector(".start");
        if (activeDate) {
          activeDate.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      setCurrentDate({
        checkIn: searchValue.checkIn,
        checkOut: searchValue.checkOut,
      });
    };

    if (offcanvasElement) {
      offcanvasElement.addEventListener("shown.bs.offcanvas", handleShown);
    }

    return () => {
      if (offcanvasElement) {
        offcanvasElement.removeEventListener("shown.bs.offcanvas", handleShown);
      }
    };
  }, [searchValue.checkIn, searchValue.checkOut]);

  return (
    <OffCanvasComponent
      id="offcanvas-date-search"
      header={<div className="text-16 text-center w-100 fw-500">{t("COMMON.SELECT_DATE")}</div>}
      footer={
        <Button
          data-bs-dismiss="offcanvas"
          className="text-center w-100"
          onClick={() => handleChangeValue(currentDate)}
        >
          {t("COMMON.OK")}{" "}
          {currentDate?.checkIn &&
            currentDate?.checkOut &&
            `(${calculateNights(
              currentDate?.checkIn,
              currentDate?.checkOut
            )} ${t("COMMON.NIGHT")})`}
        </Button>
      }
      isShowFooter
      ref={offcanvasRef}
    >
      <Calendar
        ref={calendarRef}
        range
        value={[
          new DateObject(currentDate.checkIn),
          new DateObject(currentDate.checkOut),
        ]}
        minDate={new DateObject(new Date())}
        numberOfMonths={12}
        fullYear
        className="calendarContainer"
        onChange={handleChangeDate}
      />
    </OffCanvasComponent>
  );
};

export default OffCanvasLocation;
