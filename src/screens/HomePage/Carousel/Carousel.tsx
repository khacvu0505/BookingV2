import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "next/image";
import MasterSearch from "@/components/Search/MasterSearch";
import "./Carousel.styles.scss";
import { useTranslation } from "react-i18next";

const Carousel = ({ banners }) => {
  const { t } = useTranslation();
  if (!banners) return null;

  const pagination = {
    clickable: true,
    renderBullet: function (_, className) {
      return (
        '<span class="' +
        className +
        '" style="width:12px;height: 12px"></span>'
      );
    },
  };

  return (
    <>
      <section className="carouselContainer masthead -type-7 -no-overlay">
        <div className="masthead-slider js-masthead-slider-7 lg:sticky">
          <Swiper modules={[Pagination]} loop={true} pagination={pagination}>
            {banners?.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="row justify-center text-center ">
                  <div className="col-auto">
                    <div className="masthead__content">
                      <div className="masthead__bg">
                        <Image
                          src={banner}
                          alt="image-banner"
                          fill
                          sizes="100vw"
                          style={{ objectFit: "cover" }}
                          priority={index === 0}
                        />
                      </div>
                      <div className="carouselTitle">
                        <h1
                          className="text-70 fw-700 xxl:text-60 xl:text-50 lg:text-40 md:text-25 text-white"
                          data-aos="fade-up"
                          data-aos-delay="100"
                        >
                          {t("HOME.TITLE")}
                        </h1>
                        <div
                          className={
                            "text-white text-24 xxl:text-22 xl:text-20 lg:text-16  md:text-14"
                          }
                          data-aos="fade-up"
                          data-aos-delay="300"
                        >
                          {t("HOME.SUB_TITLE")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="carouselMasterSearch container">
          <MasterSearch />
        </div>
      </section>
    </>
  );
};

export default Carousel;
