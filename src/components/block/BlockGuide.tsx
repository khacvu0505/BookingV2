import useWindowSize from "@/utils/useWindowSize";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const BlockGuide = () => {
  const [showMore, setShowMore] = useState(0);
  const { width } = useWindowSize();
  const handleShowMore = (id) => {
    setShowMore(id);
  };
  const blockContent = [
    {
      id: 1,
      icon: "/img/featureIcons/1.svg",
      title: "Mang đến sự khác biệt",
      shortText: "",
      text: `Lấy sự trải nghiệm và hài lòng của khách hàng là mục tiêu hàng đầu của chúng tôi, với triết lý lợi người trước, lợi mình sau.`,
      delayAnim: "100",
    },
    {
      id: 2,
      icon: "/img/featureIcons/2.svg",
      title: "Dễ dàng lựa chọn, giá hợp lý",
      shortText: (
        <div>
          Dễ dàng lựa chọn, thay đổi dịch vụ phòng lưu trú khách sạn, resort,
          tour du lịch, sân golf, du thuyền, vé máy bay, và...
          <span
            className="text-blue-1 fst-italic cursor-pointer"
            onClick={() => handleShowMore(2)}
          >
            {" "}
            Xem thêm
          </span>
        </div>
      ),
      text: "Dễ dàng lựa chọn, thay đổi dịch vụ phòng lưu trú khách sạn, resort, tour du lịch, sân golf, du thuyền, vé máy bay, vé tham quan và các dịch vụ khác theo nhu cầu khách hàng. Giá cả phù hợp, cạnh tranh.",
      delayAnim: "200",
    },
    {
      id: 3,
      icon: "/img/featureIcons/3.svg",
      title: "Cam kết chất lượng dịch vụ",
      shortText: "",
      text: `Cam kết mang tới khách hàng các dịch vụ theo tiêu chuẩn với chất lượng tốt nhất, đẳng cấp cao. Hỗ trợ dịch vụ 24/7.`,
      delayAnim: "300",
    },
    {
      id: 4,
      icon: "/img/featureIcons/4.svg",
      title: "Tạo được niềm tin lâu dài",
      shortText: "",
      text: `Thành viên thân thiết, tiềm năng lựa chọn dịch vụ sớm sẽ nhận được ưu đãi tốt về giá kèm phần quà hấp dẫn.`,
      delayAnim: "300",
    },
  ];

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
