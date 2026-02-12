import { useNavigate } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import { useSelector } from "react-redux";
import { addDate, clearSessionStorage, formatDate } from "@/utils/utils";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import CardItem from "@/components/CardItem";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { info_booking, info_booking_tour } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useState } from "react";
import classNames from "classnames";

interface RelatedHotelsProps {
  isTour?: boolean;
}

const RelatedHotels = ({ isTour = false }: RelatedHotelsProps) => {
  const [searchParams] = useQueryParams();
  const navigate = useNavigate();
  const { relatedHotels, isLoadingRelatedHotels } = useSelector(
    (state) => state.hotel
  );
  const [swiperData, setSwiperData] = useState({
    activeIndex: 0,
    isEnd: false,
  });
  const {
    checkIn = formatDate(new Date()),
    checkOut = addDate(new Date(), 3),
    adults = 2,
    children = 0,
    room = 1,
    roomActive = 1,
  } = searchParams;

  const handleChooseHotel = (item: any) => {
    clearSessionStorage(info_booking);
    clearSessionStorage(info_booking_tour);

    if (isTour) {
      navigate(`/tour/${item?.slug}`);
      return;
    }
    navigate(
      `/hotels/${item?.slug}/?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&room=${room}&location=${item?.regionID}&roomActive=${roomActive}`
    );

    handleSetDefaultBooking({
      hotelCode: item?.supplierCode,
      hotelName: item?.supplierName,
      searchParams,
    });
  };

  if (isLoadingRelatedHotels) {
    return (
      <div className="row mt-16">
        {[...Array(4)].map((_, index) => (
          <div className="col-md-6 col-lg-4 col-xl-3 mb-16" key={index}>
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* <Slider {...settings}>
        {relatedHotels.length > 0 &&
          relatedHotels?.map((item: any, index: number) => (
            <CardItem
              data={item}
              handleChooseItem={handleChooseHotel}
              key={index}
            />
          ))}
      </Slider> */}
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
        onSlideChange={(swiper: any) => {
          setSwiperData({
            activeIndex: swiper.activeIndex,
            isEnd: swiper.isEnd,
          });
        }}
      >
        {relatedHotels.length > 0 &&
          relatedHotels?.map((item: any, index: number) => (
            <SwiperSlide
              key={`${item.value} ${index}`}
              className="cursor-pointer"
            >
              <CardItem
                data={item}
                handleChooseItem={handleChooseHotel}
                key={index}
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

export default RelatedHotels;
