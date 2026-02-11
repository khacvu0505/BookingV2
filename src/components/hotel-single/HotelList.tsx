import useQueryParams from "@/hooks/useQueryParams";
import HotelDetail from "./HotelDetail";
import { getFromSessionStorage } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { info_booking } from "@/utils/constants";
import { useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { fetchServicesByRoom } from "@/features/hotel-detail/reducers";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";
// import Skeleton from "react-loading-skeleton";
import SkeletonList from "@/apps/SkeletonList";

const HotelList = ({ hotelsData }: { hotelsData: any }) => {
  const [searchParams] = useQueryParams();
  const dispatch = useDispatch();
  const infoBooking = getFromSessionStorage(info_booking);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoadingRoomList } = useSelector((state) => state.hotel);

  useEffect(() => {
    if (!infoBooking) {
      navigate(
        {
          pathname,
          search: createSearchParams({
            ...searchParams,
            roomActive: searchParams.roomActive || "1",
          } as any).toString(),
        }
        // { replace: true }
      );
      dispatch(setRoomActive(Number(searchParams.roomActive) || 1));
    }
  }, []);

  const handleChoose = (room) => {
    (dispatch as any)(
      fetchServicesByRoom({
        roomID: room?.roomID,
        roomName: room?.roomName,
        searchParams: searchParams as any,
      } as any)
    );
  };

  return (
    <div>
      {/* <div className="border-light-2 rounded-22 py-10 px-20 bg-gray-1">
        <div className="fs-17 fw-500">
          Chọn phòng {searchParams.roomActive || 1}/{searchParams.room}
        </div>
      </div> */}
      {isLoadingRoomList ? (
        <SkeletonList count={5} />
      ) : (
        hotelsData &&
        typeof hotelsData === "object" &&
        hotelsData?.map((item) => (
          <HotelDetail
            hotel={item}
            key={item?.roomID}
            handleChoose={handleChoose}
          />
        ))
      )}
    </div>
  );
};

export default HotelList;
