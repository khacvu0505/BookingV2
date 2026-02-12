import { useState } from "react";
import ServiceDetail from "./ServiceDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  fillArrayWithObject,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { info_booking } from "@/utils/constants";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import useQueryParams from "@/hooks/useQueryParams";

const ServiceList = ({ roomID, roomName, source, roomIdButtonChoose }: { roomID: any; roomName: any; source: any; roomIdButtonChoose?: any }) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [searchParams, setSearchParams] = useQueryParams();
  const { servicesRoom, roomActive } =
    useSelector((state) => state.hotel) || {};
  const dispatch = useDispatch();

  const handleViewMore = () => {
    setIsViewMore(true);
  };
  const [countService, setCountService] = useState(1);

  const handleChooseService = (service) => {
    setCountService(1);
    const infoBooking = getFromSessionStorage(info_booking);
    const servicesFromLocal = infoBooking?.services;

    // TODO: reset data rooms( increase 1 for each choose room)
    // const services = arrayWithUniqueObject(
    //   servicesFromLocal,
    //   {
    //     roomID,
    //     roomName,
    //     source,
    //     serviceID: service?.serviceID,
    //     serviceName: service?.serviceName || "",
    //     finalPrice: service?.finalPrice,
    //     isNeedApproval: service?.isNeedApproval,
    //     serviceIDString: service?.serviceIDString,

    //   },
    //   +roomActive
    // );

    // const numberRoomsAvaiable =
    //   services?.slice(roomActive, services.length)?.length || 0;
    // const roomsExist = services?.slice(0, roomActive);

    // const servicesEmpty =
    //   numberRoomsAvaiable > 0 ? defaultServices(numberRoomsAvaiable) : [];

    // setToSessionStorage(info_booking, {
    //   ...infoBooking,
    //   services: roomsExist.concat(servicesEmpty),
    // });

    // reset data rooms( increase the same service for all rooms)
    const services = fillArrayWithObject(servicesFromLocal, {
      roomID,
      roomName,
      source,
      serviceID: service?.serviceID,
      serviceName: service?.serviceName,
      finalPrice: service?.finalPrice,
      isNeedApproval: service?.isNeedApproval,
      serviceIDString: service?.serviceIDString,
      voucherCodes: service?.voucherCodes,
    });

    setToSessionStorage(info_booking, {
      ...infoBooking,
      services,
      voucherApplies: service.voucherApplies || []
    });

    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);

    setSearchParams({
      ...searchParams,
      roomActive: roomActive,
    });
    dispatch(setRoomActive(roomActive));
  };

  return (
    <div>
      <div className="sidebar-checkbox">
        {servicesRoom?.slice(0, 3).map((service) => (
          <ServiceDetail
            key={service.serviceIDString}
            service={service}
            roomID={roomID}
            roomName={roomName}
            handleChooseService={handleChooseService}
            setCountService={setCountService}
            countService={countService}
            source={source}
          />
        ))}
        {servicesRoom?.length > 3 && !isViewMore && (
          <div className="w-100 d-flex justify-content-center">
            <button className="button text-blue-1" onClick={handleViewMore}>
              Xem thêm
            </button>
          </div>
        )}
        {isViewMore &&
          servicesRoom
            ?.slice(3)
            .map((service) => (
              <ServiceDetail
                key={service.serviceIDString}
                service={service}
                handleChooseService={handleChooseService}
                setCountService={setCountService}
                countService={countService}
                source={source}
              />
            ))}
      </div>
    </div>
  );
};

export default ServiceList;
