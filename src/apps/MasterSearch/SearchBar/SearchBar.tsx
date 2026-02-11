import DateSearch from "@/apps/DateSearch";
import React, { useEffect } from "react";
import LocationSearch from "./LocationSearch";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import "../MasterSearch.styles.scss";
import Button from "@/apps/Button";
import classNames from "classnames";
import GuestSearch from "@/apps/GuestSearch";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { clearSessionStorage } from "@/utils/utils";
import {
  defaultDateRange,
  info_booking,
  info_booking_tour,
} from "@/utils/constants";
import { getRegions } from "@/api/category.api";
import { useDispatch, useSelector } from "react-redux";
import { setRegions } from "@/features/hotel-list/hotelSlice";
import { setSearchValue } from "@/features/app/appSlice";
import { DateObject } from "react-multi-date-picker";
import useQueryParams from "@/hooks/useQueryParams";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  activeTab?: number;
  showTab?: boolean;
  type?: string;
}

const SearchBar = ({ activeTab, showTab, type = "hotel" }: SearchBarProps) => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchValue } = useSelector((state) => state.app);

  useEffect(() => {
    getRegions()
      .then((res: any) => {
        dispatch(setRegions(res.data));
      })
      .catch(() => {
        dispatch(setRegions([]));
      });
  }, []);

  const handleChangeValue = (value: Record<string, any>) => {
    dispatch(setSearchValue(value));
  };

  const handleSearchInfo = () => {
    if (!searchValue.location) {
      handleRenderNoti("Vui long chon dia diem", "error");
      return;
    }

    switch (activeTab) {
      case 1: // khachsan
        clearSessionStorage(info_booking);
        if (type === "hotel") {
          return navigate({
            pathname: `/hotels/${searchValue.slug}`,
            search: createSearchParams({
              location: searchValue.location || "DN",
              checkIn: searchValue.checkIn,
              checkOut:
                searchValue.checkOut < searchValue.checkIn
                  ? searchValue.checkIn
                  : searchValue.checkOut,
              adults: searchValue.adults,
              children: searchValue.children,
              room: searchValue.room,
            }).toString(),
          });
        }
        return navigate({
          pathname: "/hotels/",
          search: createSearchParams({
            location: searchValue.location || "DN",
            checkIn: searchValue.checkIn,
            checkOut:
              searchValue.checkOut < searchValue.checkIn
                ? searchValue.checkIn
                : searchValue.checkOut,
            adults: searchValue.adults,
            children: searchValue.children,
            room: searchValue.room,
            page: 1,
          } as any).toString(),
        });
      case 2: // tham quan
        clearSessionStorage(info_booking_tour);
        if (type === "tour") {
          return navigate({
            pathname: `/tour/${searchValue.slug}`,
          });
        }
        return navigate({
          pathname: "/tour/",
          search: createSearchParams({
            location: searchValue.location,
          }).toString(),
        });
    }
  };

  useEffect(() => {
    dispatch(
      setSearchValue({
        adults: Number(params?.adults) || 2,
        children: Number(params?.children) || 0,
        room: Number(params?.room) || 1,
      })
    );
  }, []);

  return (
    <div
      className={classNames(
        "bg-white px-24 xl:px-16 xl:py-16 lg:px-12 lg:py-12 py-24 rounded-16 w-100 searchBar",
        {
          "custom-border": Boolean(!showTab),
        }
      )}
    >
      <div className="row xxl:gap-10 gap-xxl-0">
        <div
          className={classNames(
            " xxl:pb-15 xl:pb-10 lg:pb-8 xxl:border-bottom-light md:pr-0",
            {
              "col-7 col-sm-9": type === "tour",
              "xxl:w-1/1 w-1/3 pr-0 border-right-light": type === "hotel",
            }
          )}
        >
          <LocationSearch handleChangeValue={handleChangeValue} type={type} />
        </div>
        {type === "hotel" && (
          <div className="lg:w-1/1 xxl:w-1/2 w-1/4 pr-0  js-form-dd js-calendar border-right-light lg:pb-10 lg:border-bottom-light">
            <div>
              <h4 className="text-18 xl:text-16 lg:text-14 fw-400 text-neutral-400 xxl:mt-10">
                {t("HOME.CHECK_IN")} - {t("HOME.CHECK_OUT")}
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
        )}

        {type === "hotel" && (
          <div className=" lg:w-1/1 xxl:w-5/12 w-1/4 pr-0 xxl:mt-10">
            <GuestSearch handleChangeValue={handleChangeValue} />
          </div>
        )}

        <div
          className={classNames(" mt-10", {
            "xxl:w-1/1 w-1/6": type === "hotel",
            "col-5 col-sm-3 sm:pl-0": type === "tour",
          })}
        >
          <div className="button-item d-flex justify-end xxl:justify-start">
            <Button onClick={handleSearchInfo} className="xxl:w-1/1">
              <i className="icon-search text-20 xl:text-18 lg:text-16 mr-10" />
              {t("HOME.SEARCH")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
