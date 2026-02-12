import {
  formatCurrency,
  getFromSessionStorage,
} from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import DetailModal from "@/components/AddonServicesPage/DetailModal";
import { useSelector } from "react-redux";
import "@/components/AddonServicesPage/AddonServices.styles.scss";
import { useTranslation } from "react-i18next";
import { info_booking_tour } from "@/utils/constants";
import { handleSetAddonTour } from "@/utils/handleSetDefaultBooking";

const ServiceDetail = ({ service }) => {
  const { t } = useTranslation();
  const detailModalRef = useRef<any>();
  const { currentCurrency } = useSelector((state: any) => state.app);
  const infoBookingTour = getFromSessionStorage(info_booking_tour);

  const [activeCheck, setActiveCheck] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (infoBookingTour?.addons?.length > 0) {
      const addon = infoBookingTour?.addons?.find(
        (item) => item.serviceID === service.serviceID
      );
      if (addon) {
        setActiveCheck(true);
        setCount(addon.count);
      }
    }
    return () => setActiveCheck(false);
  }, []);

  const handleDetail = () => {
    detailModalRef?.current?.setIsVisible(true);
  };

  const incrementCount = () => {
    setCount(count + 1);
    handleSetAddonTour(service, count + 1, activeCheck);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
      handleSetAddonTour(service, count - 1, activeCheck);
    }
  };

  const handleCheckAddon = (e) => {
    const { checked } = e.target;
    setActiveCheck(checked);
    handleSetAddonTour(service, count, checked);
  };

  return (
    <div
      className="blogCard relative h-420 rounded-20  -type-1 d-block mb-15"
      style={{
        boxShadow: "0px 2px 2px 0px #00000040",
      }}
    >
      <div className="blogCard__image">
        <div className="rounded-top-left-20 rounded-top-right-20 addonImage">
          <img
            className="object-cover w-100 img-fluid h-250 rounded-top-left-20 rounded-top-right-20"
            src={service?.thumb}
            alt="service-addon"
          />
          <div className=" checkBoxAddon rounded-circle">
            <div className="form-checkbox d-flex  align-items-center ">
              <input
                type="checkbox"
                checked={activeCheck}
                onChange={handleCheckAddon}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="px-15 py-15 rounded-20 absolute w-100 bg-white "
        style={{
          bottom: "0px",
        }}
      >
        <h4 className="text-neutral-800 text-18 lg:text-16 fw-500 text-truncate">
          {service?.serviceName}
        </h4>

        <div className="tooltip mt-5">
          <div className="text-12 fw-400 text-neutral-300 text-truncate-2">
            {service?.description}
          </div>
          <span className="tooltiptext">{service?.description}</span>
        </div>
        <button
          className="button text-12 fw-400 text-primary-500 underline mb-10 italic"
          onClick={handleDetail}
        >
          {t("HOTEL_ADDON.DETAIL")}
        </button>
        <div className="h-40">
          <div
            className={` ${
              service?.listedPrice > 0
                ? "text-16"
                : "text-20 text-danger fw-500"
            } mt-5 `}
          >
            {service?.listedPrice > 0 &&
              service?.listedPrice > service?.finalPrice && (
                <span className="line-through">
                  {formatCurrency(service?.listedPrice)} {currentCurrency}
                </span>
              )}
          </div>
          <div className="text-20 lg:text-18 lh-12 fw-600 mt-5 text-danger">
            {formatCurrency(service?.finalPrice)} {currentCurrency}{" "}
            <span className="text-12">/ {service?.unit}</span>
          </div>
        </div>

        <div className="row justify-content-end mt-10 w-100 align-items-center h-20">
          {activeCheck && (
            <div className="col-auto px-0">
              <div className="d-flex justify-content-center items-center js-counter">
                <button
                  className="button -outline-blue-1 text-blue-1 size-20 rounded-4 js-down"
                  onClick={decrementCount}
                >
                  <i className="icon-minus text-12" />
                </button>
                <div className="flex-center size-20 ml-15 mr-15">
                  <div className="text-15 js-count">{count}</div>
                </div>
                <button
                  className="button -outline-blue-1 text-blue-1 size-20 rounded-4 js-up"
                  onClick={incrementCount}
                >
                  <i className="icon-plus text-12" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DetailModal
        ref={detailModalRef}
        addonName={service?.serviceName}
        includes={service?.includes.length > 0 && service?.includes}
      />
    </div>
  );
};

export default ServiceDetail;
