import React from "react";
import { getNewsByRegion } from "@/api/news.api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { newsKeys } from "@/lib/query-keys";

const Feeling = ({ selected }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data = [] } = useQuery({
    queryKey: newsKeys.byRegion(selected?.id || "NT", 60),
    queryFn: async () => {
      const res = await getNewsByRegion({
        Page: 1,
        PageSize: 4,
        Entity: {
          RegionFID: selected?.id || "NT",
          CateID: 60,
          Keyword: "",
          SupplierType: "",
        },
      });
      return res?.success ? res.data : [];
    },
  });

  return (
    <div className="mt-50 xl:mt-40 lg:mt-30">
      <h2 className="text-32 xl:text-26 lg:text-24 fw-700 text-neutral-800 text-center">
        {t("DESTINATIONS.FEELING")}
      </h2>
      <p className="text-14 fw-400 text-neutral-800 text-center mb-30 lg:mb-20">
        {t("DESTINATIONS.FEELING_DESCRIPTION")}
      </p>
      <div className="row">
        {data?.length > 0 &&
          data?.map((item, idx) => (
            <div
              className="col-12 col-lg-3 col-md-6 pointer lg:mb-15 "
              key={idx}
              onClick={() => {
                navigate(`/news/${item?.slug}`);
              }}
            >
              <div className="card-img w-100">
                <img
                  src={item?.thumbnailURL}
                  alt="destination"
                  className="object-cover rounded-8 mb-16 w-100"
                  style={{ height: 200 }}
                />
              </div>
              <div>
                <h3 className="text-18 xl:text-16 lg:text-15 fw-500 text-neutral-800 text-truncate-2 mb-8">
                  {item?.blogName}
                </h3>
                <p className="text-16 xl:text-14 fw-400 text-neutral-500 text-truncate-2">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feeling;
