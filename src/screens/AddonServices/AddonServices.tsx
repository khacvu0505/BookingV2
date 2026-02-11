import MetaComponent from "@/components/common/MetaComponent";
import { info_booking } from "@/utils/constants";
import { getFromSessionStorage } from "@/utils/utils";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Breadcrumb from "@/apps/Breadcrumb";
import AddonList from "./AddonList";

const AddonServices = () => {
  const { t } = useTranslation();
  const infoBooking = getFromSessionStorage(info_booking);

  const metadata = {
    title: t("HOTEL_ADDON.ADDON_SERVICE"),
    description: t("COMMON.META_DESCRIPTION"),
  };

  const breadcrumbData = useMemo(
    () => [
      {
        title: t("HOTEL_ADDON.HOTELS"),
        link: "/hotels",
      },
      {
        title: infoBooking?.hotelInfo?.hotelName,
        link: "#",
        isGoBack: true,
      },
      {
        title: t("HOTEL_ADDON.ADDON_SERVICE"),
        link: "#",
      },
    ],
    [infoBooking?.hotelInfo?.hotelName, t]
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

export default AddonServices;
