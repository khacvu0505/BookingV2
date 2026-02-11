import { createSearchParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import { addDate, formatDate } from "@/utils/utils";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import CardItem from "@/apps/CardItem";
import classNames from "classnames";
import { useState } from "react";

const HotelList = () => {
  const { recommendHotels } = useSelector((state) => state.hotels);
  const navigate = useNavigate();
  const [swiperData, setSwiperData] = useState({
    activeIndex: 0,
    isEnd: false,
  });

  const handleChooseHotel = (item) => {
    const searchParams = {
      checkIn: formatDate(new Date()),
      checkOut: addDate(new Date(), 3),
      adults: 2,
      children: 0,
      room: 1,
      location: item?.regionID,
      roomActive: 1,
    };
    navigate({
      pathname: `/hotels/${item?.slug}`,
      search: createSearchParams(searchParams as any).toString(),
    });
    handleSetDefaultBooking({
      hotelCode: item?.supplierCode,
      hotelName: item?.supplierName,
      searchParams,
    });
  };
  const handleVoucher = (e, value) => {
    e.preventDefault();
    navigate(`/promotions?page=1&pageSize=10&voucherGroup=${value}`);
  };

  if (!recommendHotels?.length) {
    return <div className="text-center"></div>;
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={20}
        className="overflow-hidden z-0 px-10"
        modules={[Navigation]}
        navigation={{
          nextEl: ".js-top-desti2-next_active",
          prevEl: ".js-top-desti2-prev_active",
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
          },
          1600: {
            slidesPerView: 4,
          },
        }}
        onSlideChange={(swiper) => {
          setSwiperData({
            activeIndex: swiper.activeIndex,
            isEnd: swiper.isEnd,
          });
        }}
      >
        {recommendHotels?.length > 0 &&
          recommendHotels?.map((item, index) => (
            <SwiperSlide
              key={`${item.value} ${index}`}
              className="cursor-pointer"
            >
              <CardItem
                key={item.id}
                data={item}
                handleChooseItem={handleChooseHotel}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <button
        className={classNames(
          "section-slider-nav -prev flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1 js-top-desti2-prev_active",
          {
            "d-none": swiperData?.activeIndex === 0,
          }
        )}
      >
        <i className="icon icon-chevron-left text-13 text-blue-1" />
      </button>
      <button
        className={classNames(
          "section-slider-nav -next flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1 js-top-desti2-next_active",
          {
            "d-none": swiperData?.isEnd,
          }
        )}
      >
        <i className="icon icon-chevron-right text-13 text-blue-1" />
      </button>
    </div>
  );
};

export default HotelList;
