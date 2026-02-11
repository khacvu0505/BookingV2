import { formatCurrency } from "@/utils/utils";
import { useMemo, useRef } from "react";
import DetailModal from "./DetailModal";
import { handleSetAddon } from "@/utils/handleSetDefaultBooking";
import { useSelector } from "react-redux";

const ServiceDetail = ({
  service,
  handleCheckAddon,
  roomActiveInfo,
  setRoomActiveInfo,
  indexRoom,
}) => {
  const detailModalRef = useRef<any>();
  const { currentCurrency } = useSelector((state) => state.app);

  const handleDetail = () => {
    detailModalRef?.current?.setIsVisible(true);
  };
  const findAddon = useMemo(() => {
    return roomActiveInfo?.addOn?.find(
      (item) => item?.serviceID === service?.serviceID
    );
  }, [roomActiveInfo, service?.serviceID]);
  const incrementCount = () => {
    const services = handleSetAddon(
      service,
      indexRoom,
      findAddon?.count + 1,
      false
    );
    setRoomActiveInfo(services[indexRoom]);
  };
  const decrementCount = () => {
    const services = handleSetAddon(
      service,
      indexRoom,
      findAddon?.count > 1 ? findAddon?.count - 1 : findAddon?.count,
      false
    );
    setRoomActiveInfo(services[indexRoom]);
  };
  const isRoomActive = useMemo(() => {
    return roomActiveInfo?.addOn?.some(
      (item) => item?.serviceID === service?.serviceID
    );
  }, [roomActiveInfo, service?.serviceID]);
  return (
    <div className="blogCard -type-1 d-block border-light mb-15">
      <div className="blogCard__image">
        <div className="rounded-8">
          <img
            className="object-cover w-100 img-fluid h-200 "
            src={service?.thumb}
            alt="service-addon"
          />
        </div>
      </div>
      <div className="px-15 py-15">
        <h4 className="text-dark-1 text-18 fw-500 text-truncate">
          {service?.serviceName}
        </h4>

        <div className="tooltip mt-5">
          <div className="text-13 text-truncate-2">{service?.description}</div>
          <span className="tooltiptext">{service?.description}</span>
        </div>
        <div className="h-65">
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
          <div className="text-20 lh-12 fw-600 mt-5 text-danger">
            {formatCurrency(service?.finalPrice)} {currentCurrency}{" "}
            <span className="text-12">/ {service?.unit}</span>
          </div>
        </div>

        <div className="row justify-content-between mt-10 w-100 align-items-center">
          <button
            className="button col-auto text-13 text-blue-1"
            onClick={handleDetail}
          >
            <i className="icon-notification text-12 mr-5" />
            Chi tiết
          </button>
          {isRoomActive && (
            <div className="col-auto">
              <div className="d-flex justify-content-center items-center js-counter">
                <button
                  className="button -outline-blue-1 text-blue-1 size-20 rounded-4 js-down"
                  onClick={decrementCount}
                >
                  <i className="icon-minus text-12" />
                </button>
                <div className="flex-center size-20 ml-15 mr-15">
                  <div className="text-15 js-count">{findAddon?.count}</div>
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
          <div className="col-auto form-checkbox d-flex p-0 align-items-center">
            <input
              type="checkbox"
              checked={isRoomActive}
              onChange={() => handleCheckAddon(service)}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-17 ml-10 text-blue-1">Thêm</div>
          </div>
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
