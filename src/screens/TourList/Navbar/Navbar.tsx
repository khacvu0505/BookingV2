import React from "react";
import Category from "./Category";
import RatingTourList from "./RatingTourList";
import Duration from "./Duration/Duration";
import Languages from "./Languages";
import FindTour from "./FindTour";
import RatingByCustomer from "./RatingByCustomer";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <div className="col-xl-3 pl-0 xxl:d-none">
      <div
        className="w-100"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <div className="border-bottom py-24">
          <div className="px-16 d-flex items-center">
            <img
              src="/images/HotelList/icon-filter.png"
              alt="filter hotel list okdimall"
              className="mr-8"
            />
            <p className="text-18 fw-500 text-neutral-800">
              {t("TOURS.FILTER_TITLE")}
            </p>
          </div>
        </div>
        <div className="px-16">
          <FindTour />
          <Category />
          <RatingTourList />
          <RatingByCustomer />
          <Duration />
          <Languages />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
