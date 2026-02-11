import React from "react";
import "./BannerTourList.style.scss";
import { useTranslation } from "react-i18next";

const BannerTourList = () => {
  const { t } = useTranslation();
  return (
    <div className="banner_tour_list">
      <div className="banner_tour_content">
        <h1 className="text-72 lg:text-60 md:text-30 fw-700 text-white text-center">
          {t("TOURS.TOUR_TITLE")}
        </h1>
        <p className="text-center text-white text-24 lg:text-20 md:text-18 fw-400">
          {t("TOURS.TOUR_DESCRIPTION")}
        </p>
      </div>
    </div>
  );
};

export default BannerTourList;
