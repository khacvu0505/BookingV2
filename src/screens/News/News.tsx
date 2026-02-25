import MetaComponent from "@/components/MetaComponent";
import React, { useState } from "react";
import BannerNews from "./BannerNews";
import PopularLocation from "@/components/PopularLocation";
import TourRelated from "./TourRelated";
import Posts from "./Posts";
import { useTranslation } from "react-i18next";

const metadata = {
  title: "News",
  description: "Travel & Tour OKdimall",
};

const News = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  return (
    <div className="mt-60">
      <MetaComponent meta={metadata} />
      <BannerNews />
      <div className="mt-50 xl:mt-40 lg:mt-30">
        <PopularLocation
          handleChangeLocation={(location) => setSelected(location)}
          title={t("NEWS.NEWS_POPULAR")}
          description={t("NEWS.NEWS_POPULAR_DESC")}
        />
      </div>
      <div className="container mt-56 xl:mt-45 lg:mt-35">
        <div className="row">
          <div className="col-xl-9">
            <Posts selected={selected} />
          </div>
          <div className="col-xl-3">
            <TourRelated />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
