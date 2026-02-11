import GuestSearch from "./GuestSearch";
import DateSearch from "./DateSearch";
import { useDispatch } from "react-redux";
import { fetchRoomList } from "@/features/hotel-detail/reducers";
import {
  clearSessionStorage,
  formatDateCalendar,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import { defaultServices, info_booking } from "@/utils/constants";
import { useRef } from "react";
import useQueryParams from "@/hooks/useQueryParams";
import { setRoomActive } from "@/features/hotel-detail/hotelDetailSlice";

const Index = () => {
  const dataSearchRef = useRef<any>();
  const counterRef = useRef<any>();
  const [searchParams, setSearchParams] = useQueryParams();

  const dispatch = useDispatch();
  const handleSearch = () => {
    const infoBooking = getFromSessionStorage(info_booking) as any;
    const hotelInfo = infoBooking?.hotelInfo;

    const fromDate = dataSearchRef.current.dates[0];
    const toDate = dataSearchRef.current.dates[1];

    const rooms = +counterRef.current.dataCounter.room;
    const adults = +counterRef.current.dataCounter.adults;
    const children = +counterRef.current.dataCounter.children;

    const dataFilterToSession = {
      fromDate: formatDateCalendar(fromDate),
      toDate: formatDateCalendar(toDate),
      room: rooms,
      adults: adults,
      children: children,
    };

    const dataFilterToParams = {
      checkIn: formatDateCalendar(fromDate),
      checkOut: formatDateCalendar(toDate),
      room: rooms,
      adults: adults,
      children: children,
    };

    const params = {
      supplierCode: hotelInfo?.hotelCode,
      fromDate: formatDateCalendar(fromDate),
      toDate: formatDateCalendar(toDate),
      adult: adults,
      children: children,
      totalRoom: rooms,
    };
    (dispatch as any)(fetchRoomList(params));
    // if (+searchParams.room !== rooms) {
    clearSessionStorage(info_booking);
    const servicesDefault = defaultServices(rooms);
    setToSessionStorage(info_booking, {
      hotelInfo: {
        hotelCode: hotelInfo?.hotelCode,
        hotelName: hotelInfo?.hotelName,
        ...dataFilterToSession,
      },
      services: servicesDefault,
      voucherApplies: infoBooking.voucherApplies || []
    });
    setSearchParams({
      ...searchParams,
      ...dataFilterToParams,
      roomActive: 1,
    });
    dispatch(setRoomActive(1));
    // } else {
    //   const infoBooking = getFromSessionStorage(info_booking);
    //   setToSessionStorage(info_booking, {
    //     ...infoBooking,
    //     hotelInfo: {
    //       ...infoBooking.hotelInfo,
    //       ...dataFilterToSession,
    //     },
    //   });
    //   setSearchParams({
    //     ...searchParams,
    //     ...dataFilterToParams,
    //   });
    // }

    // eslint-disable-next-line no-undef
    const event = new Event("triggerSearch");
    // eslint-disable-next-line no-undef
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar w-100">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Ngày nhận - Ngày trả</h4>
            <DateSearch ref={dataSearchRef} />
          </div>
        </div>
        {/* End check-in-out */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <GuestSearch ref={counterRef} />
        {/* End guest */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <div className="button-item h-full">
          <button
            className="button -dark-1 px-35 h-40 col-12 bg-blue-1 text-white"
            onClick={handleSearch}
          >
            Kiểm tra tình trạng phòng
          </button>
        </div>
        {/* End search button_item */}
      </div>
      {/* End .col-12 */}
    </>
  );
};

export default Index;
