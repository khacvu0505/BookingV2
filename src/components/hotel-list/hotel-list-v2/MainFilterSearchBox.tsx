import { addDate, cleanedObject, formatDate } from "@/utils/utils";
import DateSearch from "../common/DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import useQueryParams from "@/hooks/useQueryParams";
import { useState } from "react";

const MainFilterSearchBox = () => {
  const [params, setSearchParams] = useQueryParams();
  const {
    location: locationParam,
    checkIn: checkInParam = formatDate(new Date()),
    checkOut: checkOutParam = addDate(new Date(), 3),
    adults: adultsParam = 2,
    children: childrenParam = 0,
    room: roomParam = 1,
  } = params;
  const [dataFilter, setDataFilter] = useState({
    location: locationParam,
    checkIn: checkInParam,
    checkOut: checkOutParam,
    adults: adultsParam,
    children: childrenParam,
    room: roomParam,
  });

  const handleChangeDataFilter = (name, value) => {
    setDataFilter({ ...dataFilter, [name]: value });
  };

  const handleClickSearch = () => {
    setSearchParams(
      cleanedObject({
        ...params,
        subLocation: "",
        location: dataFilter.location,
        checkIn: dataFilter.checkIn,
        checkOut:
          dataFilter.checkOut < dataFilter.checkIn
            ? dataFilter.checkIn
            : dataFilter.checkOut,
        adults: dataFilter.adults,
        children: dataFilter.children,
        room: dataFilter.room,
        minPrice: 0,
        maxPrice: 20000000,
      })
    );
  };

  return (
    <>
      <div className="col-12 px-10">
        <LocationSearch handleChangeDataFilter={handleChangeDataFilter} />
        {/* End Location */}
      </div>
      {/* End .col-12 */}

      <div className="col-12 px-10">
        <div className="searchMenu-date px-20 py-10 bg-white rounded-4 -left js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">
              Nhận phòng - Trả phòng
            </h4>
            <DateSearch handleChangeDataFilter={handleChangeDataFilter} />
          </div>
        </div>
        {/* End check-in-out */}
      </div>
      {/* End .col-12 */}

      <div className="col-12 px-10">
        <GuestSearch handleChangeDataFilter={handleChangeDataFilter} />
        {/* End guest */}
      </div>
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
