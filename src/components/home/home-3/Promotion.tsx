import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useEffect, useState } from "react";
import { getVoucherCategory } from "@/api/promotion.api";
import Skeleton from "react-loading-skeleton";

const Promotion = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

  const handleVoucher = (e, value) => {
    e.preventDefault();
    navigate(`/promotions?page=1&pageSize=10&voucherGroup=${value}`);
  };

  useEffect(() => {
    const handleBackNavigation = (event) => {
      navigate("/", { replace: true });
    };

    // eslint-disable-next-line no-undef
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  if (loading) {
    return <Skeleton count={3} />;
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
        {vouchers.map((item) => (
          <SwiperSlide
            key={item.value}
            onClick={(e) => handleVoucher(e, item?.value)}
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
                <div className="ctaCard__content  py-30 px-30 lg:py-15 lg:px-15">
                  {/* {item.meta ? (
                    <>
                      <div className="text-15 fw-500 text-white mb-10">
                        Enjoy Summer Deals
                      </div>
                    </>
                  ) : (
                    ""
                  )} */}

                  {/* <h4 className="text-24 lg:text-18 text-white">
                    {item?.text}
                  </h4> */}
                  {/* <div className="d-inline-block mt-30">
                    <Link
                      to={`/promotions?page=1&pageSize=10&voucherGroup=${item?.value}`}
                      className="button px-48 py-10 -blue-1 -min-180 bg-white text-dark-1"
                    >
                      Khám phá
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Start naviation button for next prev slide */}
      <button className="section-slider-nav -prev flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1 sm:d-none  js-top-desti2-prev_active">
        <i className="icon icon-chevron-left text-12 text-blue-1" />
      </button>
      <button className="section-slider-nav -next flex-center bg-white text-dark-1 size-40 border-blue-1 rounded-full shadow-1 sm:d-none  js-top-desti2-next_active">
        <i className="icon icon-chevron-right text-12 text-blue-1" />
      </button>
      {/* End navigation button for next prev  slide */}
    </>
  );
};

export default Promotion;
