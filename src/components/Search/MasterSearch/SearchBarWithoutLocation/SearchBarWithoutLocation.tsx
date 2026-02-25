import DateSearch from "@/components/Form/DateSearch";
import React from "react";
import "../MasterSearch.styles.scss";
import Button from "@/components/Button";
import classNames from "classnames";
import GuestSearch from "@/components/Form/GuestSearch";
import {
  defaultDateRange,
  defaultServices,
  info_booking,
} from "@/utils/constants";
import {
  clearSessionStorage,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { DateObject } from "react-multi-date-picker";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSearchValue } from "@/features/app/appSlice";

const SearchBarWithoutLocation = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useQueryParams();
  const { searchValue } = useSelector((state) => state.app);
  // const [searchValue, setSearchValue] = useState({
  //   checkIn: searchParams?.checkIn || "",
  //   checkOut: searchParams?.checkOut || "",
  //   adults: +searchParams?.adults || 2,
  //   children: +searchParams?.children || 0,
  //   room: +searchParams?.room || 1,
  // });
  const dispatch = useDispatch();

  const handleChangeValue = (values: Record<string, any>) => {
    dispatch(setSearchValue(values));
  };

  const handleSearch = () => {
    const infoBooking = getFromSessionStorage(info_booking) as Record<string, any> | null;

    const hotelInfo = infoBooking?.hotelInfo;

    const rooms = searchValue.room;

    const defaultGuest = {
      room: rooms,
      adults: searchValue.adults,
      children: searchValue.children,
    };

    const defaultParams = {
      fromDate: searchValue.checkIn,
      toDate: searchValue.checkOut,
      ...defaultGuest,
    };
    const dataFilterToSession = defaultParams;

    const dataFilterToParams = {
      checkIn: searchValue.checkIn,
      checkOut: searchValue.checkOut,
      ...defaultGuest,
    };

    const params = {
      supplierCode: hotelInfo?.hotelCode,
      fromDate: searchValue.checkIn,
      toDate: searchValue.checkOut,
      adult: searchValue.adults,
      children: searchValue.children,
      totalRoom: rooms,
    };

    // clear data sidebar cart and set default after triggering search
    clearSessionStorage(info_booking);
    const servicesDefault = defaultServices(rooms);
    setToSessionStorage(info_booking, {
      hotelInfo: {
        hotelCode: hotelInfo?.hotelCode,
        hotelName: hotelInfo?.hotelName,
        ...dataFilterToSession,
      },
      services: servicesDefault,
    });
    setSearchParams({
      ...searchParams,
      ...dataFilterToParams,
      roomActive: 1,
    } as any);
    dispatch(setRoomActive(1));

    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);
  };

  return (
    <div
      className={classNames(
        "bg-white px-24 xl:px-20 xl:py-20 lg:px-15 lg:py-15 py-24 rounded-16 w-100 searchBar custom-border "
      )}
    >
      <div className="row">
        <div className="col-12 col-lg-5  js-form-dd js-calendar border-right-light ">
          <div>
            <h4 className="text-18 xl:text-16 lg:text-14 fw-400 text-neutral-400">
              {t("HOTEL.CHECK_IN")} - {t("HOTEL.CHECK_OUT")}
            </h4>
            <DateSearch
              handleChangeValue={handleChangeValue}
              value={
                searchValue?.checkIn
                  ? [
                      new DateObject(searchValue?.checkIn),
                      new DateObject(searchValue?.checkOut),
                    ]
                  : defaultDateRange
              }
            />
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <GuestSearch
            handleChangeValue={handleChangeValue}
            defaultValue={{
              adults: +searchParams.adults,
              children: +searchParams.children,
              room: +searchParams.room,
            }}
          />
        </div>

        <div className="col-12 col-lg-2 mt-10 xl:pl-0 lg:pl-15">
          <div className="button-item d-flex justify-end ">
            <Button onClick={handleSearch} className="w-100">
              <i className="icon-search text-20 xl:text-18 lg:text-16 mr-10 xl:mr-5" />
              {t("COMMON.SEARCH")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarWithoutLocation;
