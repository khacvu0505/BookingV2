import React from "react";
import "./Navbar.style.scss";
import AccommodationType from "./AccommodationType";
import RatingHotelList from "./RatingHotelList";
import RatingByCustomer from "./RatingByCustomer";
import LocationHotel from "./LocationHotel";
import SubLocationHotel from "./SubLocationHotel";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <div className="col-xl-3 navbar_hotel_list pl-0 xxl:d-none">
      <div
        className="w-100 pl-0 pl-16"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <div className="navbar_head">
          <img
            src="/images/HotelList/icon-filter.png"
            alt="filter hotel list okdimall"
            className="navbar_head-icon"
          />
          <p className="navbar_head-title">{t("HOTELS.NAVIGATION/TITLE")}</p>
        </div>
        <div className="navbar_content">
          <AccommodationType />
          <RatingHotelList />
          <RatingByCustomer />
          <LocationHotel />
          <SubLocationHotel />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
