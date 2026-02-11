import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import { addDate, formatCurrency, formatDate } from "@/utils/utils";
import classNames from "classnames";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import Swiper, { Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";
import RatingComponent from "../rating";

const ToursOld = () => {
  const { recommendHotels, isLoadingRecommendHotels } = useSelector(
    (state) => state.hotels
  );
  const { currentCurrency } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const handleClickFavourite = (hotel) => {
    // eslint-disable-next-line no-undef
    const selectionFired = new CustomEvent("setWishlistInfo", {
      detail: {
        supplierCode: hotel?.supplierCode,
        listedPrice: hotel?.listedPrice,
        finalPrice: hotel?.finalPrice,
        wishListID: hotel?.wishListID,
        isRecommend: true,
      },
    });

    // eslint-disable-next-line no-undef
    document.dispatchEvent(selectionFired);
  };

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

  if (isLoadingRecommendHotels) {
    return (
      <div
        style={{
          marginTop: "60px",
        }}
      >
        <Skeleton wrapper={"div" as any} className={"w-full"} height={250} />
        <Skeleton count={3} />
      </div>
    );
  }

  return (
    <Swiper
      spaceBetween={30}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: ".js-tour-discounts-next",
        prevEl: ".js-tour-discounts-prev",
      }}
      pagination={{
        el: ".js-tour-discount-pagination",
        clickable: true,
      }}
      breakpoints={{
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 22,
        },
        1024: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
    >
      {recommendHotels?.length > 0 &&
        recommendHotels?.map((item, index) => (
          <SwiperSlide
            key={item?.slug}
            className={classNames("pr-10", {
              // "w-300": recommendHotels?.length === 1,
            })}
          >
            <div key={item?.slug} data-aos="fade" data-aos-delay={100}>
              <div className="tourCard -type-1 rounded-22 cursor-pointer mx-0 my-0  shadow-5 w-100">
                <div className="tourCard__image">
                  <div className="cardImage ratio ratio-1:1">
                    <div className="cardImage__content rounded-22">
                      <div className="cardImage-slider overflow-hidden custom_inside-slider h-100">
                        <Swiper
                          className=" h-100"
                          modules={[Pagination, Navigation]}
                          pagination={{
                            clickable: true,
                          }}
                          navigation={true}
                        >
                          {item?.thumb?.map((slide, i) => (
                            <SwiperSlide key={i}>
                              <img
                                className="col-12 js-lazy h-100 object-cover"
                                src={slide}
                                alt="image"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>

                  <div className="cardImage__wishlist">
                    <button
                      className={classNames(
                        "button -blue-1 bg-white size-30 rounded-full shadow-2",
                        {
                          "bg-blue-1 text-white": item?.wishListID > 0,
                        }
                      )}
                      onClick={() => handleClickFavourite(item)}
                    >
                      <i className="icon-heart text-12" />
                    </button>
                  </div>
                </div>

                <div className=" max-h-220 d-flex flex-column justify-content-between px-10 py-10">
                  <div
                    className="tourCard__content "
                    onClick={(e) => handleChooseHotel(item)}
                  >
                    <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500 text-truncate-2">
                      <span>{item?.supplierName}</span>
                    </h4>
                    <div className="d-flex align-items-center">
                      <RatingComponent
                        stop={item?.class}
                        initialRating={item?.class}
                      />
                    </div>
                    <p className="lh-12 text-12 text-light-1 text-right w-100 text-truncate text-start">
                      <i className="icon-location-pin text-12 mr-5" />
                      {item?.address}
                    </p>

                    <div className="d-flex items-center mt-10">
                      <div className="flex-center bg-blue-1 rounded-full size-30 text-12 fw-600 text-white">
                        {item?.votePoint}
                      </div>
                      <div className="text-14 text-dark-1 fw-500 ml-10">
                        {item?.voteStatus}
                      </div>
                      {item?.totalReview > 0 && (
                        <div className="text-13 text-light-1 ml-10">
                          {item?.totalReview} đánh giá
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-end ">
                    {item?.finalPrice < item?.listedPrice && (
                      <span className={`line-through`}>
                        {formatCurrency(item?.listedPrice) + currentCurrency}
                      </span>
                    )}

                    <div className="text-20 lh-12 fw-600 ml-5 text-danger">
                      {formatCurrency(item?.finalPrice)} {currentCurrency}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ToursOld;
