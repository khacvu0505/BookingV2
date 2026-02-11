import { fetchGetSearchBlogs } from "@/features/blogs/reducers";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = () => {
  const { filter } = useSelector((state) => state.blogs);
  const [searchText, setSearchText] = useState(filter?.Entity.Keyword || "");
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const dataFilter = {
        ...filter,
        Entity: { ...filter.Entity, Keyword: searchTerm },
      };
      (dispatch as any)(fetchGetSearchBlogs(dataFilter));
    }, 500),
    []
  );

  const handleChangeValue = useCallback(
    (event) => {
      setSearchText(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch, filter]
  );

  return (
    <div className="single-field relative d-flex items-center py-10">
      <input
        className="pl-50 border-light text-dark-1 h-50 rounded-8"
        type="text"
        placeholder="Nhập từ khoá"
        value={searchText || ""}
        onChange={handleChangeValue}
      />
      <button className="absolute d-flex items-center h-full">
        <i className="icon-search text-20 px-15 text-dark-1" />
      </button>
    </div>
  );
};

export default SearchBox;
