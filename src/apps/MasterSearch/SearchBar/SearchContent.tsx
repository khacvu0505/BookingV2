import React, { useEffect, useState } from "react";
import { AttactiveItem, RecentSearchItem } from "./components";
import { useFetchData } from "@/hooks/useFetchData";
import { getSearchLocation } from "@/api/hotel.api";
import {
  BREAKPOINT_LG,
  hotel_search_history,
  tour_search_history,
} from "@/utils/constants";
import { getFromLocalStorage, removeLocalStorage } from "@/utils/utils";
import { isEmpty } from "lodash";
import useWindowSize from "@/utils/useWindowSize";
import { useTranslation } from "react-i18next";

interface SearchContentProps {
  regions: any[];
  handleOptionClick: (item: any) => void;
  selectedItem: any;
  searchValue: string;
  type?: string;
}

const SearchContent = ({
  regions,
  handleOptionClick,
  selectedItem,
  searchValue,
  type,
}: SearchContentProps) => {
  const { t } = useTranslation();
  const isDesktop = useWindowSize().width > BREAKPOINT_LG;
  const [listSearchHistory, setListSearchHistory] = useState<any[]>([]);
  const [listSearch, isSearchLocation] = useFetchData(
    getSearchLocation,
    searchValue
      ? {
          keyword: searchValue,
          type: type === "hotel" ? 1 : 2,
        }
      : {}
  );

  useEffect(() => {
    if (!type) return;
    if (type === "hotel") {
      const listHotelSearchHistory = getFromLocalStorage(hotel_search_history) as any[] | null;
      setListSearchHistory(listHotelSearchHistory || []);
    }
    if (type === "tour") {
      const listTourSearchHistory = getFromLocalStorage(tour_search_history) as any[] | null;
      setListSearchHistory(listTourSearchHistory || []);
    }
  }, [type, searchValue]);

  const handleClearSearchHistory = () => {
    removeLocalStorage(
      type === "hotel" ? hotel_search_history : tour_search_history
    );
    setListSearchHistory([]);
  };

  const attributes = !isDesktop ? { "data-bs-dismiss": "offcanvas" } : {};

  return (
    <div>
      <div className="d-flex justify-between items-center mb-10">
        <div>
          <p className="text-18 xl:text-16 lg:text-14 fw-600 text-neutral-800">
            {searchValue && t("HOME.RECENT_SEARCH")}
          </p>
          {!isEmpty(listSearchHistory) && (
            <p className="text-18 xl:text-16 lg:text-14 fw-600 text-neutral-800">
              {!searchValue && t("HOME.RECENT_SEARCH")}
            </p>
          )}
        </div>

        {!searchValue && !isEmpty(listSearchHistory) && (
          <p
            className="text-primary-500 text-18 xl:text-16 lg:text-14 fw-400 cursor-pointer"
            onClick={handleClearSearchHistory}
          >
            {t("HOME.CLEAR_SEARCH")}
          </p>
        )}
      </div>

      <ul className="y-gap-5 js-results" {...attributes}>
        {searchValue && isSearchLocation && (
          <div className="d-flex justify-content-center my-20">
            <div className="spinner-border text-primary-500 " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {searchValue && !isSearchLocation
          ? (listSearch as any[])?.map((item: any, index: number) => (
              <RecentSearchItem
                key={`${item?.locationCode} ${index}`}
                data={item}
                handleOptionClick={handleOptionClick}
                searchValue={searchValue}
                type={type}
              />
            ))
          : listSearchHistory?.map((item: any, index: number) => {
              return item?.locationName ? (
                <div
                  className="d-flex border-bottom-light py-10 align-items-center gap-2 gap-xl-3  cursor-pointer"
                  key={item?.locationCode + index}
                  onClick={() => handleOptionClick(item)}
                >
                  <i className="ri-history-line text-20 xl:text-18 lg:text-16 text-neutral-500" />
                  <p className="text-18 xl:text-16 lg:text-14 fw-400 text-neutral-800">
                    {item?.locationName}
                  </p>
                </div>
              ) : (
                ""
              );
            })}
      </ul>
      <div className="mt-24 lg:mt-15">
        <p className="text-18 xl:text-16 lg:text-14 fw-600 text-neutral-800">
          {t("HOME.ATTRACTIVE_DESTINATIONS")}
        </p>
        <div className="row pt-10 align-items-center px-10">
          {regions?.map((item: any) => (
            <AttactiveItem
              data={item}
              key={item.id}
              handleOptionClick={handleOptionClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchContent;
