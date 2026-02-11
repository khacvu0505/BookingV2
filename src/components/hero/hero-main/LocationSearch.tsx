import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LocationSearch = ({ handleChangeValue }) => {
  const regions = useSelector((state) => state.hotels.regions) || [];
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [regionsFilter, setRegionsFilter] = useState(regions);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    handleChangeValue({ name: "location", value: item.id });
  };

  const handleChangeInputSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleClickInputSearch = () => {
    setSearchValue("");
    setSelectedItem(null);
    handleChangeValue({ name: "location", value: "" });
  };

  useEffect(() => {
    if (regions.length > 0) {
      setSearchValue(regions[0].name);
      setSelectedItem(regions[0]);
      handleChangeValue({ name: "location", value: regions[0].id });
      setRegionsFilter(regions);
    } else {
      setSearchValue("");
      setSelectedItem(null);
      setRegionsFilter([]);
    }
  }, [regions]);

  useEffect(() => {
    if (searchValue === "") {
      setRegionsFilter(regions);
    } else {
      setRegionsFilter(
        regions.filter((region) => {
          return (
            region.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            region.code.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    }
  }, [searchValue]);

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-10 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Địa điểm</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Bạn muốn đi đâu?"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={handleChangeInputSearch}
              onClick={handleClickInputSearch}
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400 max-h-340 overflow-scroll">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {regionsFilter?.map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-15 py-10 js-search-option mb-1 ${
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

export default LocationSearch;
