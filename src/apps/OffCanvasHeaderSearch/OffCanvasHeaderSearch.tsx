import React, { useCallback, useState } from "react";
import OffCanvasComponent from "../OffCanvasComponent";
import Input from "../Input";
import { debounce } from "lodash";
import SearchContent from "./SearchContent";
import Hashtag from "@/apps/SearchAll/Hashtag";
import Regions from "@/apps/SearchAll/Regions";

const OffCanvasHeaderSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchValueDebounce, setSearchValueDebounce] = useState("");
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValueDebounce(value);
    }, 500),
    []
  );
  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    debouncedSearch(value); // Call the debounced handler
  };
  const handleClickInputSearch = () => {
    setSearchValue("");
    setSearchValueDebounce("");
  };

  return (
    <OffCanvasComponent
      id="offcanvas-header-search"
      classNameBody="px-15 lg:px-10"
    >
      <Input
        placeholder="Tìm kiếm địa điểm"
        value={searchValue}
        onChange={handleChangeInputSearch}
        onClick={handleClickInputSearch}
      />
      {searchValueDebounce ? (
        <>
          <div className="text-muted small mb-2 ">
            Search results for: &quot;
            <span className="text-primary-500">{searchValueDebounce}</span>
            &quot;
          </div>
          <SearchContent searchValueDebounce={searchValueDebounce} />
        </>
      ) : (
        <>
          <Hashtag />
          <Regions />
        </>
      )}
    </OffCanvasComponent>
  );
};

export default OffCanvasHeaderSearch;
