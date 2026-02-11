import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import toursData from "../../data/tours";
import isTextMatched from "../../utils/isTextMatched";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  addDate,
  formatCurrency,
  formatDate,
  renderStars,
} from "@/utils/utils";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import classNames from "classnames";
import RatingComponent from "../rating";
import PromotionPrice from "@/components/promotion-price";
import { Gallery, Item } from "react-photoswipe-gallery";
import "./Tour3.style.scss";
import useWindowSize from "@/utils/useWindowSize";

const Tours3 = () => {
  const { recommendHotels } = useSelector((state) => state.hotels);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { currentCurrency } = useSelector((state) => state.app);

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

  return (
    <>
      <div className="lg:d-block d-flex">
        {recommendHotels?.length > 0
          ? recommendHotels?.slice(0, 3)?.map((item, index) => (
              <div
                key={index}
                data-aos="fade"
                data-aos-delay={100}
                className="mt-30 mt-lg-60 px-10"
                style={{ width: width > 992 && "calc(100% / 3)" }}
              >
                <div className="tourCard -type-1 rounded-22 cursor-pointer mx-0 my-0 w-100 tour3-custom ">
                  <div className="tourCard__image">
                    <div className="cardImage ratio ratio-4:3">
                      <div className="cardImage__content rounded-22">
                        <div className="cardImage-slider overflow-hidden custom_inside-slider h-100">
                          <Gallery>
                            <Swiper
                              className="h-100"
                              modules={[Pagination, Navigation]}
                              pagination={{
                                clickable: true,
                              }}
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
                                        ref={ref as any}
                                        onClick={open}
                                        className="col-12 h-100 object-contain"
                                        src={slide}
                                        alt="image"
                                      />
                                    )}
                                  </Item>
                                  {/* <img
                                  className="col-12 js-lazy h-100 object-cover"
                                  src={slide}
                                  alt="image"
                                /> */}
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </Gallery>
                        </div>
                      </div>
                    </div>

                    <div className="cardImage__wishlist absolute">
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

                  <div
                    className="d-flex flex-column justify-content-between px-10 py-10 bg-white max-h-270"
                    style={{
                      borderBottomLeftRadius: "22px",
                      borderBottomRightRadius: "22px",
                    }}
                  >
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
                      <p className="lh-12 text-12 text-light-1 text-right w-100 text-truncate text-start text-dark">
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
                          <div className="text-13 text-light-1 ml-10 text-dark">
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
                      {item?.discountPrice <= 0 && (
                        <div className="text-20 lh-12 fw-600 ml-5 text-danger">
                          {formatCurrency(item?.finalPrice)} {currentCurrency}{" "}
                        </div>
                      )}
                      <div className="mt-10">
                        <PromotionPrice
                          promotion={item?.promotion || {}}
                          memberPrice={item?.memberPrice || 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default Tours3;
