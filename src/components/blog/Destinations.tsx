import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useEffect, useState } from "react";
import { getRegions } from "@/api/category.api";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetSearchBlogs } from "@/features/blogs/reducers";

const Destinations = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filter } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    getRegions()
      .then((res) => {
        if (res?.success) {
          setRegions(res.data as any);
        } else {
          setRegions([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setRegions([]);
        setLoading(false);
      });
  }, []);
  const handleRegion = (idRegion) => {
    const dataFilter = {
      ...filter,
      Entity: {
        ...filter.Entity,
        RegionFID: idRegion === filter.Entity.RegionFID ? "" : idRegion,
      },
    };
    (dispatch as any)(fetchGetSearchBlogs(dataFilter));
  };
  if (loading) {
    return <Skeleton count={3} />;
  }
  return (
    <>
      <Swiper
        spaceBetween={30}
        className="overflow-hidden"
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
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {regions?.length > 0 ? (
          regions?.map((item) => (
            <SwiperSlide key={item?.id}>
              <div
                onClick={() => handleRegion(item?.id)}
                className="citiesCard -type-2"
                data-aos="fade"
                data-aos-delay={100}
              >
                <div className={`citiesCard__image rounded-4 ratio ratio-1:1 `}>
                  <img
                    className="img-ratio rounded-4 js-lazy"
                    src={item?.thumbnailURL}
                    alt="image"
                  />
                  <div className="citiesCard__overlay"></div>
                </div>
                <h4
                  className={`text-18 lh-13 fw-500 mt-10  ${
                    filter.Entity.RegionFID === item?.id
                      ? "text-blue-1 text-20"
                      : "text-dark-2"
                  } text-capitalize text-center `}
                >
                  {item?.name}
                </h4>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center w-100">Không có điểm đến</div>
        )}
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

export default Destinations;
