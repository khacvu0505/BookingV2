import useQueryParams from "@/hooks/useQueryParams";
import { getFromSessionStorage } from "@/utils/utils";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { info_booking } from "@/utils/constants";
import { lazy, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { fetchServicesByRoom } from "@/features/hotel-detail/reducers";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";

const SkeletonList = lazy(() => import("@/components/Skeleton/SkeletonList"));
const RoomDetail = lazy(() => import("./RoomDetail"));

const RoomList = ({ hotelsData }) => {
  const [searchParams] = useQueryParams();
  const dispatch = useAppDispatch();
  const infoBooking = getFromSessionStorage(info_booking);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoadingRoomList } = useSelector((state: any) => state.hotel);

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
        // { replace: true }
      );
      dispatch(setRoomActive(searchParams.roomActive || 1));
    }
  }, []);

  const handleChoose = (room) => {
    dispatch(
      fetchServicesByRoom({
        roomID: room?.roomID,
        roomName: room?.roomName,
        source: room?.source,
        searchParams,
      })
    );
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
          />
        ))
      )}
    </div>
  );
};

export default RoomList;
