import React from "react";
import "./BannerDestinations.style.scss";
import { useTranslation } from "react-i18next";

const BannerDestinations = () => {
  const { t } = useTranslation();
  return (
    <div className="banner_destinations">
      <div className="banner_destinations_content">
        <h1 className="text-72 xl:text-60 lg:text-50 md:text-30 text-white text-center">
          {t("DESTINATIONS.DESTINATIONS")}
        </h1>
        <p className="text-24 xl:text-20 lg:text-16 md:text-14 md:px-30 text-white text-center">
          {t("DESTINATIONS.DESCRIPTION")}
        </p>
      </div>
    </div>
  );
};

export default BannerDestinations;
