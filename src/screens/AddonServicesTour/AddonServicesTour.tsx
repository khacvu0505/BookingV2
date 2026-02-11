import MetaComponent from "@/components/common/MetaComponent";
import { info_booking_tour } from "@/utils/constants";
import { getFromSessionStorage } from "@/utils/utils";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Breadcrumb from "@/apps/Breadcrumb";
import AddonList from "./AddonList";

const AddonServicesTour = () => {
  const { t } = useTranslation();
  const infoBookingTour = getFromSessionStorage(info_booking_tour);
  const metadata = {
    title: t("HOTEL_ADDON.ADDON_SERVICE"),
    description: t("COMMON.META_DESCRIPTION"),
  };

  const breadcrumbData = useMemo(
    () => [
      {
        title: t("TOUR_ADDON.TOUR"),
        link: "/tour",
      },
      {
        title: infoBookingTour?.tourName,
        link: "#",
        isGoBack: true,
      },
      {
        title: t("HOTEL_ADDON.ADDON_SERVICE"),
        link: "#",
      },
    ],
    [infoBookingTour?.tourName, t]
  );

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />

      <div className="header-margin pt-15"></div>
      <div className="container">
        <Breadcrumb data={breadcrumbData} />
      </div>

      <section className="mb-50">
        <div className="container">
          <AddonList />
        </div>
      </section>
    </>
  );
};

export default AddonServicesTour;
