import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { getFromSessionStorage } from "@/utils/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { info_booking } from "@/utils/constants";
import { Gallery, Item } from "react-photoswipe-gallery";
import ShowQuantity from "@/components/ShowQuantity";
import ShowPrice from "@/components/ShowPrice";
import AmenitiesModal from "../AmenitiesModal";
import ServiceList from "./ServiceList";
import Button from "@/components/Button";
import NeedApproval from "@/components/ReturnPolicy/NeedApproval";
import { useTranslation } from "react-i18next";

const RoomDetail = ({ hotel, handleChoose, servicesRoom = [], isLoadingService = false }) => {
  const { t } = useTranslation();
  const refAmenitiedModal = useRef(null);
  const { roomActive } = useSelector((state: any) => state.hotel) || {};
  const infoBooking = getFromSessionStorage(info_booking);
  const [roomIdButtonChoose, setRoomIdButtonChoose] = useState(null);

  const isActiveRoom = useMemo(
    () =>
      infoBooking &&
      infoBooking?.services &&
      infoBooking?.services[roomActive - 1]?.roomID === hotel?.roomID,
    [hotel?.roomID, infoBooking, roomActive]
  );

  const isShowDetail = useMemo(
    () => isActiveRoom && servicesRoom.length > 0,
    [isActiveRoom, servicesRoom.length]
  );

  const isShowChooseButton = useMemo(() => {
    return (
      infoBooking?.services?.length > 0 &&
      (hotel?.isNeedApproval === infoBooking?.services[0]?.isNeedApproval ||
        infoBooking?.services[0]?.isNeedApproval === "nochoose")
    );
  }, [hotel?.isNeedApproval, infoBooking?.services]);

  useEffect(() => {
    if (!isLoadingService) {
      setRoomIdButtonChoose(null);
    }
  }, [isLoadingService]);

  return (
    <div
      className={`rounded-8 px-10 py-20 xl:py-10 mb-10 ${
        isShowDetail ? "border-blue-2" : "border-light-2"
      } `}
    >
      <div className="row x-gap-10 y-gap-10 mb-5">
        <div className="col-12 col-md-auto">
          <div className="cardImage  ratio ratio-1:1 w-220 md:w-1/1 h-220  rounded-8">
            <div className="cardImage__content">
              <div className="cardImage-slider rounded-8 custom_inside-slider h-100">
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
                              className="rounded-8 col-12 js-lazy h-100 object-cover"
                            />
                          )}
                        </Item>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Gallery>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md">
          <h3 className="text-24 xl:text-22 lg:text-20 md:text-18 fw-500 text-neutral-800">
            {hotel?.roomName}
          </h3>
          <div className="row">
            <div className="col-md-6 lg:pr-0">
              <div>
                <div className="mr-20 lg:mr-0 fw-400 text-neutral-300 text-14 lg:text-13 md:text-12  d-flex items-center">
                  <img
                    src="/images/HotelDetail/icon-people.png"
                    alt="Okdimall hotels"
                    className="object-cover mr-8"
                    style={{ width: 16, height: 16 }}
                  />
                  {hotel.totalAdult} {t("COMMON.ADULT")}, {hotel.totalChildren}{" "}
                  {t("COMMON.CHILD")}
                </div>
                <div className="fw-400 text-neutral-300 text-14 lg:text-13 md:text-12 d-flex items-center">
                  <img
                    src="/images/HotelDetail/icon-space.png"
                    alt="Okdimall hotels"
                    className="object-cover mr-8"
                    style={{ width: 16, height: 16 }}
                  />
                  {hotel.area} m2
                </div>
                <div className="d-flex items-center">
                  <p className="fw-400 text-neutral-300 text-14 lg:text-13 md:text-12">
                    <img
                      src="/images/HotelDetail/icon-room.png"
                      alt="Okdimall hotels"
                      className="object-cover  mr-8"
                      style={{ width: 16, height: 16 }}
                    />
                    {hotel?.totalBedLarge > 0 && hotel?.totalBedMedium > 0
                      ? hotel?.totalBedLarge +
                        ` ${t("COMMON.DOUBLE_BED")} ${
                          hotel?.both2RoomType
                            ? `${t("COMMON.AND")}`
                            : `${t("COMMON.OR")}`
                        } ` +
                        hotel?.totalBedMedium +
                        ` ${t("COMMON.SINGLE_BED")} `
                      : hotel?.totalBedLarge > 0
                      ? hotel?.totalBedLarge + ` ${t("COMMON.DOUBLE_BED")} `
                      : hotel?.totalBedMedium > 0
                      ? hotel?.totalBedMedium + ` ${t("COMMON.SINGLE_BED")} `
                      : ""}
                  </p>
                </div>
              </div>
              {hotel?.roomDirection && (
                <div className="fw-400 text-neutral-300 text-14 lg:text-13 md:text-12 text-truncate-2 d-flex items-center">
                  <img
                    src="/images/HotelDetail/icon-view.png"
                    alt="Okdimall hotels"
                    className="object-cover mr-8"
                    style={{ width: 16, height: 16 }}
                  />
                  {hotel?.roomDirection}
                </div>
              )}
              {/* <div className="tooltip">
                <div className="text-13 text-truncate-2">
                  {hotel?.description}
                </div>
                <span className="tooltiptext">{hotel?.description}</span>
              </div> */}

              <div className="row x-gap-5 y-gap-5 pt-5">
                {hotel?.amenities?.length > 0 &&
                  hotel?.amenities
                    .filter((amen) => amen?.popular)
                    ?.map((item, index) => (
                      <div className="col-auto" key={index}>
                        <div className="border-light rounded-100 py-5 px-10 text-13 md:text-12 lh-14 ">
                          {item.text}
                        </div>
                      </div>
                    ))}
                {hotel?.amenities?.length > 0 && (
                  <div className="col-auto">
                    <button
                      className=" button border-light rounded-100 py-5 px-10 text-13 md:text-12 lh-14 text-neutral-800"
                      onClick={() =>
                        refAmenitiedModal.current.setIsVisible(true)
                      }
                    >
                      ...
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!isShowDetail && (
              <>
                <div className="col-md-6 text-right md:text-left pl-0 pr-0 ">
                  <div className="w-100 d-flex justify-end mb-8 pr-15 lg:pr-10 lg:mt-8">
                    <NeedApproval
                      isNeedApproval={hotel?.isNeedApproval}
                      timeNeedApproval={hotel?.timeNeedApproval}
                    />
                  </div>
                  <div className="d-flex gap-2 flex-column items-end justify-content-end text-right pr-15 lg:pr-10">
                    <ShowQuantity quantity={hotel?.quantity} />
                    <ShowPrice
                      listedPrice={hotel?.listedPrice}
                      finalPrice={hotel?.finalPrice}
                      promotionPrice={hotel?.promotionPrice}
                      discountPrice={hotel?.discountPrice}
                      memberPrice={hotel?.memberPrice}
                    />
                  </div>

                  {isShowChooseButton && (
                    <div className="w-100 d-flex justify-content-end md:pr-0 pr-15 md:px-15">
                      <Button
                        className="mt-10 md:w-1/1 "
                        onClick={() => {
                          setRoomIdButtonChoose(hotel?.roomID);
                          handleChoose(hotel);
                        }}
                        isLoading={
                          isLoadingService &&
                          roomIdButtonChoose === hotel?.roomID
                        }
                      >
                        {t("COMMON.CHOOSE")}
                      </Button>
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
          <div className="size-3 bg-blue-1 w-100 relative mt-10 "></div>
          <ServiceList
            roomID={hotel?.roomID}
            roomName={hotel?.roomName}
            source={hotel?.source}
            servicesRoom={servicesRoom}
          />
        </>
      )}
      <AmenitiesModal
        ref={refAmenitiedModal}
        data={{
          amenities: hotel?.amenities,
          roomName: hotel?.roomName,
          roomID: hotel?.roomID,
        }}
      />
    </div>
  );
};

export default RoomDetail;
