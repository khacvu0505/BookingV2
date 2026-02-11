import useQueryParams from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ handleChangeDataFilter }) => {
  const regions = useSelector((state) => state.hotels.regions) || [];

  const [params, _] = useQueryParams();
  const { location: locationParam } = params;
  const [searchValue, setSearchValue] = useState(regions[0]?.name || "");
  const [selectedItem, setSelectedItem] = useState(regions[0]);
  const [regionsFilter, setRegionsFilter] = useState(regions);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    handleChangeDataFilter("location", item.id);
  };

  const handleClickInputSearch = () => {
    setSearchValue("");
    setSelectedItem(null);
    handleChangeDataFilter({ name: "location", value: "" });
  };

  useEffect(() => {
    if (searchValue === "") {
      setRegionsFilter(regions);
    } else {
      setRegionsFilter(
        regions.filter(
          (region) =>
            region.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            region.code.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

  useEffect(() => {
    if (regions.length > 0) {
      const locationItem =
        regions.find((item) => item.id === locationParam) || regions[0];
      setRegionsFilter(regions);
      setSearchValue(locationItem?.name || "");
      setSelectedItem(locationItem);
    }
  }, [regions]);

  return (
    <>
      <div className="searchMenu-loc px-10 py-10 bg-white rounded-4 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Địa chỉ</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={handleClickInputSearch}
            />
          </div>
        </div>
        {/* End location Field */}

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-10 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {regionsFilter?.slice(0, 6).map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-10 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {item.name}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
