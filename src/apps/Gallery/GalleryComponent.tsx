import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import React, { useState } from "react";
import {
  formatCurrency,
  getMinValueFromList,
  getYouTubeVideoId,
} from "@/utils/utils";
import classNames from "classnames";
import { useSelector } from "react-redux";
import useWindowSize from "@/utils/useWindowSize";
import RatingComponent from "@/apps/Rating";
import iconLocation from "/images/HotelList/icon-location.png";
import Button from "../Button";
import { BREAKPOINT_LG } from "@/utils/constants";
import { useTranslation } from "react-i18next";

interface GalleryComponentProps {
  hotel: any;
  roomInfos?: any[];
  type?: string;
}

export default function GalleryComponent({
  hotel,
  roomInfos = [],
  type = "hotel",
}: GalleryComponentProps) {
  const { t } = useTranslation();
  const { currentCurrency } = useSelector((state) => state.app);
  const [isOpen, setOpen] = useState(false);
  const { width } = useWindowSize();
  const handleChooseRoom = () => {
    // eslint-disable-next-line no-undef
    const roomElement = document.getElementById("available-room");
    let pos = roomElement?.offsetTop || 0;
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, pos);
    }, 100);
  };

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={hotel?.videoURL && getYouTubeVideoId(hotel?.videoURL)}
        onClose={() => setOpen(false)}
      />
      <section className="pt-20">
        <div className="container">
          <div className="row y-gap-20 justify-between items-start">
            <div className="col-12 col-xl-auto">
              <div className="d-block lg:d-flex align-items-center flex-wrap">
                <h1 className="text-24 fw-600 pb-8 mr-20 xl:pb-0 lg:mr-15 md:mr-10">
                  {hotel?.hotelName}
                </h1>
                {!!hotel?.class && (
                  <RatingComponent
                    stop={hotel?.class}
                    initialRating={hotel?.class}
                  />
                )}
              </div>

              {hotel?.address && (
                <p className="lh-12 text-12 fw-400 text-neutral-300 text-right w-100 text-truncate text-start xl:pt-8">
                  <img
                    src={iconLocation.src}
                    alt="icon-location"
                    className="object-cover"
                  />
                  {hotel?.address}
                </p>
              )}
            </div>

            <div className="col-12 col-xl-auto xl:py-0">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-12 col-xl-auto xl:py-0">
                  <div className="text-14 lg:text-13">
                    {t("COMMON.PRICE_FROM")}
                    <span className="text-22 lg:text-20 md:text-18 text-primary-500 fw-500 ml-10">
                      {roomInfos && typeof roomInfos === "object"
                        ? formatCurrency(
                            getMinValueFromList(
                              roomInfos?.map((item: any) => item?.finalPrice)
                            )
                          )
                        : 0}
                      {currentCurrency}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-xl-auto">
                  <Button onClick={handleChooseRoom} className="w-100">
                    {type === "hotel" && (
                      <>
                        <i className="icon-bed text-16 mr-10"></i>
                        {t("HOTEL.CHOOSE_ROOM")}
                      </>
                    )}
                    {type === "tour" && (
                      <>
                        <i className="ri-umbrella-line text-16 mr-10"></i>
                        {t("HOTEL.CHOOSE_TOUR")}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          <Gallery>
            <div className="galleryGrid -type-1 pt-30">
              <div className="galleryGrid__item relative d-flex w-100">
                {hotel?.videoURL ? (
                  <div className="section-bg__item -right -image  d-flex z-2 w-100">
                    <img
                      src={hotel?.thumb[0]}
                      alt="image"
                      role="button"
                      className="rounded-22"
                    />
                    <div className="absolute col-12 h-full flex-center z-1">
                      <div
                        onClick={() => setOpen(true)}
                        className="d-flex items-center js-gallery"
                        role="button"
                      >
                        <span className="button -outline-white text-white size-50 rounded-full flex-center">
                          <i className="icon-play text-16" />
                        </span>
                        <span className="fw-500 text-16 lg:text-15 md:text-14 text-white ml-15">
                          {t("HOTEL.WATCH_VIDEO")}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Item
                      original={hotel?.thumb[0]}
                      thumbnail={hotel?.thumb[0]}
                      width={1024}
                      height={768}
                    >
                      {({ ref, open }) => (
                        <img
                          src={hotel?.thumb[0]}
                          ref={ref as React.MutableRefObject<HTMLImageElement>}
                          onClick={open}
                          alt="image"
                          role="button"
                          className="rounded-22 object-cover max-h-768"
                        />
                      )}
                    </Item>
                  </>
                )}
              </div>

              {hotel?.thumb?.map((img: string, index: number) => {
                if (
                  (width >= BREAKPOINT_LG && index === 5) ||
                  (width < BREAKPOINT_LG && index === 1)
                ) {
                  return (
                    <div
                      className={"galleryGrid__item relative d-flex"}
                      key={index}
                    >
                      <img src={img} alt="image" className="rounded-22" />
                      <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                        <Item
                          original={img}
                          thumbnail={img}
                          width={1024}
                          height={768}
                        >
                          {({ ref, open }) => {
                            return (
                              <div ref={ref as React.MutableRefObject<HTMLDivElement>}>
                                <Button onClick={open}>
                                  {t("HOTEL.VIEW_ALL_IMAGES")}
                                </Button>
                              </div>
                            );
                          }}
                        </Item>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={classNames("galleryGrid__item ", {
                        "d-none":
                          index > 3 ||
                          index === 0 ||
                          (width < BREAKPOINT_LG && index > 0),
                      })}
                      key={index}
                    >
                      <Item
                        original={img}
                        thumbnail={img}
                        width={1024}
                        height={768}
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref as React.MutableRefObject<HTMLImageElement>}
                            onClick={open}
                            src={img}
                            alt="image"
                            className="rounded-22"
                            role="button"
                          />
                        )}
                      </Item>
                    </div>
                  );
                }
              })}
            </div>
          </Gallery>
        </div>
      </section>
    </>
  );
}
