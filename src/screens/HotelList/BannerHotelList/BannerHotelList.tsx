import React from "react";
import MasterSearch from "@/components/Search/MasterSearch";
import "./BannerHotelList.style.scss";
import { useTranslation } from "react-i18next";

const BannerHotelList = () => {
  const { t } = useTranslation();
  return (
    <div className="banner_hotel_list">
      <div className="container px-0 md:container-mobile">
        <div className="banner_hotel_content pt-150 lg:pt-100 md:pt-80">
          <h1 className="text-72 lg:text-60 md:text-30 fw-700 text-white mb-65 lg:mb-40 md:mb-20 text-left xl:text-center lg:text-40 ">
            {t("HOTELS.TITLE")}
          </h1>
          <div className="w-100 relative">
            <MasterSearch showTab={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHotelList;
