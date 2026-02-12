import Tag from "@/components/Tag";
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

interface ResultSearchItemProps {
  data: any;
  handleOptionClick: (data: any) => void;
  searchValue: string;
}

export const ResultSearchItem = ({ data, handleOptionClick, searchValue }: ResultSearchItemProps) => {
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
      <div className="d-flex flex-column">
        <HighlightedText text={data?.locationName} highlight={searchValue} />
        <HighlightedText
          text={data?.address}
          highlight={searchValue}
          classNameCustom="text-14 lg:text-13 fw-400 text-neutral-500"
        />
      </div>
    </div>
  );
};
