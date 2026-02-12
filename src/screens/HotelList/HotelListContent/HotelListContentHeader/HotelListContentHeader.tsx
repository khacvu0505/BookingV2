import React, { useMemo } from "react";
import "./HotelListContentHeader.style.scss";
import Dropdown from "@/components/DropDown";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useTranslation } from "react-i18next";

interface HotelListContentHeaderProps {
  total: number;
}

const HotelListContentHeader = ({ total }: HotelListContentHeaderProps) => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();

  const filterOptions = useMemo(
    () => [
      {
        id: 1,
        title: t("COMMON.SORT/ALL"),
        value: "Class DESC",
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
    []
  );

  return (
    <div className="border-bottom-light pb-12">
      <div className="hotel_list_content_header" id="hotel_list_header">
        <div className="hotel_list_content_header-left">
          <img src="/images/HotelList/icon-bed.png" alt="hotel list okdimall" />
          <p className="text-18 lg:text-17 md:text-15 fw-500 text-neutral-800 ml-8">
            {t("HOTELS.INFO_HOTELS")}
            <span className="number">{total}</span>
          </p>
        </div>
        <div className="hotel_list_content_header-right">
          <div className="d-flex md:d-none items-center">
            <p className="title">{t("COMMON.SORT_TITLE")} : </p>
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
            aria-controls="offcanvas-hotels-filter"
            data-bs-target="#offcanvas-hotels-filter"
          >
            <img
              src="/images/HotelList/icon-filter.png"
              alt="OKdimall hotel list"
              className="p-1"
            />
          </div>
        </div>
      </div>
      <div className="d-none sm:d-flex items-center w-100">
        <p className="text-18 lg:text-17 md:text-15 text-neutral-800 w-25">
          Sắp xếp:{" "}
        </p>
        <div className="w-75">
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
      </div>
    </div>
  );
};

export default HotelListContentHeader;
