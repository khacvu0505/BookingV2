import { useTranslation } from "react-i18next";
import React, { useCallback, useState } from "react";
import Hashtag from "@/components/Search/SearchAll/Hashtag";
import Regions from "@/components/Search/SearchAll/Regions";
import debounce from "lodash/debounce";
import SearchContent from "@/components/OffCanvas/OffCanvasHeaderSearch/SearchContent";

const SearchInput = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setValue(searchTerm);
    }, 500),
    []
  );

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch]
  );

  return (
    <div className="position-relative" style={{ width: 320 }}>
      <div
        className="d-flex align-items-center bg-white rounded-4 border px-3"
        style={{ height: 40 }}
      >
        <input
          className="form-control border-0 p-0 me-2"
          type="text"
          placeholder={t("HOME.HEADER/SEARCH")}
          autoComplete="off"
          name="search-all"
          onFocus={() => setIsActive(true)}
          // eslint-disable-next-line no-undef
          onBlur={() => setTimeout(() => setIsActive(false), 200)}
          onChange={handleChangeValue}
          value={query}
          style={{ height: 32, outline: "none", boxShadow: "none" }}
        />
        <i className="icon-search text-15 text-neutral-800" />
      </div>

      {isActive && (
        <div
          className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-sm p-2"
          style={{ zIndex: 1000, width: "40vw", marginLeft: "-130%" }}
        >
          {query ? (
            <>
              <div className="text-muted small mb-2 ">
                Search results for: &quot;
                <span className="text-primary-500">{value}</span>
                &quot;
              </div>
              <SearchContent searchValueDebounce={value} />
            </>
          ) : (
            <>
              <Hashtag />
              <Regions />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
