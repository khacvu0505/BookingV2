import { getNewsByRegion } from "@/api/news.api";
import { useFetchData } from "@/hooks/useFetchData";
import classNames from "classnames";
import React, { useMemo } from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Scenery = ({ selected }) => {
  const navigate = useNavigate();
  const params = {
    Page: 1,
    PageSize: 6,
    Entity: {
      RegionFID: selected?.id || "NT",
      CateID: 45,
      Keyword: "",
      SupplierType: "",
    },
  };

  const [data] = useFetchData(getNewsByRegion, params);

  const topData = useMemo(() => {
    return data?.length > 0 ? data?.slice(0, 3) : [];
  }, [data]);

  const botData = useMemo(() => {
    return data?.length > 3 ? data?.slice(3) : [];
  }, [data]);

  return (
    <div className="mt-50 xl:mt-30 lg:mt-15">
      <h2 className="text-32 xl:text-26 lg:text-24 fw-700 text-neutral-800 lg:text-center">
        <Trans
          i18nKey="DESTINATIONS.SCENERY"
          values={{ name: selected?.name }}
        />
      </h2>
      <p className="text-14 fw-400 text-neutral-800 mb-30 xl:mb-25 lg:mb-20 lg:text-center">
        <Trans
          i18nKey="DESTINATIONS.SCENERY_DESCRIPTION"
          values={{ name: selected?.name }}
        />
      </p>
      {topData?.length > 0 && (
        <div className="row">
          {topData?.length > 0 &&
            topData?.map((item, idx) => (
              <div
                className={classNames("relative pointer", {
                  "col-lg-6": idx === 0,
                  "col-md-6 col-lg-3": idx !== 0,
                })}
                key={idx}
                onClick={() => {
                  navigate(`/news/${item?.slug}`);
                }}
              >
                <div className="card-img">
                  <img
                    src={item?.thumbnailURL}
                    alt="destination"
                    className="object-cover rounded-8 mb-16 lg:mb-10 w-100"
                    style={{ height: 312 }}
                  />
                </div>
                <div
                  className="absolute bottom-18 left-16 mx-auto rounded-bot-left-8 rounded-bot-right-8 px-16 xl:px-14 lg:px-12 py-12 xl:py-10 lg:py-8"
                  style={{
                    background: "#00000080",
                    width: "calc(100% - 32px)",
                  }}
                >
                  <h3 className="text-18 lg:text-16 xl:text-15 fw-600 text-neutral-800 mb-8 text-truncate text-white">
                    {item?.blogName}
                  </h3>
                  <p className="text-14 lg:text-13 fw-400 text-neutral-500 text-truncate-2 text-white">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      {botData?.length > 0 && (
        <div className="row">
          {botData?.length > 0 &&
            botData?.map((item, idx) => (
              <div
                className={classNames("relative col-md-6 col-lg-4 pointer")}
                key={idx}
                onClick={() => {
                  navigate(`/news/${item?.slug}`);
                }}
              >
                <div className="card-img">
                  <img
                    src={item?.thumbnailURL}
                    alt="destination"
                    className="object-cover rounded-8 mb-16 lg:mb-10 w-100"
                    style={{ height: 312 }}
                  />
                </div>
                <div
                  className="absolute bottom-18 left-16 mx-auto rounded-bot-left-8 rounded-bot-right-8 px-16 py-12"
                  style={{
                    background: "#00000080",
                    width: "calc(100% - 32px)",
                  }}
                >
                  <h3 className="text-18 xl:text-16 lg:text-15 fw-600 text-neutral-800 mb-8 text-truncate text-white">
                    {item?.blogName}
                  </h3>
                  <p className="text-14 lg:text-13 fw-400 text-neutral-500 text-truncate-2 text-white">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Scenery;
