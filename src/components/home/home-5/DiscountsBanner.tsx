import { getRegions } from "@/api/category.api";
import { setRegions } from "@/features/hotel-list/hotelSlice";
import { fetchRecommendHotels } from "@/features/hotel-list/reducers";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const listRecommendLabel = [
  "Top khu nghỉ dưỡng",
  "Thương hiệu quốc tế",
  "Thương hiệu Việt",
  "Top villa đẳng cấp",
  "Căn hộ sang trọng",
  "Tour được ưa chuộng",
  // "Vé tham quan hot",
];

const DiscountsBanner = ({ productRecommend }) => {
  const dispatch = useDispatch();
  const [recommendType, setRecommendType] = useState(1);

  useEffect(() => {
    getRegions()
      .then((res) => {
        dispatch(setRegions(res.data));
      })
      .catch(() => {
        dispatch(setRegions([]));
      });
    const params = { type: recommendType };
    (dispatch as any)(fetchRecommendHotels(params));
  }, [dispatch, recommendType]);

  return (
    <div
      className="ctaCard -type-1 rounded-4  -no-overlay max-h-600"
      // style={{ height: "80vh" }}
      data-aos="fade"
      data-aos-dealy="100"
    >
      <div className="ctaCard__image ratio ratio-63:55 h-100 ">
        <img
          className="img-ratio js-lazy rounded-22"
          src={productRecommend}
          alt="image"
        />
      </div>

      <div className="ctaCard__content py-40 px-40 lg:py-20 lg:px-20 max-h-600">
        <h3 className="text-white text-26">Sản phẩm bán chạy</h3>

        <div
          className="h-100 d-flex flex-column justify-center align-items-center"
          style={{ width: "70%" }}
        >
          {listRecommendLabel.map((item, index) => (
            <div key={index} className="mt-10 mb-10">
              <div className="d-inline-block">
                <button
                  className={classNames(
                    "button px-30 py-10 -blue-1 -min-210 bg-white text-dark-1 ",
                    {
                      "bg-blue-1 text-white ": index + 1 === recommendType,
                    }
                  )}
                  onClick={() => setRecommendType(index + 1)}
                >
                  {item}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountsBanner;
