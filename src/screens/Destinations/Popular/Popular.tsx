import React, { useState } from "react";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import CardItem from "@/apps/CardItem";
import Icon5 from "../svg/Icon5";
import Icon1 from "../svg/Icon1";
import Icon2 from "../svg/Icon2";
import Icon3 from "../svg/Icon3";
import Icon4 from "../svg/Icon4";
import Icon6 from "../svg/Icon6";
import Icon7 from "../svg/Icon7";
import { getPopularDestinations } from "@/api/destinations.api";
import { useNavigate } from "react-router-dom";
import { addDate, formatDate } from "@/utils/utils";
import TabRecomment from "@/apps/TabRecomment";
import SkeletonCard from "@/apps/SkeletonCard";
import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";
import { destinationKeys } from "@/lib/query-keys";

const getData = () => [
  {
    id: 1,
    name: t("DESTINATIONS.TOP_RESORTS"),
    description: `320 ${t("DESTINATIONS.HOTELS")}`,
    img: <Icon1 />,
    imgActive: <Icon1 isActive />,
    isTour: false,
  },
  {
    id: 2,
    name: t("DESTINATIONS.INTERNATIONAL_BRAND"),
    description: `320 ${t("DESTINATIONS.RESORTS")}`,
    img: <Icon2 />,
    imgActive: <Icon2 isActive />,
    isTour: false,
  },
  {
    id: 3,
    name: t("DESTINATIONS.VIETNAMESE_BRAND"),
    description: `320 ${t("DESTINATIONS.RESORTS")}`,
    img: <Icon3 />,
    imgActive: <Icon3 isActive />,
    isTour: false,
  },
  {
    id: 4,
    name: t("DESTINATIONS.LUXURY_APARTMENTS"),
    description: `320 ${t("DESTINATIONS.DEPARTMENTS")}`,
    img: <Icon4 />,
    imgActive: <Icon4 isActive />,
    isTour: false,
  },
  {
    id: 5,
    name: t("DESTINATIONS.TOP_CLASS_VILLAS"),
    description: `320 ${t("DESTINATIONS.VILLAS")}`,
    img: <Icon5 />,
    imgActive: <Icon5 isActive />,
    isTour: false,
  },
  {
    id: 6,
    name: t("DESTINATIONS.POPULAR_TOURS"),
    description: `320 ${t("DESTINATIONS.TOURS")}`,
    img: <Icon6 />,
    imgActive: <Icon6 isActive />,
    isTour: true,
  },
  {
    id: 7,
    name: t("DESTINATIONS.FLIGHTS"),
    description: `320 ${t("DESTINATIONS.FLIGHTS")}`,
    img: <Icon7 />,
    imgActive: <Icon7 isActive />,
    isTour: false,
  },
];

const Section = ({ items, selected, onClick }) => {
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {items.map((item) => (
        <div
          key={item.id}
          className={classNames(
            "mb-16 xl:mb-14 lg:mb-10 xl:mr-20 lg:mr-15 mr-25"
          )}
          onClick={() => onClick(item)}
        >
          <div
            className={classNames("d-inline-block pointer rounded-8 border-2", {
              "border-primary-500 ": selected.id === item.id,
              "border-neutral-100": selected.id !== item.id,
            })}
          >
            <div className="d-flex items-center py-16 px-33 xl:py-14 xl:px-25 lg:py-10 lg:px-20">
              {selected.id === item.id ? item?.imgActive : item.img}
              <div className="ml-12">
                <p
                  className={classNames(
                    "text-16 xl:text-15 lg:text-14 fw-500 text-neutral-800",
                    {
                      "text-primary-500": selected.id === item.id,
                    }
                  )}
                >
                  {item.name}
                </p>
                <p
                  className={classNames(
                    "text-14 xl:text-13 fw-400 text-neutral-300",
                    {
                      "text-primary-300": selected.id === item.id,
                    }
                  )}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Popular = () => {
  const navigate = useNavigate();

  const sections = [
    getData().slice(0, 3), // Top Items
    getData().slice(3, 7), // Bottom Items
    getData().slice(7), // End Items
  ];
  const [selected, setSelected] = useState(getData()[0]);

  const { data: tourRelated = [], isLoading } = useQuery({
    queryKey: destinationKeys.popular(selected?.id),
    queryFn: async () => {
      const res = await getPopularDestinations({ type: selected?.id });
      return res?.data || [];
    },
    enabled: !!selected?.id,
  });

  return (
    <div>
      <h2 className="text-32 xl:text-26 lg:text-24 fw-700 text-neutral-800 mb-12 lg:mb-10 text-center">
        {t("DESTINATIONS.BEST_SELLING_PRODUCTS")}
      </h2>
      <p className="text-14 xl:text-13 fw-400 text-neutral-800 text-center mb-30 lg:mb-20">
        {t("DESTINATIONS.BEST_SELLING_PRODUCTS_DESCRIPTION")}
      </p>
      <div className="xl:d-none d-block">
        {sections.map((items, idx) =>
          items.length > 0 ? (
            <>
              <div key={idx}>
                <Section
                  items={items}
                  selected={selected}
                  onClick={(item) => setSelected(item)}
                />
              </div>
            </>
          ) : null
        )}
      </div>

      <div className="d-none xl:d-block">
        <TabRecomment
          defaultActive={1}
          listTabs={getData()}
          handleRecommentItem={(_, item) => setSelected(item)}
        />
      </div>
      {isLoading && (
        <div className=" row mt-16">
          {[...Array(4)].map((_, index) => (
            <div className="col-md-6 col-lg-4 col-xxl-3 mb-16" key={index}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      )}

      {!isLoading && tourRelated?.length > 0 ? (
        <div className="relative mt-30 xl:mt-20 lg:mt-15">
          <Swiper
            spaceBetween={20}
            className="overflow-hidden z-0 px-10"
            modules={[Navigation]}
            navigation={{
              nextEl: ".js-top-desti2-next_active",
              prevEl: ".js-top-desti2-prev_active",
            }}
            breakpoints={{
              540: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 3,
              },
              1600: {
                slidesPerView: 4,
              },
            }}
          >
            {tourRelated?.length > 0 &&
              tourRelated?.map((item, index) => (
                <SwiperSlide
                  key={`${item.value} ${index}`}
                  // onClick={(e) => handleVoucher(e, item?.value)}
                  className="cursor-pointer"
                >
                  <CardItem
                    key={item.id}
                    data={item}
                    handleChooseItem={() => {
                      if (selected.isTour) {
                        navigate(`/tour/${item?.slug}`);
                        return;
                      }
                      navigate(
                        `/hotels/${item?.slug}/?checkIn=${formatDate(
                          new Date()
                        )}&checkOut=${addDate(
                          new Date(),
                          3
                        )}&adults=2&children=1&room=1
                        `
                      );
                    }}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          {tourRelated?.length > 0 && (
            <div>
              <button className="section-slider-nav -prev flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1  js-top-desti2-prev_active">
                <i className="icon icon-chevron-left text-12 text-blue-1" />
              </button>
              <button className="section-slider-nav -next flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1  js-top-desti2-next_active">
                <i className="icon icon-chevron-right text-12 text-blue-1" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 lg:text-15 md:text-14">
          {t("COMMON.NO_DATA")}
        </div>
      )}
    </div>
  );
};

export default Popular;
