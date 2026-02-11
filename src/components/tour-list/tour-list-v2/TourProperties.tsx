import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";
import RatingComponent from "@/components/rating";
import classNames from "classnames";
import { Gallery, Item } from "react-photoswipe-gallery";
import ShowPrice from "@/components/price/ShowPrice";
import "./TourProperties.styles.scss";
import useQueryParams from "@/hooks/useQueryParams";

const TourProperties = () => {
  const tourList = useSelector((state) => state.tours.tours);
  const [params, setSearchParams] = useQueryParams();
  const { location: regionIDParam = "NT" } = params || {};

  const handleClickFavourite = (hotel) => {
    // eslint-disable-next-line no-undef
    const selectionFired = new CustomEvent("setWishlistTourInfo", {
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

  return (
    <>
      {tourList.map((item, idx) => (
        <div
          className="col-lg-4 col-sm-6"
          key={idx}
          data-aos="fade"
          // data-aos-delay={item?.delayAnimation}
        >
          <div className="cardImage ratio ratio-1:1 md:w-1/1 rounded-4 h-250">
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
                <i className="icon-heart text-12"></i>
              </button>
            </div>
          </div>
          <div className="tourCard__content mt-10">
            <div className="d-flex items-center lh-14 mb-5">
              <div className="text-14 text-light-1">{item?.supplierType}</div>
              <div className="size-3 bg-light-1 rounded-full ml-10 mr-10"></div>
              <div className="text-14 text-light-1"> {item?.duration} giờ</div>
            </div>
            <Link to={`${item.slug}?location=${regionIDParam}`} target="_blank">
              <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500 text-truncate">
                <span>{item?.supplierName}</span>
              </h4>
            </Link>
            <p className="text-light-1 lh-14 text-14 mt-5">{item?.location}</p>

            <div className="row justify-between items-center">
              <div className="col-auto">
                <div className="d-flex items-center justify-end">
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
                </div>
              </div>
            </div>
            <div className="col-auto">
              {/* <div className="text-14 text-light-1">
                <span className="text-16 fw-500 text-dark-1">
                  {" "}
                  US${item.finalPrice}
                </span>
              </div> */}
              <ShowPrice
                discountPrice={item?.discountPrice}
                listedPrice={item?.listedPrice}
                promotionPrice={item?.promotionPrice}
                hasTags={item?.hasTags}
                finalPrice={item?.finalPrice}
                unit={"người"}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TourProperties;
