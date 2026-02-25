import MetaComponent from "@/components/MetaComponent";
import React, { useEffect, useState } from "react";
import BannerDestinations from "./BannerDestinations";
import PopularLocation from "@/components/PopularLocation";
import Intro from "./Intro";
import Popular from "./Popular";
import Information from "./Information";
import Feeling from "./Feeling";
import Scenery from "./Scenery";
import Images from "./Images";
import { getDestinationByRegion } from "@/api/destinations.api";
import { useTranslation } from "react-i18next";
import useQueryParams from "@/hooks/useQueryParams";

const Destination = () => {
  const { t } = useTranslation();
  const [params] = useQueryParams();
  const region = params?.region || "NT";
  const metadata = {
    title: t("DESTINATIONS.DESTINATIONS"),
    description: t("COMMON.META_DESCRIPTION"),
  };

  const [selected, setSelected] = useState(region);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selected) {
        const res = await getDestinationByRegion(selected.id);
        setData(res?.data || null);
      } else {
        setData(null);
      }
    };
    fetchData();
  }, [selected]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-60">
      <MetaComponent meta={metadata} />
      <BannerDestinations />
      <div className="mt-50 xl:mt-40 lg:mt-30">
        <PopularLocation
          handleChangeLocation={(location) => setSelected(location)}
          title={t("DESTINATIONS.POPULAR_DESTINATIONS")}
          description={t("DESTINATIONS.POPULAR_DESTINATION_DESCRIPTION")}
        />
        <div className="container mt-50 xl:mt-40 lg:mt-30">
          <Intro data={data} />
          <Popular />
          <Information data={data} />
          <Feeling selected={selected} />
          <Scenery selected={selected} />
        </div>
        <Images images={data?.images || []} />
      </div>
    </div>
  );
};

export default Destination;
