import React from "react";
import Dropdown from "@/apps/DropDown";
import "./TourListContentHeader.style.scss";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface TourListContentHeaderProps {
  total: number;
}

const TourListContentHeader = ({ total }: TourListContentHeaderProps) => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();

  const filterOptions = useMemo(
    () => [
      {
        id: 1,
        title: t("COMMON.SORT/ALL"),
        value: "",
      },
      {
        id: 2,
        title: t("COMMON.SORT/LOWEST_PRICE"),
        value: "FinalPrice ASC",
      },
      {
        id: 3,
        title: t("COMMON.SORT/HIGHEST_PRICE"),
        value: "FinalPrice DESC",
      },
      {
        id: 4,
        title: t("COMMON.SORT/FEATURED"),
        value: "Publish DESC",
      },
      {
        id: 5,
        title: t("COMMON.SORT/HIGHEST_RATING"),
        value: "VotePoint DESC",
      },
    ],
    [t]
  );

  return (
    <div className="hotel_list_content_header" id="tour_list_header">
      <div className="hotel_list_content_header-left">
        <img src="/images/TourList/icon-tour.png" alt="hotel list okdimall" />
        <p className="text-18 lg:text-17 md:text-15 fw-500 text-neutral-800 ml-8">
          {t("TOURS.TOUR_INFO")}
          <span className="number">{total}</span>
        </p>
      </div>
      <div className="hotel_list_content_header-right">
        <div className="d-flex items-center md:d-none">
          <p className="title">{t("COMMON.SORT_TITLE")}: </p>
          <Dropdown
            options={filterOptions}
            onChange={(item) => {
              setSearchParams(
                cleanedObject({
                  ...params,
                  sort: item.value,
                })
              );
            }}
            value={
              filterOptions.find((item) => item.value === params.sort) ||
              filterOptions[0]
            }
          />
        </div>
        <div
          className="border-primary-500 rounded-6 ml-16 pointer d-none xxl:d-block"
          data-bs-toggle="offcanvas"
          aria-controls="offcanvas-tours-filter"
          data-bs-target="#offcanvas-tours-filter"
        >
          <img
            src="/images/HotelList/icon-filter.png"
            alt="OKdimall hotel list"
            className="p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TourListContentHeader;
