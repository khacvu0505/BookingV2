import useWindowSize from "@/utils/useWindowSize";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const BlockGuide = () => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(0);
  const { width } = useWindowSize();
  const handleShowMore = (id) => {
    setShowMore(id);
  };
  const blockContent = useMemo(() => [
    {
      id: 1,
      icon: "/img/featureIcons/1.svg",
      title: t("HOME.DIFFERENT"),
      shortText: "",
      text: t("HOME.DIFFERENT_DESC"),
      delayAnim: "100",
    },
    {
      id: 2,
      icon: "/img/featureIcons/2.svg",
      title: t("HOME.REASONABLE_PRICE"),
      shortText: (
        <div>
          {t("HOME.REASONABLE_PRICE_SHORT")}
          <span
            className="text-blue-1 fst-italic cursor-pointer"
            onClick={() => handleShowMore(2)}
          >
            {" "}{t("COMMON.SEE_MORE")}
          </span>
        </div>
      ),
      text: t("HOME.REASONABLE_PRICE_DESC"),
      delayAnim: "200",
    },
    {
      id: 3,
      icon: "/img/featureIcons/3.svg",
      title: t("HOME.SERVICE_QUALITY"),
      shortText: "",
      text: t("HOME.SERVICE_QUALITY_DESC"),
      delayAnim: "300",
    },
    {
      id: 4,
      icon: "/img/featureIcons/4.svg",
      title: t("HOME.TRUST"),
      shortText: "",
      text: t("HOME.TRUST_DESC"),
      delayAnim: "300",
    },
  ], [t, showMore]);

  return (
    <>
      {width > 992 ? (
        blockContent.map((item, index) => (
          <div
            className={"col-lg-3 col-sm-6"}
            data-aos="fade"
            data-aos-delay={item.delayAnim}
            key={item.id}
          >
            <div className="featureIcon -type-1 ">
              <div className="d-flex justify-center">
                <img src={item.icon} alt="image" className="js-lazy h-150" />
              </div>
              <div className="text-justify mt-30 w-400 mx-auto">
                <h4 className="text-18 fw-500">{item.title}</h4>
                <div>
                  {showMore !== item.id && item.shortText
                    ? item.shortText
                    : item.text}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Swiper
          spaceBetween={30}
          className="overflow-hidden z-0"
          modules={[Navigation]}
          navigation={{
            nextEl: ".js-top-desti2-next_active",
            prevEl: ".js-top-desti2-prev_active",
          }}
          breakpoints={{
            540: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {blockContent.map((item, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div
                data-aos="fade"
                data-aos-delay={item.delayAnim}
                key={item.id}
              >
                <div className="featureIcon -type-1 ">
                  <div className="d-flex justify-center">
                    <img
                      src={item.icon}
                      alt="image"
                      className="js-lazy h-150"
                    />
                  </div>
                  <div className="text-justify mt-30 w-400 mx-auto">
                    <h4 className="text-18 fw-500">{item.title}</h4>
                    <div>
                      {showMore !== item.id && item.shortText
                        ? item.shortText
                        : item.text}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default BlockGuide;
