import { createSearchParams, useNavigate } from "react-router-dom";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { addCurrentTab } from "@/features/hero/findPlaceSlice";
import classNames from "classnames";

const MainFilterSearchBox = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    room: 1,
  });

  const handleChangeValue = ({ name, value }: { name: string; value: any }) => {
    setSearchValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearchInfo = () => {
    if (!searchValue.location) {
      handleRenderNoti("Vui lòng chọn địa điểm", "error");
      return;
    }

    switch (currentTab) {
      case "Khách sạn":
        return navigate({
          pathname: "/hotels/",
          search: createSearchParams({
            location: searchValue.location,
            checkIn: searchValue.checkIn,
            checkOut:
              searchValue.checkOut < searchValue.checkIn
                ? searchValue.checkIn
                : searchValue.checkOut,
            adults: String(searchValue.adults),
            children: String(searchValue.children),
            room: String(searchValue.room),
            page: "1",
          } as any).toString(),
        });
      case "Tours":
        navigate({
          pathname: "/tour/",
          search: createSearchParams({
            location: searchValue.location,
          }).toString(),
        });
    }
  };
  return (
    <>
      <div
        className={classNames(
          "mainSearch is-in-view px-20 py-10 pr-20 lg:px-20 lg:pt-5 lg:pb-20 ",
          {
            "-w-900": currentTab === "Khách sạn",
            "-w-600": currentTab === "Tours",
          }
        )}
      >
        <div className="tabs -bookmark js-tabs d-flex justify-center">
          <div className="tabs__controls d-flex items-center js-tabs-controls bg-white rounded-top-3 py-5 tabs__controls_custom">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                className={`tabs__button px-30 py-10 rounded-4 fw-600 text-dark-1 js-tabs-button text-dark-1  ${
                  tab?.name === currentTab ? "is-tab-el-active" : ""
                }`}
                onClick={() => dispatch(addCurrentTab(tab?.name))}
              >
                <i className={`${tab.icon} text-20 mr-10`}></i>
                {tab?.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className={classNames(
            "items-center pt-10 bg-white shadow-2 px-20 py-20 rounded-100 tabs__content",
            {
              "button-grid-tour": currentTab === "Tours",
              "button-grid": currentTab === "Khách sạn",
            }
          )}
        >
          <LocationSearch handleChangeValue={handleChangeValue} />
          {/* End Location */}

          {currentTab === "Khách sạn" && (
            <div className="searchMenu-date px-30 lg:py-10 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                  Nhận phòng - Trả phòng
                </h4>
                <DateSearch handleChangeValue={handleChangeValue} />
              </div>
            </div>
          )}
          {/* End check-in-out */}

          {currentTab === "Khách sạn" && (
            <GuestSearch handleChangeValue={handleChangeValue} />
          )}
          {/* End guest */}
          <div className="button-item">
            <button
              className="button -dark-1  py-10 px-10 py-ld-20 px-ld-20 col-12 rounded-22 bg-blue-1 text-white"
              onClick={handleSearchInfo}
            >
              <i className="icon-search text-20 mr-10" />
              Tìm kiếm
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
