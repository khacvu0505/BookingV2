import MetaComponent from "@/components/common/MetaComponent";
import { info_booking, info_booking_tour } from "@/utils/constants";
import { getFromSessionStorage } from "@/utils/utils";
import { ComponentType, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Breadcrumb from "@/apps/Breadcrumb";

interface AddonServicesPageProps {
  supplierType: "Hotel" | "Tour";
  AddonListComponent: ComponentType;
}

const SUPPLIER_CONFIG = {
  Hotel: {
    sessionKey: info_booking,
    breadcrumbTitle: "HOTEL_ADDON.HOTELS",
    breadcrumbLink: "/hotels",
    getSupplierName: (info: any) => info?.hotelInfo?.hotelName,
  },
  Tour: {
    sessionKey: info_booking_tour,
    breadcrumbTitle: "TOUR_ADDON.TOUR",
    breadcrumbLink: "/tour",
    getSupplierName: (info: any) => info?.tourName,
  },
} as const;

const AddonServicesPage = ({
  supplierType,
  AddonListComponent,
}: AddonServicesPageProps) => {
  const { t } = useTranslation();
  const config = SUPPLIER_CONFIG[supplierType];
  const infoBooking = getFromSessionStorage(config.sessionKey);

  const metadata = {
    title: t("HOTEL_ADDON.ADDON_SERVICE"),
    description: t("COMMON.META_DESCRIPTION"),
  };

  const supplierName = config.getSupplierName(infoBooking);

  const breadcrumbData = useMemo(
    () => [
      {
        title: t(config.breadcrumbTitle),
        link: config.breadcrumbLink,
      },
      {
        title: supplierName,
        link: "#",
        isGoBack: true,
      },
      {
        title: t("HOTEL_ADDON.ADDON_SERVICE"),
        link: "#",
      },
    ],
    [supplierName, t]
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
          <AddonListComponent />
        </div>
      </section>
    </>
  );
};

export default AddonServicesPage;
