import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import useQueryParams from "@/hooks/useQueryParams";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import {
  addDate,
  formatCurrency,
  formatDate,
  renderStars,
} from "@/utils/utils";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import classNames from "classnames";
import RatingComponent from "../rating";
import { saveFavourite, removeFavourite } from "@/api/user.api";
import { useDispatch } from "react-redux";
import { updateRelatedHotels } from "@/features/hotel-detail/hotelDetailSlice";
import AuthenModal from "@/components/authen/AuthenModal";
import { getProfile } from "@/utils/auth";
import PromotionPrice from "@/components/promotion-price";
import { Gallery, Item } from "react-photoswipe-gallery";

const RelatedHotels = ({ isTour = false }) => {
  const refSignInModal = useRef(null);
  const { currentCurrency } = useSelector((state) => state.app);
  const isAuthenticated =
    useSelector((state) => state.app.isAuthenticated) || {};
  const [searchParams] = useQueryParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { relatedHotels, isLoadingRelatedHotels } = useSelector(
    (state) => state.hotel
  );
  const {
    checkIn = formatDate(new Date()),
    checkOut = addDate(new Date(), 10),
    adults = 2,
    children = 0,
    room = 1,
    roomActive = 1,
  } = searchParams;

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // custom navigation
  function ArrowSlick(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  const handleChooseHotel = (item) => {
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

  const handleClickFavourite = (hotel) => {
    const profile = getProfile();

    if (!profile) {
      refSignInModal.current?.setIsVisible(true);
      return;
    }

    if (hotel?.wishListID > 0) {
      removeFavourite(hotel?.wishListID).then(() => {
        dispatch(
          updateRelatedHotels({
            wishListID: 0 as any,
            supplierCode: hotel?.supplierCode,
          })
        );
      });
      return;
    }

    saveFavourite({
      supplierCode: hotel?.supplierCode || "",
      listedPrice: hotel?.listedPrice || 0,
      finalPrice: hotel?.finalPrice || 0,
    }).then((res) => {
      if (res?.success) {
        dispatch(
          updateRelatedHotels({
            wishListID: res?.data as any,
            supplierCode: hotel?.supplierCode,
          })
        );
      }
    });
  };

  if (isLoadingRelatedHotels) {
    return <Skeleton count={5} />;
  }

  return (
    <>
      <Slider {...settings}>
        {relatedHotels.length > 0 &&
          [...relatedHotels].slice(0, 4).map((item, index) => (
            <div
              className={classNames(
                "col-xl-3 col-lg-3 col-sm-6 border-light rounded-22",
                { "w-300": relatedHotels?.length === 1 }
              )}
              key={item?.supplierCode}
              // data-aos="fade"
              // data-aos-delay={(
              //   ((index + 1) % relatedHotels?.length) *
              //   100
              // ).toString()}
            >
              <div className="hotelsCard -type-1 hover-inside-slider cursor-pointer rounded-22">
                <div className="hotelsCard__image">
                  <div className="cardImage inside-slider">
                    <Gallery>
                      <Slider
                        {...itemSettings}
                        arrows={true}
                        nextArrow={<ArrowSlick type="next" />}
                        prevArrow={<ArrowSlick type="prev" />}
                      >
                        {item?.thumb?.map((slide, i) => (
                          <div
                            className="cardImage ratio ratio-4:3"
                            key={i + item?.supplierCode}
                          >
                            <div className="cardImage__content ">
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
                                className="col-12 js-lazy"
                                src={slide}
                                alt="image"
                              /> */}
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </Gallery>

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

                    {/* <div className="cardImage__leftBadge">
                      <div
                        className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                          isTextMatched(item?.tag, "breakfast included")
                            ? "bg-dark-1 text-white"
                            : ""
                        } ${
                          isTextMatched(item?.tag, "best seller")
                            ? "bg-blue-1 text-white"
                            : ""
                        }  ${
                          isTextMatched(item?.tag, "top rated")
                            ? "bg-yellow-1 text-dark-1"
                            : ""
                        }`}
                      >
                        {item?.tag}
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="mb-5 py-10 px-10 d-flex flex-column justify-between rounded-22 max-h-270">
                  <div
                    className="hotelsCard__content pt-0"
                    onClick={() => handleChooseHotel(item)}
                  >
                    <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500 text-truncate-2 ">
                      {item?.supplierName}
                    </h4>
                    <div className="d-flex">
                      <RatingComponent
                        stop={item?.class}
                        initialRating={item?.class}
                      />
                      {/* {item.totalReview > 0 && (
                      <span className="ml-10  text-dark-1 text-14 ">
                        {item.totalReview} đánh giá
                      </span>
                    )} */}
                    </div>

                    <p className="lh-12 text-12 text-light-1 text-right w-100 text-truncate text-start text-dark">
                      <i className="icon-location-pin text-12 mr-5" />
                      {item?.address}
                    </p>
                    {/* <p className="lh-15 text-light-1 text-15 mt-5">
                    Khoảng cách đến trung tâm {item?.distanceCenter} km
                  </p> */}
                    {/* <p className="lh-15 text-light-1 text-15 mt-5 text-truncate-3 min-h-60">
                    {item?.randomText}
                  </p> */}
                    <div className="d-flex items-center mt-10">
                      <div className="flex-center bg-blue-1 rounded-22 size-30 text-12 fw-600 text-white">
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
                  <div className="text-end">
                    {item?.finalPrice < item?.listedPrice && (
                      <span className={`line-through ml-10 text-14 mr-5`}>
                        {formatCurrency(item?.listedPrice) + currentCurrency}
                      </span>
                    )}
                    {/* <div
                      className={` ${
                        item.promotionPrice > 0
                          ? "text-14 mr-5"
                          : "text-20  text-danger  fw-500"
                      } mt-5`}
                    >
                      <span
                        className={`${
                          item.promotionPrice > 0 && "line-through"
                        }`}
                      >
                        {item?.promotionPrice <= item?.listedPrice &&
                          formatCurrency(item?.listedPrice) + " đ"}
                      </span>{" "}
                    </div>
                    {item.promotionPrice > 0 && (
                      <div className="text-20 lh-12 fw-600 mt-5 text-danger">
                        {formatCurrency(item?.promotionPrice)} đ{" "}
                      </div>
                    )} */}
                    {/* <div className="text-13 lh-12 ">
                      ({item?.votePoint}, {item?.voteStatus})
                    </div> */}
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

                    {/* <p className="lh-12 text-12 text-light-1 text-right w-100">
                    ({item?.vatName})
                  </p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>

      <AuthenModal ref={refSignInModal} />
    </>
  );
};

export default RelatedHotels;
