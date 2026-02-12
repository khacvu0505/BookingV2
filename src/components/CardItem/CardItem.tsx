import { createSearchParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { addDate, formatCurrency, formatDate } from "@/utils/utils";
import classNames from "classnames";
import { Gallery, Item } from "react-photoswipe-gallery";
import RatingComponent from "@/components/ratings/Rating";
import "./CardItem.styles.scss";
import RatingInCard from "@/components/ratings/RatingInCard";
import iconLocation from "/images/HotelList/icon-location.png";
import ShowPrice from "../ShowPrice";
import RadomText from "@/screens/TourDetail/Tickets/RadomText";

interface CardItemProps {
  data: any;
  handleChooseItem: (data: any) => void;
  isTour?: boolean;
}

const CardItem = ({ data, handleChooseItem, isTour = false }: CardItemProps) => {
  const handleClickFavourite = (item: any) => {
    let selectionFired;
    if (isTour) {
      // eslint-disable-next-line no-undef
      selectionFired = new CustomEvent("setWishlistTourInfo", {
        detail: {
          supplierCode: item?.supplierCode,
          listedPrice: item?.listedPrice,
          finalPrice: item?.finalPrice,
          wishListID: item?.wishListID,
        },
      });
    } else {
      // eslint-disable-next-line no-undef
      selectionFired = new CustomEvent("setWishlistInfo", {
        detail: {
          supplierCode: item?.supplierCode,
          listedPrice: item?.listedPrice,
          finalPrice: item?.finalPrice,
          wishListID: item?.wishListID,
          isRecommend: true,
        },
      });
    }

    // eslint-disable-next-line no-undef
    document.dispatchEvent(selectionFired);
  };

  return (
    <>
      <div data-aos="fade" className="cardItem pb-30 lg:pb-15 md:pb-6">
        <div className="tourCard -type-1 rounded-22 cursor-pointer mx-0 my-0 w-100 tour3-custom">
          <div className="tourCard__image">
            <div className="cardImage ratio ratio-4:3 h-250">
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
                      {data?.thumb?.map((slide: string, i: number) => (
                        <SwiperSlide key={i}>
                          <Item
                            original={slide}
                            thumbnail={slide}
                            width={1024}
                            height={768}
                          >
                            {({ ref, open }: { ref: any; open: () => void }) => (
                              <img
                                ref={ref as React.Ref<HTMLImageElement>}
                                onClick={open}
                                className="col-12 h-100 object-cover"
                                src={slide}
                                alt="image"
                              />
                            )}
                          </Item>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {/* {data?.tag && (
                      <p className="absolute bottom-60 left-16 rounded-30 z-5 bg-primary-50 text-primary-500 px-6 text-16 fw-400">
                        {data?.tag}
                      </p>
                    )} */}
                  </Gallery>
                </div>
              </div>
            </div>

            <div className="cardImage__wishlist w-100 d-flex justify-content-between right-0 px-6">
              {!!data?.percentDiscount && data?.percentDiscount > 0 ? (
                <p className="rounded-30 z-5 bg-primary-500 text-white px-6 text-16 lg:text-15 md:text-14 fw-400 h-fit-content">
                  -{data?.percentDiscount}%
                </p>
              ) : (
                <div></div>
              )}
              <button
                className={classNames(
                  "button -blue-1 bg-white size-40 lg:size-30 rounded-full shadow-2 btn-wishlist",
                  {
                    "bg-blue-1 text-white": data?.wishListID > 0,
                  }
                )}
                onClick={() => handleClickFavourite(data)}
              >
                <i
                  className={classNames(
                    `icon-heart text-20 lg:text-18 md:text-16 text-blue-1 fw-bold`,
                    {
                      "text-white": data?.wishListID > 0,
                    }
                  )}
                ></i>
              </button>
            </div>
          </div>

          <div
            className={classNames(
              "d-flex flex-column justify-content-between px-10 py-10 bg-white rounded-22 cardContent",
              {
                "max-h-230": true,
                // "max-h-220": !isTour,
              }
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleChooseItem(data);
            }}
          >
            <div>
              <div>
                <h4 className="tourCard__title text-dark-1 text-18 lg:text-17 md:text-16 lh-16 fw-500 text-truncate pt-20 text-neutral-800">
                  {data?.supplierName}
                </h4>
                {data?.class ? (
                  <div className="d-flex align-items-center">
                    <RatingComponent
                      stop={data?.class}
                      initialRating={data?.class}
                    />
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <RatingComponent stop={5} initialRating={5} />
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center gap-1">
                <img
                  src={iconLocation.src}
                  alt="icon-location"
                  className="object-cover"
                />
                <p className="lh-12 text-12  fw-400 text-neutral-300 text-right w-100 text-truncate text-start ">
                  {data?.address}
                </p>
              </div>
            </div>
            <ShowPrice
              listedPrice={data?.listedPrice}
              finalPrice={data?.finalPrice}
              isSpecialPrice={true}
            />
            <RadomText randomText={data?.randomText} className="mt-0" />

            <div className="cardRating d-flex align-items-center bg-white rounded-4 px-6 pt-4 pb-4 ">
              <RatingInCard
                votePoint={data?.votePoint}
                voteStatus={data?.voteStatus}
                totalReview={data?.totalReview}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
