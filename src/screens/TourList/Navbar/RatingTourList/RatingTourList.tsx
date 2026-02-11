import RatingComponent from "@/apps/Rating";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import React, { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: 1,
    value: 5,
    text: "5",
  },
  {
    id: 2,
    value: 4,
    text: "4",
  },
  {
    id: 3,
    value: 3,
    text: "3",
  },
];

const RatingTourList = () => {
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
  };

  useEffect(() => {
    if (ratingParam) {
      setSelected(+ratingParam);
    } else {
      setSelected(0);
    }
  }, [ratingParam]);
  return (
    <div className="mb-32 lg:mb-20 md:mb-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("COMMON.NAVIGATION/RATING")}
      </p>
      <div>
        {data?.length > 0 &&
          data.map((item) => (
            <div key={item.value}>
              <div className="form-checkbox d-flex items-center mb-16 lg:mb-10 md:mb-6">
                <input
                  type="checkbox"
                  name="rating"
                  value={item.value}
                  checked={selected === item.value}
                  onClick={() => handleChoose(item.value)}
                  onChange={() => {}}
                />
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
                <div className="text-16 lg:text-15 md:text-14 ml-10">
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

export default RatingTourList;
