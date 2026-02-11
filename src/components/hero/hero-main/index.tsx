import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import MainFilterSearchBox from "./MainFilterSearchBox";

const index = ({ banners }) => {
  if (!banners) return null;

  return (
    <>
      <section className="masthead -type-7 pt-0 -no-overlay">
        <div className="masthead-slider js-masthead-slider-7">
          <Swiper
            modules={[Navigation]}
            loop={true}
            navigation={{
              nextEl: ".hero7-next-active",
              prevEl: ".hero7-prev-active",
            }}
          >
            {banners?.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="row justify-center text-center ">
                  <div className="col-auto">
                    <div className="masthead__content">
                      <div className="masthead__bg">
                        <img src={banner} alt="image-banner" />
                      </div>
                      <h1
                        className="text-60 lg:text-40 md:text-30 text-white"
                        data-aos="fade-up"
                        data-aos-delay="100"
                      >
                        Khám phá thế giới của bạn
                      </h1>
                      <div
                        className={"text-white text-15  md:text-13"}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        Những địa điểm tuyệt vời đang chờ bạn với ưu đãi hấp dẫn
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="masthead-slider__nav -prev js-prev md:d-none">
            <button className="button -outline-white size-50 flex-center text-white rounded-full hero7-prev-active">
              <i className="icon-arrow-left" />
            </button>
          </div>
          {/* End prev navigation */}

          <div className="masthead-slider__nav -next js-next md:d-none">
            <button className="button -outline-white size-50 flex-center text-white rounded-full hero7-next-active">
              <i className="icon-arrow-right" />
            </button>
          </div>
          {/* End next navigation */}
        </div>
        {/* End slider */}

        <MainFilterSearchBox />
        {/* End tab-filter */}
      </section>
      {/* End section */}
    </>
  );
};

export default index;
