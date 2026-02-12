/* eslint-disable no-undef */
// import { hotelsData } from "../../../data/hotels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import useQueryParams from "@/hooks/useQueryParams";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import ShowPrice from "@/components/price/ShowPrice";
import RatingComponent from "@/components/ratings/RatingSvg";
import { setWishlistInfo, reset } from "@/features/app/appSlice";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import ShowQuantity from "@/components/price/ShowQuantity";
import PromotionPrice from "@/components/promotion-price";
import { Gallery, Item } from "react-photoswipe-gallery";

const HotelProperties = () => {
  const [searchParams] = useQueryParams();
  const { checkIn, checkOut, adults, children, room, location } = searchParams;
  const _navigate = useNavigate();
  const hotelList = useSelector((state) => state.hotels.hotels) || [];
  const isLoadingHotels =
    useSelector((state) => state.hotels.isLoadingHotels) || false;

  const _dispatch = useDispatch();
  const paramsRedirect = createSearchParams({
    checkIn,
    checkOut,
    adults,
    children,
    room,
    location,
  }).toString();

  const handleChooseHotel = (hotel) => {
    // navigate({
    //   pathname: `/hotels/${hotel?.slug}`,
    //   search: createSearchParams({
    //     checkIn,
    //     checkOut,
    //     adults,
    //     children,
    //     room,
    //     location,
    //   }).toString(),
    // });
    handleSetDefaultBooking({
      hotelCode: hotel?.supplierCode,
      hotelName: hotel?.supplierName,
      searchParams,
    });
  };

  const handleClickFavourite = (tour) => {
    // eslint-disable-next-line no-undef
    const selectionFired = new CustomEvent("setWishlistTourInfo", {
      detail: {
        supplierCode: tour?.supplierCode,
        listedPrice: tour?.listedPrice,
        finalPrice: tour?.finalPrice,
        wishListID: tour?.wishListID,
      },
    });

    // eslint-disable-next-line no-undef
    document.dispatchEvent(selectionFired);
  };

  if (isLoadingHotels) {
    return <Skeleton count={7} />;
  }

  if (hotelList.length === 0) {
    return <p className="text-dark-1 text-center">Không tim thấy thông tin</p>;
  }

  return (
    <>
      {hotelList?.length > 0 &&
        hotelList.map((item, index) => (
          <div className="col-12 cursor-pointer" key={index}>
            <div className="border-top-light pt-20">
              <div className="row x-gap-20 y-gap-20 flex-wrap">
                <div className="col-md-auto">
                  <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4 h-250">
                    <div className="cardImage__content">
                      <div className="cardImage-slider rounded-4  custom_inside-slider">
                        <Gallery>
                          <Swiper
                            className="mySwiper h-250"
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
                                      src={slide}
                                      ref={ref as any}
                                      onClick={open}
                                      alt="image"
                                      role="button"
                                      className="rounded-22 col-12 js-lazy h-100 object-cover"
                                    />
                                  )}
                                </Item>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Gallery>
                      </div>
                    </div>
                    {/* End image */}

                    <div className="cardImage__wishlist ">
                      <button
                        className={classNames(
                          "button -blue-1 bg-white size-30 rounded-full shadow-2",
                          {
                            "bg-blue-1 text-white": item?.wishListID > 0,
                          }
                        )}
                        onClick={() => handleClickFavourite(item)}
                      >
                        <i className="icon-heart text-12"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* End .col */}

                <div
                  className="col-md pt-0"
                  onClick={() => handleChooseHotel(item)}
                >
                  <div className="d-flex align-items-center flex-wrap">
                    <Link
                      target="_blank"
                      to={`/hotels/${item?.slug}?${paramsRedirect}`}
                    >
                      <p className="text-20 lh-16 fw-500 mr-10 text-dark">
                        {item?.supplierName}
                      </p>
                    </Link>

                    <RatingComponent
                      stop={item?.class}
                      initialRating={item?.class}
                    />
                  </div>

                  <div className="row x-gap-10 items-center">
                    <div className="col-auto pt-0">
                      <p className="text-14 text-dark">{item?.address}</p>
                    </div>

                    <div className="col-auto">
                      <button
                        data-x-click="mapFilter"
                        className="d-block text-14 text-blue-1 underline"
                      >
                        bản đồ
                      </button>
                    </div>

                    <div className="col-auto">
                      <div className="size-3 rounded-full bg-light-1"></div>
                    </div>

                    <div className="col-auto">
                      <p className="text-14 text-dark">
                        <i className="icon-location text-14 mr-5"></i>
                        {item?.distanceCenter} km đến trung tâm thành phố
                      </p>
                    </div>
                  </div>
                  {window.innerWidth > 768 && (
                    <>
                      <div className="text-14 lh-15 mt-20">
                        <div className="fw-500">{item.roomName}</div>

                        <p className="text-14 text-dark">
                          <i className="icon-bed text-14 pr-10"></i>
                          {item?.totalBedLarge > 0 && item?.totalBedMedium > 0
                            ? item?.totalBedLarge +
                              ` giường đôi ${
                                item?.both2RoomType ? "và" : "hoặc"
                              } ` +
                              item?.totalBedMedium +
                              " giường đơn "
                            : item?.totalBedLarge > 0
                            ? item?.totalBedLarge + " giường đôi "
                            : item?.totalBedMedium > 0
                            ? item?.totalBedMedium + " giường đơn "
                            : ""}
                        </p>
                      </div>

                      <div className="text-14 text-green-2 lh-15 mt-10">
                        <div className="fw-500">Quyền lợi</div>
                        <div className="">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            className="ml-10"
                          >
                            <path
                              d="M13.444 6.111H5.667c-.86 0-1.556.696-1.556 1.556v4.666c0 .86.697 1.556 1.556 1.556h7.777c.86 0 1.556-.697 1.556-1.556V7.667c0-.86-.697-1.556-1.556-1.556z"
                              stroke="#4A5568"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.556 11.555a1.556 1.556 0 100-3.11 1.556 1.556 0 000 3.11zM11.889 6.111V4.556A1.556 1.556 0 0010.333 3H2.556A1.556 1.556 0 001 4.556v4.666a1.555 1.555 0 001.556 1.556H4.11"
                              stroke="#4A5568"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span className="ml-10">
                            {item.paymentPolicyName}
                          </span>
                        </div>
                        <div className="">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            className="svgFillAll jss1301 ml-10"
                          >
                            <path
                              d="M11.31 11.976l1.862 1.862M3.241 3.908l4.966 4.965M4.483 2.667L7.586 5.77 5.103 8.253 2 5.149M3.241 13.838l10.552-10.55a5.036 5.036 0 01-1.242 4.965c-2.194 2.194-3.724 2.482-3.724 2.482"
                              stroke="#008009"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span className="ml-10">{item.cancelPolicyName}</span>
                        </div>
                        <div className="text-danger">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            className="svgFillAll jss1309 ml-10"
                          >
                            <path
                              d="M12.739 6.478L6.652 15l1.217-5.478H3L9.087 1 7.87 6.478h4.87z"
                              stroke="#dc3545"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span className="ml-10">{item.randomText}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* End .col-md */}

                <div
                  className="col-lg-auto text-right md:text-left pt-0"
                  onClick={() => handleChooseHotel(item)}
                >
                  <div className="row x-gap-10 justify-end items-center md:justify-start">
                    <div className="col-auto">
                      <div className="text-14 lh-14 fw-500">
                        {item?.voteStatus}
                      </div>
                      {item?.totalReview > 0 && (
                        <div className="text-14 lh-14 text-light-1">
                          {item?.totalReview} đánh giá
                        </div>
                      )}
                    </div>
                    <div className="col-auto">
                      <div className="flex-center text-white fw-600 text-14 size-40 rounded-full bg-blue-1">
                        {item?.votePoint}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column items-end justify-content-end text-right">
                    <ShowQuantity quantity={item?.quantity || 0} />
                    <ShowPrice
                      discountPrice={item?.discountPrice}
                      listedPrice={item?.listedPrice}
                      promotionPrice={item?.promotionPrice}
                      hasTags={item?.hasTags}
                      finalPrice={item?.finalPrice}
                    />
                    <PromotionPrice
                      promotion={item?.promotion || 0}
                      memberPrice={item?.memberPrice || 0}
                    />
                  </div>

                  {window.innerWidth > 768 && (
                    <div className="w-100 d-flex justify-content-end mt-10 mt-md-0">
                      <Link
                        target="_blank"
                        to={`/hotels/${item?.slug}?${paramsRedirect}`}
                      >
                        <button
                          className="button -md -dark-1 bg-blue-1 text-white mt-5"
                          style={{ width: 100, textAlign: "right" }}
                        >
                          Chọn
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
                {window.innerWidth > 768 && (
                  <div className="row x-gap-10 py-0 ">
                    {item?.propertyHighlight?.map((property) => (
                      <div className="col-auto" key={property}>
                        <div className="border-light rounded-100 py-5 px-20 text-14 lh-14 my-1 my-md-0">
                          {property}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default HotelProperties;
