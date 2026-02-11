import { getFromSessionStorage } from "@/utils/utils";
import Services from "./Services";
import SkeletonCard from "@/apps/SkeletonCard";
import { useTranslation } from "react-i18next";
import { info_booking_tour } from "@/utils/constants";
import { useFetchData } from "@/hooks/useFetchData";
import { getAddOnServices } from "@/api/hotel.api";
import SidebarRight from "@/apps/SidebarRightTour";

const AddonList = () => {
  const { t } = useTranslation();
  const infoBookingTour = getFromSessionStorage(info_booking_tour);
  const [addonServices, isLoadingAddon] = useFetchData(getAddOnServices, {
    supplierCode: infoBookingTour?.supplierCode,
  });

  return (
    <div
      className="accordion -simple row y-gap-20 js-accordion addonContainer"
      id="Addon"
    >
      <div className="row pt-30">
        <div className="col-xl-8 pr-0">
          {isLoadingAddon && (
            <div className="row mt-16">
              {[...Array(2)].map((_, index) => (
                <div className="col-md-6 mb-16" key={index}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          )}

          {addonServices && addonServices.length > 0 && (
            <>
              <div className="text-32 xl:text-26 lg:text-24 fw-700  mb-24 lg:mb-20 md:mb-16">
                {t("TOUR_ADDON.ADDON_SERVICE")}
              </div>
              <Services addonList={addonServices} />
            </>
          )}
        </div>
        <div className="col-xl-4 d-block xl:d-none">
          <SidebarRight />
        </div>
      </div>
    </div>
  );
};

export default AddonList;
