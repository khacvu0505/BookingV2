import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const HotPlaces = () => {
  const { t } = useTranslation();
  const placesContent = useMemo(() => [
    {
      id: 1,
      name: t("HOME.HOT_PLACE/SAPA"),
    },
    {
      id: 2,
      name: t("HOME.HOT_PLACE/PHU_QUOC"),
    },
    {
      id: 3,
      name: t("HOME.HOT_PLACE/DA_LAT"),
    },
    {
      id: 4,
      name: t("HOME.HOT_PLACE/NHA_TRANG"),
    },
    {
      id: 5,
      name: t("HOME.HOT_PLACE/VUNG_TAU"),
    },
  ], [t]);
  return (
    <div className="slider mr-30">
      <Swiper
        direction="vertical"
        loop={true}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="swiper-hotPlaces"
      >
        {placesContent.map((item) => (
          <SwiperSlide
            key={item.id}
            className="d-flex align-items-center cursor-pointer"
            // onClick={() => navigate("/destinations")}
          >
            <p className="hot-tag">HOT</p>
            <button className="-no-color">{item.name}</button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotPlaces;
