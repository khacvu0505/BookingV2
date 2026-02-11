import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import React, { useState } from "react";
import { formatCurrency, getYouTubeVideoId } from "@/utils/utils";
import classNames from "classnames";
import RatingComponent from "../rating";
import PropertyHighlights2 from "../hotel-single/PropertyHighlights";
import SidebarRight2 from "../hotel-single/SidebarRight2";
import RatingBox from "../hotel-single/RatingBox";
import { useSelector } from "react-redux";

export default function GalleryOne({ tour, hotelPolicies, offCanvasRef }: { tour: any; hotelPolicies: any; offCanvasRef: any }) {
  const [isOpen, setOpen] = useState(false);
  const { currentCurrency } = useSelector((state) => state.app);

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={tour?.videoURL && getYouTubeVideoId(tour?.videoURL)}
        onClose={() => setOpen(false)}
      />
      <section className="pt-20">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="row x-gap-20  items-center">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-25 fw-600">
                    {tour?.hotelName}
                  </h1>
                </div>
                {/* End .col */}
                <div className="col-auto">
                  <RatingComponent
                    stop={tour?.class}
                    initialRating={tour?.class}
                  />
                </div>
              </div>
              {/* End .row */}

              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <div className="d-flex align-item-start align-items-md-center text-15 text-light-1">
                    {tour?.address && (
                      <>
                        <i className="icon-location-2 text-16 mr-5 my-1 my-md-0" />
                        {tour?.address}
                      </>
                    )}
                  </div>
                </div>
                {/* <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      className="text-blue-1 text-15 underline"
                      onClick={handleDisplayMap}
                    >
                      Hiển thị trên bản đồ
                    </button>
                  </div> */}
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto">
                  <div className="text-14">
                    Giá từ
                    <span className="text-22 text-dark-1 fw-500 ml-10">
                      {tour?.priceFrom ? formatCurrency(tour.priceFrom) : 0}{" "}
                      {currentCurrency}
                    </span>
                  </div>
                </div>
                {/* <div className="col-auto">
                  <button
                    // href="#available-room"
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                    onClick={handleChooseRoom}
                  >
                    Chọn phòng <div className="icon-arrow-top-right ml-15" />
                  </button>
                </div> */}
              </div>
            </div>
            {/* End .col */}
          </div>
          <Gallery>
            <div className="galleryGrid -type-1 pt-30">
              <div className="galleryGrid__item relative d-flex w-100">
                {tour?.videoURL ? (
                  <div className="section-bg__item -right -image  d-flex z-2 w-100">
                    <img
                      src={tour?.thumb[0]}
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
                        <span className="fw-500 text-white ml-15">
                          Xem video
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Item
                      original={tour?.thumb[0]}
                      thumbnail={tour?.thumb[0]}
                      width={1024}
                      height={768}
                    >
                      {({ ref, open }) => (
                        <img
                          src={tour?.thumb[0]}
                          ref={ref as any}
                          onClick={open}
                          alt="image"
                          role="button"
                          className="rounded-22"
                        />
                      )}
                    </Item>
                    {/* <div className="absolute px-20 py-20 col-12 d-flex justify-end">
                      <button
                        className={classNames(
                          "button -blue-1 bg-white size-30 rounded-full shadow-2",
                          {
                            "bg-blue-1 text-white": hotel?.wishListID > 0,
                          }
                        )}
                        onClick={() => handleClickFavourite(hotel)}
                      >
                        <i className="icon-heart text-16" />
                      </button>
                    </div> */}
                  </>
                )}
              </div>
              {/* End .galleryGrid__item */}

              {tour?.thumb?.map((img, index) => {
                if (index === 5) {
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
                              <div
                                className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                                ref={ref as any}
                                onClick={open}
                                role="button"
                              >
                                Xem tất cả ảnh
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
                        "d-none": index > 3 || index === 0,
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
                            ref={ref as any}
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
              {/* End .galleryGrid__item */}
            </div>
          </Gallery>
          <div className="row">
            <div className="col-md-8 pt-20  ">
              <div>
                <h3 className="text-22 fw-500 ">Đặc điểm nổi bật</h3>
                <PropertyHighlights2
                  propertyHighlights={tour?.propertyHighlights}
                  hotelPolicies={hotelPolicies}
                  offCanvasRef={offCanvasRef}
                />
              </div>
              {/* <div className="pt-40 mt-20 border-top-light">
                <div className="row">
                  <div className="col-12">
                    <h3 className="text-22 fw-500">Chính sách</h3>
                  </div>
                </div>

                <div className="row x-gap-50 y-gap-30 pt-20">
                  <Poilicies policies={hotel?.policies} />
                </div>
              </div> */}
            </div>
            <div className="col-md-4 mt-20 px-3 px-md-0 mb-3 mb-md-0">
              <SidebarRight2 mapIFrame={tour?.mapIFrame} />
              {/* <RatingBox hotel={tour} /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
