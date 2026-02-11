import React from "react";
import "./BannerNews.style.scss";
import { useTranslation } from "react-i18next";

const BannerNews = () => {
  const { t } = useTranslation();
  return (
    <div className="banner_news">
      <div className="banner_news_content">
        <h1 className="text-72 xl:text-60 lg:text-50 md:text-40 text-white text-center">
          {t("NEWS.NEWS_TITLE")}
        </h1>
        <p className="text-24 xl:text-20 lg:text-16 md:text-14 md:px-20 text-white text-center">
          {t("NEWS.NEWS_DESCRIPTION")}
        </p>
      </div>
    </div>
  );
};

export default BannerNews;
