import { info_booking, objDefaultService } from "@/utils/constants";
import {
  arrayWithUniqueObject,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowPrice from "../price/ShowPrice";
import ShowQuantity from "../price/ShowQuantity";
import PromotionPrice from "@/components/promotion-price";
import ReturnPolicy from "../return-policy/ReturnPolicy";

interface ServiceItem {
  serviceID?: string;
  serviceName?: string;
  finalPrice?: number;
  listedPrice?: number;
  isNeedApproval?: boolean;
  paymentPolicy?: string;
  cancelPolicy?: string;
  timeNeedApproval?: string;
  includes?: string[];
  quantity?: number;
  discountPrice?: number;
  promotionPrice?: number;
  hasTags?: Array<{ code: string; name: string }> | any[];
  promotion?: number;
  memberPrice?: number;
  [key: string]: unknown;
}

interface BookingServiceItem {
  roomID?: string;
  roomName?: string;
  serviceID?: string;
  serviceName?: string;
  finalPrice?: number;
  isNeedApproval?: boolean;
  source?: string;
  addOn?: unknown[];
  [key: string]: unknown;
}

interface BookingSessionData {
  services?: BookingServiceItem[];
  voucherApplies?: unknown[];
  [key: string]: unknown;
}

interface ServiceDetailProps {
  service: ServiceItem;
  roomID: string;
  roomName: string;
  handleChooseService: (service: ServiceItem) => void;
  countService: number;
  setCountService: React.Dispatch<React.SetStateAction<number>>;
  source: string;
}

const ServiceDetail = ({
  service,
  roomID,
  roomName,
  handleChooseService,
  countService,
  setCountService,
  source,
}: ServiceDetailProps) => {
  const { roomActive } = useSelector((state) => state.hotel) || {};
  const infoBooking = getFromSessionStorage<BookingSessionData>(info_booking);
  const [isActive, setIsActive] = useState(
    service.serviceID === infoBooking?.services?.[roomActive - 1]?.serviceID
  );

  useEffect(() => {
    setIsActive(
      service.serviceID === infoBooking?.services?.[roomActive - 1]?.serviceID
    );
  }, [infoBooking, roomActive, service]);

  const setAddServiceToLocal = (location: number) => {
    const services = arrayWithUniqueObject(
      infoBooking?.services ?? [],
      {
        roomID,
        roomName,
        source,
        serviceID: service?.serviceID,
        serviceName: service?.serviceName || "",
        finalPrice: service?.finalPrice,
        isNeedApproval: service?.isNeedApproval,
      },
      location
    );
    setToSessionStorage(info_booking, { ...(infoBooking ?? {}), services, voucherApplies: infoBooking?.voucherApplies || [] });
    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);
  };
  const setMoveServiceToLocal = () => {
    const numberRoomsFilled =
      infoBooking?.services?.filter((item: BookingServiceItem) => item.roomID)?.length || 0;
    const services = infoBooking?.services?.map((item: BookingServiceItem, index: number) =>
      index + 1 === numberRoomsFilled ? objDefaultService : item
    );
    setToSessionStorage(info_booking, { ...(infoBooking ?? {}), services, voucherApplies: infoBooking?.voucherApplies || [] });
    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);
  };

  const incrementCount = (e: React.MouseEvent) => {
    e.stopPropagation();
    const servicesFromLocal = infoBooking?.services;
    if ((servicesFromLocal?.length ?? 0) === 0) return;
    const numberRoomsFilled = infoBooking?.services?.filter(
      (item: BookingServiceItem) => item.roomID
    )?.length ?? 0;
    const numberRoomAvaiables = infoBooking?.services?.filter(
      (item: BookingServiceItem) => !item.roomID
    )?.length ?? 0;
    if (numberRoomAvaiables === 0) {
      return;
    } else {
      if (
        countService === numberRoomAvaiables + 1 &&
        numberRoomsFilled === (servicesFromLocal?.length ?? 0)
      )
        return;
    }

    setCountService((prev) => prev + 1);
    setAddServiceToLocal(numberRoomsFilled + 1);
  };
  const decrementCount = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (countService === 1) return;
    setCountService((prev) => prev - 1);
    setMoveServiceToLocal();
  };

  return (
    <div
      className={`rounded-22 px-20 py-20 mt-3 cursor-pointer mt-10 ${
        isActive ? "border-blue-1" : "border-light"
      }`}
      onClick={() => handleChooseService(service)}
    >
      <div className="form-radio mb-5">
        <div className="radio d-flex items-center">
          <input
            type="radio"
            name="service"
            value={service.serviceID}
            checked={isActive}
            onChange={() => handleChooseService(service)}
          />
          <div className="radio__mark">
            <div className="radio__icon" />
          </div>
          <div className="ml-10 fw-500 text-16">{service.serviceName}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-7 mb-3 mb-md-0">
          <ReturnPolicy
            paymentPolicy={service?.paymentPolicy}
            cancelPolicy={service?.cancelPolicy}
            isNeedApproval={service?.isNeedApproval}
            timeNeedApproval={service?.timeNeedApproval}
          />
          <div
            className="bg-blue-light p-2 rounded-end ml-10"
            style={{ borderLeft: "2px solid var(--color-green-2)" }}
          >
            <p className="text-dark fw-500">Ưu đãi bao gồm</p>
            {(service.includes ?? []).map((item: string, index: number) => (
              <div key={index} className="d-flex align-items-top">
                <i className="icon-check text-green-2 text-12 ml-10 mt-5" />
                <span className="w-100 pl-10 text-14">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-xl-5 text-end d-flex flex-column justify-content-end items-end text-right">
          <ShowQuantity quantity={service?.quantity} />
          <ShowPrice
            discountPrice={service?.discountPrice}
            listedPrice={service?.listedPrice}
            promotionPrice={service?.promotionPrice}
            hasTags={service?.hasTags}
            finalPrice={service?.finalPrice}
          />
          <PromotionPrice
            promotion={service?.promotion || 0}
            memberPrice={service?.memberPrice || 0}
          />

          {isActive && (
            <div className="d-flex items-center js-counter mt-20">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
