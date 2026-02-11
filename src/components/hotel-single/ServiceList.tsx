import { useState } from "react";
import ServiceDetail from "./ServiceDetail";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  arrayWithUniqueObject,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { defaultServices, info_booking } from "@/utils/constants";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import useQueryParams from "@/hooks/useQueryParams";

const ServiceList = ({ roomID, roomName, source }: { roomID: any; roomName: any; source: any }) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [searchParams, setSearchParams] = useQueryParams();
  const { servicesRoom, roomActive, isLoadingService } =
    useSelector((state) => state.hotel) || {};
  const dispatch = useDispatch();

  const handleViewMore = () => {
    setIsViewMore(true);
  };
  const [countService, setCountService] = useState(1);

  const handleChooseService = (service) => {
    setCountService(1);
    const infoBooking = getFromSessionStorage(info_booking) as any;
    const servicesFromLocal = infoBooking?.services;
    const services = arrayWithUniqueObject(
      servicesFromLocal,
      {
        roomID,
        roomName,
        source,
        serviceID: service?.serviceID,
        serviceName: service?.serviceName || "",
        finalPrice: service?.finalPrice,
        isNeedApproval: service?.isNeedApproval,
      },
      +roomActive
    );

    // reset data rooms
    const numberRoomsAvaiable =
      services?.slice(roomActive, services.length)?.length || 0;
    const roomsExist = services?.slice(0, roomActive);

    const servicesEmpty =
      numberRoomsAvaiable > 0 ? defaultServices(numberRoomsAvaiable) : [];

    setToSessionStorage(info_booking, {
      ...infoBooking,
      services: roomsExist.concat(servicesEmpty),
      voucherApplies: infoBooking.voucherApplies || []
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
      {isLoadingService ? (
        <Skeleton count={5} />
      ) : (
        <div className="sidebar-checkbox">
          {servicesRoom?.slice(0, 3).map((service) => (
            <ServiceDetail
              key={service.serviceID}
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
                  key={service.serviceID}
                  service={service}
                  roomID={roomID}
                  roomName={roomName}
                  handleChooseService={handleChooseService}
                  setCountService={setCountService}
                  countService={countService}
                  source={source}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
