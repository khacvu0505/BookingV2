import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useFetchData } from "@/hooks/useFetchData";
import { getRegions } from "@/api/category.api";
import classNames from "classnames";
import useQueryParams from "@/hooks/useQueryParams";

interface PopularNewsProps {
  handleChangeLocation: (item: any) => void;
  title: string;
  description: string;
}

const PopularNews = ({ handleChangeLocation, title, description }: PopularNewsProps) => {
  const [active, setActive] = useState(0);
  const [regionsList] = useFetchData(getRegions, {});
  const [params, setSearchParams] = useQueryParams();
  const { region } = params;

  useEffect(() => {
    if (region && regionsList?.length > 0) {
      const index = (regionsList as any[])?.findIndex((item: any) => item.id === region);
      if (index !== -1) {
        setActive(index);
        const item = (regionsList as any[])[index];
        handleChangeLocation(item);
        return;
      }
    }
    if ((regionsList as any[])?.length > 0) {
      const item = (regionsList as any[])[active];
      handleChangeLocation(item);
    }
  }, [regionsList, active, region]);

  return (
    <div className="container relative">
      <h2 className="fw-700 text-32 xl:text-26 lg:text-24 text-neutral-800 text-center mb-12 lg:mb-6">
        {title}
      </h2>
      <p className="text-14 text-neutral-800 fw-400 text-center mb-20 lg:mb-15">
        {description}
      </p>
      <Swiper
        className={classNames("overflow-hidden z-0 md:w-3/4 w-90")}
        modules={[Navigation]}
        navigation={{
          nextEl: ".js-top-desti2-next_active",
          prevEl: ".js-top-desti2-prev_active",
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          992: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 7,
          },
          1400: {
            slidesPerView: 9,
          },
        }}
      >
        {(regionsList as any[])?.length > 0 &&
          (regionsList as any[]).map((item: any, idx: number) => (
            <SwiperSlide
              key={item.value}
              className="pointer"
              onClick={() => {
                setActive(idx);
                handleChangeLocation(item);
              }}
            >
              <div data-aos="fade" data-aos-delay={50} key={item.value}>
                <div className="text-center">
                  <img
                    src={item?.thumbnailURL}
                    alt="image"
                    className={classNames(
                      "w-100px h-152px object-cover rounded-24",
                      {
                        "border-highlight": active === idx,
                      }
                    )}
                  />
                  <p
                    className={classNames(
                      "fw-500 text-neutral-800 mt-16 lg:mt-10  lg:text-15",
                      {
                        "text-primary-500": active === idx,
                      }
                    )}
                  >
                    {item?.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <button
        className="section-slider-nav -prev-0 flex-center bg-white text-dark-1 size-40  rounded-full shadow-1   js-top-desti2-prev_active"
        style={{
          boxShadow: "0px 4px 4px 0px #00000040",
          top: "60%",
        }}
        onClick={() => {
          setActive((prev) => prev - 1);
        }}
      >
        <i className="icon icon-chevron-left text-12 " />
      </button>
      <button
        className="section-slider-nav -next-0 flex-center bg-white text-dark-1 size-40  rounded-full shadow-1  js-top-desti2-next_active"
        style={{
          boxShadow: "0px 4px 4px 0px #00000040",
          top: "60%",
        }}
        onClick={() => {
          setActive((prev) => prev + 1);
        }}
      >
        <i className="icon icon-chevron-right text-12 " />
      </button>
    </div>
  );
};

export default PopularNews;
