import SearchInput from "@/apps/SearchInput";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const FindTour = () => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();
  const [search, setSearch] = useState(params?.search);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchParams(
        // cleanedObject({
        { ...params, search: value }
        // })
      );
    }, 800),
    []
  );

  return (
    <div className="mb-32 lg:mb-20 md:mb-16 mt-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-20 lg:mb-18 md:mb-10">
        {t("TOURS.FILTER/FIND_TOUR")}
      </p>
      <SearchInput
        placeholder={t("TOURS.FILTER/INPUT_TOUR_INFO")}
        leftIcon={
          <img
            alt="icon"
            src="/images/TourList/icon-tour.png"
            width={22}
            height={22}
          />
        }
        rightButton={
          <img
            alt="icon"
            src="/images/TourList/icon-search.png"
            width={22}
            height={22}
          />
        }
        onChange={(e) => {
          const { value } = e.target;
          setSearch(value);
          debouncedSearch(value); // Call the debounced handler
        }}
        defaultValue={search || ""}
      />
    </div>
  );
};

export default FindTour;
