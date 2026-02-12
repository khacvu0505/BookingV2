import useQueryParams from "@/hooks/useQueryParams";
import {
  cleanedObject,
  fillArrayWithObject,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { useAppDispatch } from "@/store/hooks";
import { info_booking } from "@/utils/constants";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
import { getServicesByRoom } from "@/api/hotel.api";
import { useMutation } from "@tanstack/react-query";

const SkeletonList = dynamic(() => import("@/components/Skeleton/SkeletonList"));
const RoomDetail = dynamic(() => import("./RoomDetail"));

const RoomList = ({ hotelsData, isLoadingRoomList = false }) => {
  const [searchParams] = useQueryParams();
  const dispatch = useAppDispatch();
  const infoBooking = getFromSessionStorage(info_booking);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [servicesRoom, setServicesRoom] = useState([]);

  const servicesMutation = useMutation({
    mutationFn: async ({
      roomID,
      roomName,
      source,
      searchParams: sp,
      isRefreshServiceRoom = false,
    }: {
      roomID: any;
      roomName: any;
      source: any;
      searchParams: Record<string, any>;
      isRefreshServiceRoom?: boolean;
    }) => {
      if (!roomID) return;
      const infoBookingCurrent: any = getFromSessionStorage(info_booking);
      const roomActive = +sp.roomActive;
      const params = {
        roomID,
        fromDate: sp.checkIn,
        toDate: sp.checkOut,
      };
      let servicesRoomRes: any = null;
      try {
        servicesRoomRes = await getServicesByRoom(cleanedObject(params));
      } catch (error) {
        console.log("error", error);
      }
      if (!isRefreshServiceRoom) {
        const rootData =
          infoBookingCurrent.services[roomActive - 1] &&
          infoBookingCurrent.services[roomActive - 1].roomID === roomID
            ? infoBookingCurrent.services[roomActive - 1]
            : servicesRoomRes.data[0];

        const services = fillArrayWithObject(infoBookingCurrent.services, {
          roomID,
          roomName,
          source,
          serviceID: rootData?.serviceID,
          serviceName: rootData?.serviceName,
          finalPrice: rootData?.finalPrice,
          listedPrice: rootData?.listedPrice,
          isNeedApproval: rootData?.isNeedApproval,
          serviceIDString: rootData?.serviceIDString,
          voucherCodes: rootData?.voucherCodes,
        });
        setToSessionStorage(info_booking, {
          ...infoBookingCurrent,
          services,
          voucherApplies: rootData.voucherApplies || [],
        });
      } else {
        if (infoBookingCurrent?.services?.length > 0) {
          let servicesUpdate: any = null;
          infoBookingCurrent.services.map((item: any) => {
            const serviceNew = servicesRoomRes.data.find(
              (service: any) => service.serviceIDString === item.serviceIDString
            );

            if (!serviceNew) {
              servicesUpdate = null;
            } else {
              servicesUpdate = {
                roomID,
                roomName,
                source,
                serviceID: serviceNew?.serviceID,
                serviceName: serviceNew?.serviceName,
                finalPrice: serviceNew?.finalPrice,
                listedPrice: serviceNew?.listedPrice,
                isNeedApproval: serviceNew?.isNeedApproval,
                addOn: [],
                serviceIDString: serviceNew?.serviceIDString,
                voucherCodes: serviceNew?.voucherCodes,
              };
            }
            if (servicesUpdate) {
              const infoBookingNew: any = getFromSessionStorage(info_booking);
              setToSessionStorage(info_booking, {
                ...infoBookingNew,
                services: infoBookingNew?.services.map((service: any) => {
                  if (
                    service.serviceIDString === servicesUpdate?.serviceIDString
                  ) {
                    return servicesUpdate;
                  }
                  return service;
                }),
                voucherApplies: infoBookingNew.voucherApplies || [],
              });
            }
          });
        }
      }

      const event = new Event("triggerSearch");
      window.dispatchEvent(event);
      return servicesRoomRes.data;
    },
    onSuccess: (data) => {
      if (data) {
        setServicesRoom(data);
      }
    },
  });

  useEffect(() => {
    if (!infoBooking) {
      navigate(
        {
          pathname,
          search: createSearchParams({
            ...searchParams,
            roomActive: searchParams.roomActive || 1,
          } as any).toString(),
        }
      );
      dispatch(setRoomActive(searchParams.roomActive || 1));
    }
  }, []);

  // Refresh services on mount (equivalent to HotelDetail initial refresh)
  useEffect(() => {
    const ib = getFromSessionStorage(info_booking) as any;
    if (ib?.services?.length > 0) {
      ib.services.map((item: any) => {
        servicesMutation.mutate({
          roomID: item?.roomID,
          roomName: item?.roomName,
          source: item?.source,
          searchParams,
          isRefreshServiceRoom: true,
        });
      });
    }
  }, []);

  const handleChoose = (room) => {
    servicesMutation.mutate({
      roomID: room?.roomID,
      roomName: room?.roomName,
      source: room?.source,
      searchParams,
    });
  };

  return (
    <div>
      {isLoadingRoomList ? (
        <SkeletonList count={5} />
      ) : (
        hotelsData &&
        typeof hotelsData === "object" &&
        hotelsData?.map((item) => (
          <RoomDetail
            hotel={item}
            key={item?.roomID}
            handleChoose={handleChoose}
            servicesRoom={servicesRoom}
            isLoadingService={servicesMutation.isPending}
          />
        ))
      )}
    </div>
  );
};

export default RoomList;
