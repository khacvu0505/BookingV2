/* eslint-disable no-undef */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import RatingComponent from "@/components/ratings/RatingSvg";

import classNames from "classnames";
import { createSearchParams, Link } from "react-router-dom";
import ShowQuantity from "@/components/ShowQuantity";
import { Gallery, Item } from "react-photoswipe-gallery";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import useQueryParams from "@/hooks/useQueryParams";
import "./HotelItem.style.scss";
import ShowPriceReal from "@/components/ShowPrice";
import Button from "@/components/Button";
import RatingInCard from "@/components/ratings/RatingInCard";
import RadomText from "@/screens/TourDetail/Tickets/RadomText";
import { useTranslation } from "react-i18next";

const HotelItem = ({ item }) => {
  const { t } = useTranslation();
  const [searchParams] = useQueryParams();
  const { checkIn, checkOut, adults, children, room, location } = searchParams;

  const paramsRedirect = createSearchParams({
    checkIn,
    checkOut,
    adults,
    children,
    room,
    location,
  }).toString();

  const handleClickFavourite = (hotel) => {
    // eslint-disable-next-line no-undef
    const selectionFired = new CustomEvent("setWishlistInfo", {
      detail: {
        supplierCode: hotel?.supplierCode,
        listedPrice: hotel?.listedPrice,
        finalPrice: hotel?.finalPrice,
        wishListID: hotel?.wishListID,
      },
    });

    // eslint-disable-next-line no-undef
    document.dispatchEvent(selectionFired);
  };
  const handleChooseHotel = (hotel) => {
    handleSetDefaultBooking({
      hotelCode: hotel?.supplierCode,
      hotelName: hotel?.supplierName,
      searchParams,
    });
    // window.open(
    //   `/hotels/${item?.slug}?${paramsRedirect}`
    //   "_blank",
    //   "noreferrer"
    // );
  };

  return (
    <div className="col-12 col-sm-6 col-md-12 cursor-pointer mt-12 mb-12 hotel_item">
      <div className="border-light rounded-8 px-10 py-10">
        <div className="d-flex justify-between items-center md:flex-column">
          <div className="d-flex md:flex-column md:w-1/1">
            <div className="lg:mb-24 mr-16 lg:mr-10 md:mr-0">
              <div
                className="cardImage rounded-8 w-240 h-240 hotel_item-image md:w-1/1"
                // ratio ratio-1:1 md:w-1/1
              >
                <div className="cardImage__content relative">
                  <div className="cardImage-slider  rounded-8 custom_inside-slider">
                    <Gallery>
                      <Swiper
                        className="mySwiper h-240 "
                        modules={[Pagination, Navigation]}
                        // pagination={{
                        //   clickable: true,
                        // }}
                        navigation={true}
                      >
                        {item?.thumb?.map((slide, i) => (
                          <SwiperSlide key={i}>
                            <Item
                              original={slide}
                              thumbnail={slide}
                              width={1024}
                              height={768}
                            >
                              {({ ref, open }) => (
                                <img
                                  src={slide}
                                  ref={ref as any}
                                  onClick={open}
                                  alt="image"
                                  role="button"
                                  className="rounded-8 col-12 js-lazy h-100 object-cover"
                                  loading="eager"
                                />
                              )}
                            </Item>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Gallery>
                    {!!item?.percentDiscount && item?.percentDiscount > 0 && (
                      <p className="absolute top-10 left-10 rounded-30 z-5 bg-primary-500 text-white px-6 text-16 fw-400">
                        -{item?.percentDiscount}%
                      </p>
                    )}
                    {item?.tag && (
                      <p className="absolute bottom-16 left-10 rounded-30 z-5 bg-primary-50 text-primary-500 px-6 text-16 fw-400">
                        {item?.tag}
                      </p>
                    )}
                  </div>
                </div>
                {/* End image */}

                <div className="cardImage__wishlist ">
                  <button
                    className={classNames(
                      "button -blue-1 bg-white size-40 rounded-full shadow-2 btn-wishlist",
                      {
                        "bg-blue-1 text-white": item?.wishListID > 0,
                      }
                    )}
                    onClick={() => handleClickFavourite(item)}
                  >
                    <i
                      className={classNames(
                        `icon-heart text-20 text-blue-1 fw-bold`,
                        {
                          "text-white": item?.wishListID > 0,
                        }
                      )}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div
              className="hotel_item-middle px-0"
              onClick={(e) => {
                e.stopPropagation();
                handleChooseHotel(item);
              }}
            >
              <div className="d-flex align-items-center lg:flex-column lg:items-start flex-wrap">
                <Link
                  // target="_blank"
                  to={`/hotels/${item?.slug}?${paramsRedirect}`}
                >
                  <p className="text-20 lg:text-17 md:text-16 lh-16 fw-500 mr-10 text-dark lg:mr-0 lg:text-truncate">
                    {item?.supplierName}
                  </p>
                </Link>

                <RatingComponent
                  stop={item?.class}
                  initialRating={item?.class}
                />
              </div>

              <div className="d-flex items-center xl:flex-column xl:items-start">
                <div className=" pt-0">
                  <p className="hotel_item-address text-truncate">
                    {item?.address}
                  </p>
                </div>

                <div className="">
                  <div className="hotel_item-distance d-flex items-center ">
                    <img
                      src="/images/HotelList/icon-location.png"
                      alt="hotel list okdimall "
                    />
                    <p className="text-truncate text-16 lg:text-14">
                      {item?.distanceCenter > 0
                        ? `${item?.distanceCenter} km ${t(
                            "HOTELS.TO_THE_CENTER"
                          )}`
                        : t("COMMON.CENTER")}{" "}
                    </p>
                  </div>
                </div>
              </div>
              {window.innerWidth > 768 && (
                <div className="hotel_item_room-info">
                  <div className="text-14 lh-15 mt-20">
                    <p className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800 ">
                      {item.roomName}
                    </p>
                  </div>

                  <div className="text-14 text-green-2 lh-15 mt-10">
                    {item?.cancelPolicyName && (
                      <div className="hotel_item_cancel_policy">
                        <img
                          src="/images/HotelList/icon-cancel-policy.png"
                          alt="hotel list okdimall"
                          width={16}
                          height={16}
                        />
                        <p className="text-16 fw-400 text-action-success ml-8 lg:text-15 md:text-14">
                          {item.cancelPolicyName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="text-right md:text-left lg:mb-16 md:mt-6 md:w-1/1"
            onClick={(e) => {
              e.stopPropagation();
              handleChooseHotel(item);
            }}
          >
            <RatingInCard
              voteStatus={item?.voteStatus}
              totalReview={item?.totalReview}
              votePoint={item?.votePoint}
            />

            <div className="d-flex flex-column items-end justify-content-end text-right mt-2 md:items-start">
              <div className="mb-10 lg:mb-6 lg:text-left">
                <ShowQuantity quantity={item?.quantity || 0} />
              </div>
              <div className="md:w-1/1 custom_show_price">
                <ShowPriceReal
                  listedPrice={item?.listedPrice}
                  finalPrice={item?.finalPrice}
                  promotionPrice={item?.promotionPrice}
                  memberPrice={item?.memberPrice}
                  discountPrice={item?.discountPrice}
                  promotion={item?.promotion}
                />
              </div>
            </div>

            {/* {window.innerWidth > 768 && ( */}
            <>
              <div className="w-100 d-flex justify-content-end mt-10 lg:mt-6">
                <Link
                  // target="_blank"
                  to={`/hotels/${item?.slug}?${paramsRedirect}`}
                  className="md:w-1/1"
                >
                  <Button className="md:w-1/1">{t("HOTELS.VIEW_NOW")}</Button>
                </Link>
              </div>
              <RadomText randomText={item?.randomText} className="mt-6" />
            </>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
