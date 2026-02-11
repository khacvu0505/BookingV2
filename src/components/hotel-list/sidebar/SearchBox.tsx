import useQueryParams from "@/hooks/useQueryParams";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { cleanedObject } from "@/utils/utils";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useQueryParams();

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const newParams = cleanedObject({
        ...searchParams,
        keyword: searchTerm,
      });
      setSearchParams(newParams);
    }, 500),
    []
  );

  const handleChangeValue = useCallback(
    (event) => {
      setSearchValue(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch, searchParams]
  );

  useEffect(() => {
    setSearchValue(searchParams?.keyword || "");
  }, []);

  return (
    <div className="single-field relative d-flex items-center py-10">
      <input
        className="pl-50 border-light text-dark-1 h-50 rounded-8"
        type="text"
        placeholder="e.g. FLC Tower, Đà Lạt ..."
        value={searchValue || ""}
        onChange={handleChangeValue}
      />
      <button type="submit" className="absolute d-flex items-center h-full">
        <i className="icon-search text-20 px-15 text-dark-1" />
      </button>
    </div>
  );
};

export default SearchBox;
