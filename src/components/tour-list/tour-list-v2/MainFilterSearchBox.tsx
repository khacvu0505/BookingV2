import useQueryParams from "@/hooks/useQueryParams";
import DateSearch from "../common/DateSearch";
import LocationSearch from "./LocationSearch";
import { useState } from "react";
import { cleanedObject } from "@/utils/utils";

const MainFilterSearchBox = () => {
  const [params, setSearchParams] = useQueryParams();

  const { location: locationParam } = params;

  const [dataFilter, setDataFilter] = useState<any>({});

  const handleChangeDataFilter = (name, value) => {
    setDataFilter({ ...dataFilter, [name]: value });
  };

  const handleClickSearch = () => {
    setSearchParams(
      cleanedObject({
        ...params,
        location: dataFilter.location,
        minPrice: 0,
        maxPrice: 20000000,
      })
    );
  };

  return (
    <>
      <div className="col-12">
        <LocationSearch handleChangeDataFilter={handleChangeDataFilter} />
        {/* End Location */}
      </div>
      {/* End .col-12 */}

      {/* <div className="col-12">
        <div className="searchMenu-date px-20 py-10 bg-white rounded-4 -left js-form-dd js-calendar">
          <div className="d-flex">
            <i className="icon-calendar-2 text-20 text-light-1 mt-5"></i>
            <div className="ml-10 flex-grow-1">
              <h4 className="text-15 fw-500 ls-2 lh-16">
                Check in - Check out
              </h4>
              <DateSearch />
            </div>
          </div>
        </div>
      </div> */}
      {/* End .col-12 */}

      <div className="col-12">
        <div className="button-item h-full">
          <button
            className="button -dark-1 py-15 px-40 h-full col-12 bg-blue-1 text-white"
            onClick={handleClickSearch}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="icon-search text-20 mr-10" />
            Tìm kiếm
          </button>
        </div>
        {/* End search button_item */}
      </div>
      {/* End .col-12 */}
    </>
  );
};

export default MainFilterSearchBox;
