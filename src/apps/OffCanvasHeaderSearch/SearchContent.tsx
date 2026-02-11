import { getSearchGeneral } from "@/api/hotel.api";
import { useFetchData } from "@/hooks/useFetchData";
import React from "react";
import { ResultSearchItem } from "./ResultSearchItem";

interface SearchContentProps {
  searchValueDebounce: string;
}

const SearchContent = ({ searchValueDebounce }: SearchContentProps) => {
  const [listSearchGeneral, isSearchGeneralLoading] = useFetchData(
    getSearchGeneral,
    searchValueDebounce
      ? {
          keyword: searchValueDebounce,
        }
      : {}
  );

  const handleOptionClick = (value: any) => {
    // eslint-disable-next-line no-undef
    window.open(value?.url, "_self");
  };

  return (
    <div>
      <ul className="y-gap-5 js-results" data-bs-dismiss="offcanvas">
        {isSearchGeneralLoading && (
          <div className="d-flex justify-content-center my-20">
            <div className="spinner-border text-primary-500 " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isSearchGeneralLoading && (listSearchGeneral as any[])?.length > 0 ? (
          (listSearchGeneral as any[])?.map((item: any, index: number) => (
            <ResultSearchItem
              key={`${item?.locationName} ${index}`}
              data={item}
              handleOptionClick={handleOptionClick}
              searchValue={searchValueDebounce}
            />
          ))
        ) : (
          <p className="text-center text-neutral-800 w-100 fw-400">
            Chưa có kết quả phù hợp, bạn thử đổi từ khóa khác nhé!
          </p>
        )}
      </ul>
    </div>
  );
};

export default SearchContent;
