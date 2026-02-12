import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";

const HotPlaces = () => {
  const navigate = useNavigate();
  const placesContent = [
    {
      id: 1,
      name: "Sapa",
    },
    {
      id: 2,
      name: "Phú Quốc",
    },
    {
      id: 3,
      name: "Đà Lạt",
    },
    {
      id: 4,
      name: "Nha Trang",
    },
    {
      id: 5,
      name: "Vũng Tàu",
    },
  ];
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
