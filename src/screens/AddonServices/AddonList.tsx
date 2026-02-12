import { info_booking } from "@/utils/constants";
import { getFromSessionStorage } from "@/utils/utils";
import Services from "./Services";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAddOnServices } from "@/features/hotel-detail/reducers";
import { useAppDispatch } from "@/store/hooks";
import SidebarRight from "@/components/Sidebar/SidebarRight";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { useTranslation } from "react-i18next";

const AddonList = () => {
  const { t } = useTranslation();
  const infoBooking = getFromSessionStorage(info_booking);
  const dispatch = useAppDispatch();
  const { isLoadingAddon, addonServices } = useSelector((state: any) => state.hotel);
  const services = infoBooking?.services || [];

  useEffect(() => {
    if (infoBooking) {
      dispatch(
        fetchAddOnServices({ supplierCode: infoBooking?.hotelInfo?.hotelCode }) as any
      );
    }
  }, []);

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
                {t("HOTEL_ADDON.ADDON_SERVICE")}
              </div>
              {services.map((item, index) => (
                <div
                  className="col-12 mb-20 lg:mb-15 md:mb-10"
                  key={`${item.serviceIDString}-${index}`}
                >
                  <div className="accordion__item py-20 border-light rounded-4">
                    <div
                      className="accordion__button d-flex justify-content-between"
                      aria-expanded={index === 0 ? true : false}
                      data-bs-toggle="collapse"
                      data-bs-target={`#Addon${item.serviceIDString}${index}`}
                    >
                      <div className="button d-block pl-10">
                        <div className="text-18 xl:text-16 lg:text-15 md:text-14 fw-400 text-neutral-500 text-left">
                          {t("COMMON.ROOM")} {index + 1}
                        </div>
                        <div className="text-24 xl:text-20 lg:text-18 md:text-16 fw-400 text-neutral-800 mt-10">
                          {item.serviceName}
                        </div>
                      </div>

                      <div className="accordion__text  flex-center  mr-20 lg:mr-15 md:mr-10">
                        <span className="text-14 lg:text-13 fw-400 text-primary-500">
                          {t("HOTEL_ADDON.VIEW_SERVICE")}
                        </span>
                        <span className="text-14 lg:text-13 fw-400 text-primary-500">
                          {t("HOTEL_ADDON.HIDE_SERVICE")}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`accordion-collapse collapse  border-top-light mt-15 ${
                        index === 0 && "show"
                      }`}
                      id={`Addon${item.serviceIDString}${index}`}
                      data-bs-parent="#Addon"
                    >
                      <div className="px-15 pt-15">
                        <Services addonList={addonServices} indexRoom={index} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
