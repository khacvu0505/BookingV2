import Tag from "@/apps/Tag";
import { HighlightedText } from "@/utils/utils";
import React from "react";
import { useTranslation } from "react-i18next";

const imgDefault = (
  <div className="px-12 py-6 rounded-8 bg-neutral-50">
    <i
      className="ri-map-pin-2-fill text-neutral-500 text-16"
      aria-hidden="true"
    />
  </div>
);

export const RecentSearchItem = ({
  data,
  handleOptionClick,
  searchValue,
  type,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="d-flex gap-3 items-center border-bottom-light py-12 cursor-pointer"
      onClick={() => handleOptionClick(data)}
    >
      <div>
        {data?.thumbnail ? (
          <img
            src={data?.thumbnail}
            alt="destination"
            className=" h-40 rounded-8 object-cover"
            width={40}
          />
        ) : (
          imgDefault
        )}
      </div>
      <div>
        <HighlightedText text={data?.locationName} highlight={searchValue} />
        <p className="text-14 lg:text-13 fw-400 text-neutral-500">
          {data?.parentName}
        </p>
        {(data?.type === 2 &&
          (type === "hotel" ? (
            <Tag className="lg:text-13">{t("COMMON.HOTEL")}</Tag>
          ) : (
            <Tag className="lg:text-13">{t("COMMON.TOUR")}</Tag>
          ))) ||
          ""}
      </div>
    </div>
  );
};
