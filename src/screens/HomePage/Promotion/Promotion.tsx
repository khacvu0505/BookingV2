import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useEffect, useState } from "react";
import { getVoucherCategory } from "@/api/promotion.api";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames";

const Promotion = ({ initialVouchers }: { initialVouchers?: any[] }) => {
  const [swiperData, setSwiperData] = useState({
    activeIndex: 0,
    isEnd: false,
  });
  const [vouchers, setVouchers] = useState(initialVouchers || []);
  const [loading, setLoading] = useState(!initialVouchers);
  useEffect(() => {
    if (initialVouchers && initialVouchers.length > 0) return;
    setLoading(true);
    getVoucherCategory()
      .then((res) => {
        if (res?.success) {
          setVouchers(res.data);
        } else {
          setVouchers([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setVouchers([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="row">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <Skeleton count={1} height={150} />
            </div>
          ))}
      </div>
    );
  }

  if (vouchers.length === 0) {
    return null;
  }

  return (
    <>
      <Swiper
        spaceBetween={30}
        className="overflow-hidden z-0"
        modules={[Navigation]}
        navigation={{
          nextEl: ".js-top-desti2-next_active",
          prevEl: ".js-top-desti2-prev_active",
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
            spaceBetween: 15,
          },

          1024: {
            slidesPerView: 3,
          },
        }}
        onSlideChange={(swiper) => {
          setSwiperData({
            activeIndex: swiper.activeIndex,
            isEnd: swiper.isEnd,
          });
        }}
      >
        {vouchers.map((item) => (
          <SwiperSlide
            key={item.value}
            // onClick={(e) => handleVoucher(e, item?.value)}
            className="cursor-pointer"
          >
            <div data-aos="fade" data-aos-delay={50} key={item.value}>
              <div className="ctaCard -type-1 rounded-22 -no-overlay ">
                <div className="ctaCard__image-200 ratio ratio-41:45">
                  <img
                    className="js-lazy img-ratio"
                    src={item?.icon}
                    alt="image"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={classNames(
          "section-slider-nav -prev flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1 js-top-desti2-prev_active",
          {
            "d-none": swiperData?.activeIndex === 0,
          }
        )}
      >
        <i className="icon icon-chevron-left text-13 text-blue-1" />
      </button>
      <button
        className={classNames(
          "section-slider-nav -next flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1 js-top-desti2-next_active",
          {
            "d-none": swiperData?.isEnd,
          }
        )}
      >
        <i className="icon icon-chevron-right text-13 text-blue-1" />
      </button>
    </>
  );
};

export default Promotion;
