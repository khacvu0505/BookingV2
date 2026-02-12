import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import React, { useEffect, useState, memo } from "react";
import RatingComponent from "@/components/ratings/RatingSvg";
import "./RatingHotelList.style.scss";
import classNames from "classnames";
import Checkbox from "@/components/Form/Checkbox";
import { useTranslation } from "react-i18next";

const dataList = [
  {
    id: 6,
    value: 5.5,
    text: "5+",
  },
  {
    id: 5,
    value: 5,
    text: "5",
  },
  {
    id: 4,
    value: 4.5,
    text: "4+",
  },
  {
    id: 3,
    value: 4,
    text: "4",
  },
  {
    id: 2,
    value: 3.5,
    text: "3+",
  },
  {
    id: 1,
    value: 3,
    text: "3",
  },
];
const RatingHotelList = () => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();
  const { rating: ratingParam } = params;
  const [selected, setSelected] = useState(0);

  const handleChoose = (id) => {
    setSelected(id);

    if (id) {
      setSearchParams(
        cleanedObject({
          ...params,
          rating: selected === id ? "" : id,
        })
      );
    } else {
      setSearchParams(
        cleanedObject(
          cleanedObject({
            ...params,
            rating: "",
          })
        )
      );
    }
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (ratingParam) {
      setSelected(+ratingParam);
    } else {
      setSelected(0);
    }
  }, [ratingParam]);
  return (
    <div className="rating_hotel mb-32 lg:mb-20 md:mb-16 mt-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("COMMON.NAVIGATION/RATING")}
      </p>
      <div className="rating_hotel_content">
        {dataList?.length > 0 &&
          dataList.map((item, index) => (
            <div
              key={item.value}
              className={classNames(
                "rating_hotel_item mb-16 lg:mb-10 md:mb-6",
                {
                  "rating_hotel_last-item": dataList?.length === index,
                }
              )}
            >
              <div className="form-checkbox d-flex items-center">
                <Checkbox
                  name="rating"
                  value={item.value}
                  checked={selected === item.value}
                  onClick={() => handleChoose(item.value)}
                  onChange={() => {}}
                />
                <div className="text-15 ml-10">
                  <RatingComponent
                    stop={item?.value}
                    initialRating={item?.value}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RatingHotelList;
