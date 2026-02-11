import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ServiceList from "./ServiceList";
import { getFromSessionStorage } from "@/utils/utils";
import AmenitiesModal from "./AmenitiesModal";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { info_booking } from "@/utils/constants";
import ShowPrice from "../price/ShowPrice";
import ShowQuantity from "../price/ShowQuantity";
import PromotionPrice from "@/components/promotion-price";
import { Gallery, Item } from "react-photoswipe-gallery";

const HotelDetail = ({ hotel, handleChoose }: { hotel: any; handleChoose: any }) => {
  const refAmenitiedModal = useRef<any>(null);
  const { servicesRoom = [], roomActive } =
    useSelector((state) => state.hotel) || {};
  const infoBooking = getFromSessionStorage(info_booking) as any;

  const isActiveRoom = useMemo(
    () =>
      infoBooking &&
      infoBooking?.services[roomActive - 1]?.roomID === hotel?.roomID,
    [hotel?.roomID, infoBooking, roomActive]
  );

  const isShowDetail = useMemo(
    () => isActiveRoom && servicesRoom.length > 0,
    [isActiveRoom, servicesRoom.length]
  );

  const isShowChooseButton = useMemo(
    () =>
      infoBooking?.services?.length > 0 &&
      (hotel?.isNeedApproval === infoBooking?.services[0]?.isNeedApproval ||
        infoBooking?.services[0]?.isNeedApproval === "nochoose"),
    [hotel?.isNeedApproval, infoBooking?.services]
  );
  return (
    <div
      className={`rounded-16 px-10 py-20 mb-10 ${
        isShowDetail ? "border-blue-2" : "border-light-2"
      } `}
    >
      <div className="row x-gap-10 y-gap-10 mb-5">
        <div className="col-md-auto">
          <div className="cardImage ratio ratio-1:1 w-220 h-220 md:w-1/1 rounded-16">
            <div className="cardImage__content">
              <div className="cardImage-slider rounded-16 custom_inside-slider h-100">
                <Gallery>
                  <Swiper
                    className="mySwiper h-220"
                    modules={[Pagination, Navigation]}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                  >
                    {hotel?.thumb?.map((slide, i) => (
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

            {/* <div className="cardImage__wishlist">
              <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                <i className="icon-heart text-12"></i>
              </button>
            </div> */}
          </div>
        </div>
        {/* End .col */}
        <div className="col-md">
          <div>
            <h3 className="text-18 lh-16 fw-500">
              {hotel?.roomName}
              {/* <br className="lg:d-none" /> {hotel?.location} */}
              {/* <div className="d-inline-block ml-10">
              <i className="icon-star text-10 text-yellow-2"></i>
              <i className="icon-star text-10 text-yellow-2"></i>
              <i className="icon-star text-10 text-yellow-2"></i>
              <i className="icon-star text-10 text-yellow-2"></i>
              <i className="icon-star text-10 text-yellow-2"></i>
            </div> */}
            </h3>

            {/* <div className="row x-gap-10 y-gap-10 items-center pt-10">
            <div className="col-auto">
              <p className="text-14">{hotel?.location}</p>
            </div>

            <div className="col-auto">
              <button
                data-x-click="mapFilter"
                className="d-block text-14 text-blue-1 underline"
              >
                Show on map
              </button>
            </div>

            <div className="col-auto">
              <div className="size-3 rounded-full bg-light-1"></div>
            </div>

            <div className="col-auto">
              <p className="text-14">2 km to city center</p>
            </div>
          </div> */}
          </div>
          {/* End .col-md */}
          <div className="row">
            <div className="col-lg-7">
              <div>
                <div className="d-flex text-14 lh-15 mt-10">
                  <div className="mr-20">
                    <i className="icon-user text-14 pr-10"></i>
                    {hotel.totalAdult} người lớn, {hotel.totalChildren} trẻ em
                  </div>
                  <div className="text-light-1 text-14">
                    <i className="icon-living-room text-14 pr-10"></i>
                    {hotel.area} m2
                  </div>
                </div>
                <div>
                  <p className="text-14 text-dark">
                    <i className="icon-bed text-14 pr-10"></i>
                    {hotel?.totalBedLarge > 0 && hotel?.totalBedMedium > 0
                      ? hotel?.totalBedLarge +
                        ` giường đôi ${hotel?.both2RoomType ? "và" : "hoặc"} ` +
                        hotel?.totalBedMedium +
                        " giường đơn "
                      : hotel?.totalBedLarge > 0
                      ? hotel?.totalBedLarge + " giường đôi "
                      : hotel?.totalBedMedium > 0
                      ? hotel?.totalBedMedium + " giường đơn "
                      : ""}
                  </p>
                  {/* <p className="text-14 text-dark">
                {hotel?.totalBedMedium > 0
                  ? hotel?.totalBedMedium + " giường đơn "
                  : ""}
              </p> */}
                </div>
              </div>
              {hotel?.roomDirection && (
                <div className="text-13 text-truncate-2 d-flex items-center">
                  <i className="icon-eye text-14 pr-10"></i>
                  {hotel?.roomDirection}
                </div>
              )}
              <div className="tooltip">
                <div className="text-13 text-truncate-2">
                  {hotel?.description}
                </div>
                <span className="tooltiptext">{hotel?.description}</span>
              </div>

              <div className="row x-gap-5 y-gap-5 pt-5">
                {hotel?.amenities?.length > 0 &&
                  hotel?.amenities
                    .filter((amen) => amen?.popular)
                    ?.map((item, index) => (
                      <div className="col-auto" key={index}>
                        <div className="border-light rounded-100 py-5 px-10 text-13 lh-14 bg-pink-light">
                          {item.text}
                        </div>
                      </div>
                    ))}
                {hotel?.amenities?.length > 0 && (
                  <div className="col-auto">
                    <button
                      className=" button border-light rounded-100 py-5 px-10 text-13 lh-14 bg-pink-light text-blue-1"
                      onClick={() =>
                        refAmenitiedModal.current.setIsVisible(true)
                      }
                    >
                      + {hotel?.amenities.length}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!isShowDetail && (
              <>
                <div className="col-lg-5 text-right md:text-left pl-0">
                  {/* <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
            <div className="col-auto">
              <div className="text-14 lh-14 fw-500">Exceptional</div>
              <div className="text-14 lh-14 text-light-1">3,014 reviews</div>
            </div>
            <div className="col-auto">
              <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                {hotel?.ratings}
              </div>
            </div>
          </div> */}

                  {/* <div className="text-14 text-light-1 mt-50 md:mt-20">
              8 nights, 2 adult
            </div> */}
                  <div className="w-100 d-flex justify-end">
                    <div
                      className=" bg-pink-light rounded-4 mt-10"
                      style={{ width: "fit-content" }}
                    >
                      <svg width="20" height="20" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.25 10c0-4.796 3.954-8.75 8.75-8.75 4.796 0 8.75 3.954 8.75 8.75 0 4.796-3.954 8.75-8.75 8.75-4.796 0-8.75-3.954-8.75-8.75zm12.5 0L10 6.25 6.25 10 10 13.75 13.75 10z"
                          fill="url(#icon_loyalty_svg__paint0_linear_21224_219023)"
                        ></path>
                        <path
                          d="M10 6.25L13.75 10 10 13.75 6.25 10 10 6.25z"
                          fill="#fff"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 10C0 4.507 4.507 0 10 0s10 4.507 10 10-4.507 10-10 10S0 15.493 0 10zm2.344 0c0 4.2 3.456 7.656 7.656 7.656 4.2 0 7.656-3.456 7.656-7.656 0-4.2-3.456-7.656-7.656-7.656C5.8 2.344 2.344 5.8 2.344 10z"
                          fill="url(#icon_loyalty_svg__paint1_linear_21224_219023)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="icon_loyalty_svg__paint0_linear_21224_219023"
                            x1="10"
                            y1="1.25"
                            x2="10"
                            y2="18.75"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FDBF00"></stop>
                            <stop offset="1" stopColor="#FD9800"></stop>
                          </linearGradient>
                          <linearGradient
                            id="icon_loyalty_svg__paint1_linear_21224_219023"
                            x1="10"
                            y1="0"
                            x2="10"
                            y2="20"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FFDF7B"></stop>
                            <stop offset="1" stopColor="#FFD34A"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="pl-10 text-truncate text-yellow-dark text-13">
                        {hotel?.isNeedApproval
                          ? ` Xác nhận trong ${hotel?.timeNeedApproval} phút`
                          : "Xác nhận ngay"}
                      </span>

                      {hotel?.isNeedApproval && (
                        <div className="tooltip">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="svgFillAll jss1361 ml-5"
                          >
                            <path
                              d="M10 17.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM10 6.667h.008"
                              stroke="var(--color-yellow-dark)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.167 10H10v3.333h.833"
                              stroke="var(--color-yellow-dark)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>

                          <span className="tooltiptext">
                            Đặt phòng thường được khách sạn xác nhận trong vòng{" "}
                            {hotel?.timeNeedApproval} phút. Nếu yêu cầu đặt
                            phòng của bạn không thể xác nhận, chúng tôi sẽ hoàn
                            tiền đầy đủ.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column items-end justify-content-end text-right">
                    <div className="mt-5">
                      <ShowQuantity quantity={hotel?.quantity} />
                    </div>
                    <ShowPrice
                      discountPrice={hotel?.discountPrice}
                      listedPrice={hotel?.listedPrice}
                      promotionPrice={hotel?.promotionPrice}
                      hasTags={hotel?.hasTags}
                      finalPrice={hotel?.finalPrice}
                    />
                    <PromotionPrice
                      promotion={hotel?.promotion || 0}
                      memberPrice={hotel?.memberPrice || 0}
                    />
                  </div>

                  {isShowChooseButton && (
                    <div className="w-100 d-flex justify-content-end">
                      <button
                        className="button -sm -dark-1 bg-blue-1 text-white mt-10 px-40 "
                        onClick={() => handleChoose(hotel)}
                      >
                        Chọn
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isShowDetail && (
        <>
          <div className="size-3 bg-blue-1 w-100 relative mt-10 ">
            {/* <div className="absolute top-50 start-50 translate-middle bg-white px-3 text-blue-1 fw-500 fs-17">
              Gói tiêu chuẩn ({servicesRoom.length || 0})
            </div> */}
          </div>
          <ServiceList
            roomID={hotel?.roomID}
            roomName={hotel?.roomName}
            source={hotel?.source}
          />
        </>
      )}
      <AmenitiesModal
        ref={refAmenitiedModal}
        data={{
          amenities: hotel?.amenities,
          roomName: hotel?.roomName,
        }}
      />
    </div>
  );
};

export default HotelDetail;
