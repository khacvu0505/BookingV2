import { info_booking, objDefaultService } from "@/utils/constants";
import {
  arrayWithUniqueObject,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowQuantity from "@/components/ShowQuantity";
import ShowPrice from "@/components/ShowPrice";
import ReturnPolicy from "@/components/ReturnPolicy";
import isEmpty from "lodash/isEmpty";

const ServiceDetail = ({
  service,
  roomID,
  roomName,
  handleChooseService,
  countService,
  setCountService,
  source,
}: { service: any; roomID?: any; roomName?: any; handleChooseService: any; countService: any; setCountService: any; source: any }) => {
  const { roomActive } = useSelector((state: any) => state.hotel) || {};
  const infoBooking = getFromSessionStorage(info_booking);
  const [isActive, setIsActive] = useState(
    service.serviceIDString ===
      infoBooking.services[roomActive - 1].serviceIDString
  );
  const [isShowMore, setIsShowMore] = useState(false);

  useEffect(() => {
    setIsActive(
      service.serviceIDString ===
        infoBooking.services[roomActive - 1].serviceIDString
    );
  }, [infoBooking, roomActive, service]);

  const _setAddServiceToLocal = (location) => {
    const services = arrayWithUniqueObject(
      infoBooking.services,
      {
        roomID,
        roomName,
        source,
        serviceID: service?.serviceID,
        serviceName: service?.serviceName || "",
        finalPrice: service?.finalPrice,
        isNeedApproval: service?.isNeedApproval,
        serviceIDString: service?.serviceIDString,
        voucherCodes: service?.voucherCodes,
      },
      location
    );
    setToSessionStorage(info_booking, { ...infoBooking, services, voucherApplies: infoBooking.voucherApplies || [] });
    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);
  };
  const _setMoveServiceToLocal = () => {
    const numberRoomsFilled =
      infoBooking?.services?.filter((item) => item.roomID)?.length || 0;
    const services = infoBooking?.services?.map((item, index) =>
      index + 1 === numberRoomsFilled ? objDefaultService : item
    );
    setToSessionStorage(info_booking, { ...infoBooking, services, voucherApplies: infoBooking.voucherApplies || [] });
    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);
  };

  // TODO: comment code no remove
  // const incrementCount = (e) => {
  //   e.stopPropagation();
  //   const servicesFromLocal = infoBooking?.services;
  //   if (servicesFromLocal?.length === 0) return;
  //   const numberRoomsFilled = infoBooking?.services?.filter(
  //     (item) => item.roomID
  //   )?.length;
  //   const numberRoomAvaiables = infoBooking?.services?.filter(
  //     (item) => !item.roomID
  //   )?.length;
  //   if (numberRoomAvaiables === 0) {
  //     return;
  //   } else {
  //     if (
  //       countService === numberRoomAvaiables + 1 &&
  //       numberRoomsFilled === servicesFromLocal?.length
  //     )
  //       return;
  //   }

  //   setCountService((prev) => prev + 1);
  //   setAddServiceToLocal(numberRoomsFilled + 1);
  // };

  // const decrementCount = (e) => {
  //   e.stopPropagation();
  //   if (countService === 1) return;
  //   setCountService((prev) => prev - 1);
  //   setMoveServiceToLocal();
  // };

  const handleShowMoreService = () => {
    setIsShowMore(true);
  };

  const renderServiceOffer = useCallback((item, index) => {
    return (
      <div key={index} className="d-flex align-items-top">
        <i className="icon-check text-green-2 text-12 ml-10 mt-5" />
        <span className="w-100 pl-10 text-14 xl:text-13 fw-400 text-neutral-700">
          {item}
        </span>
      </div>
    );
  }, []);

  return (
    <div
      className={`rounded-16 px-20 xl:px-15 py-20 xl:py-15 cursor-pointer mt-10 ${
        isActive ? "border-blue-1" : "border-light"
      }`}
      onClick={() => handleChooseService(service)}
    >
      <div className="form-radio mb-5">
        <div className="radio d-flex items-center">
          <input
            type="radio"
            name="service"
            value={service.serviceIDString}
            checked={isActive}
            onChange={() => handleChooseService(service)}
          />
          <div className="radio__mark">
            <div className="radio__icon" />
          </div>
          <div className="ml-10 fw-500 text-16 xl:text-15 text-neutral-800">
            {service.serviceName}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-7 mb-3 mb-md-0">
          <div className=" fw-400 text-action-success text-14">
            <i className="icon-user text-16 xl:text-14 pr-10 text-action-success ml-10"></i>
            {service.totalAdult} người lớn, {service.totalChildren} trẻ em
          </div>
          <ReturnPolicy
            paymentPolicy={service?.paymentPolicy}
            cancelPolicy={service?.cancelPolicy}
            isNeedApproval={service?.isNeedApproval}
            timeNeedApproval={service?.timeNeedApproval}
            isOutline={true}
          />
          <div
            className="bg-blue-light p-2 rounded-end ml-10"
            style={{ borderLeft: "2px solid var(--color-green-2)" }}
          >
            <span className="text-neutral-800 fw-500 mr-10 text-18 xl:text-16">
              Ưu đãi bao gồm
            </span>
            {!isShowMore && service?.includes?.length > 5 && (
              <span
                className="text-16 lg:text-14 fw-400 text-primary-500 italic cursor-pointer"
                onClick={handleShowMoreService}
              >
                Xem chi tiết
              </span>
            )}

            {!isEmpty(service?.includes) &&
              service?.includes
                ?.slice(0, 5)
                ?.map((item, index) => renderServiceOffer(item, index))}
            {isShowMore &&
              service?.includes
                ?.slice(5)
                ?.map((item, index) => renderServiceOffer(item, index))}
          </div>
        </div>
        <div className="col-xl-5 text-end d-flex gap-2 flex-column justify-content-end items-end ">
          <div className="lg:w-1/1 text-start pt-1">
            <ShowQuantity quantity={service?.quantity} />
          </div>
          <ShowPrice
            listedPrice={service?.listedPrice}
            finalPrice={service?.finalPrice}
            promotionPrice={service?.promotionPrice}
            discountPrice={service?.discountPrice}
            memberPrice={service?.memberPrice}
            // hasTags={service?.hasTags}
          />
          {/* <PromotionPrice
            promotion={service?.promotion || 0}
            memberPrice={service?.memberPrice || 0}
          /> */}

          {/* TODO: comment code no remove */}
          {/* {isActive && (
            <div className="lg:w-1/1 d-flex items-center js-counter mt-10">
              <button
                className="button -outline-blue-1 text-blue-1 size-20 rounded-4 js-down"
                onClick={(e) => decrementCount(e)}
              >
                <i className="icon-minus text-12" />
              </button>
              <div className="flex-center size-20 ml-15 mr-15">
                <div className="text-15 js-count">{countService}</div>
              </div>
              <button
                className="button -outline-blue-1 text-blue-1 size-20 rounded-4 js-up"
                onClick={(e) => incrementCount(e)}
              >
                <i className="icon-plus text-12" />
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
