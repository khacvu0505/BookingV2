import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import CSS cần thiết cho Swiper

const Images = ({ images = [] }) => {
  const isLessThanNine = images.length < 9;

  return (
    <div className="mt-32">
      <Swiper
        watchSlidesProgress={true}
        // slidesPerView={isLessThanNine ? images.length : 9} // Dùng số lượng ảnh thực tế nếu ít hơn 9
        centeredSlides={isLessThanNine} // Căn giữa khi ít slide
        className="d-flex"
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
          1400: {
            slidesPerView: 9,
          },
        }}
      >
        {images?.length > 0 &&
          images.map((item, idx) => (
            <SwiperSlide key={idx} className="pointer text-center h-auto">
              <img
                src={item}
                alt={`Image ${idx + 1}`}
                className="object-cover"
                style={{
                  width: isLessThanNine ? "216px" : "auto",
                  height: isLessThanNine ? "216px" : "100%",
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Images;
