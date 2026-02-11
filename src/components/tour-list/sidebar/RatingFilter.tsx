import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import React, { useEffect, useState, memo } from "react";
import RatingComponent from "@/components/rating";

const RatingsFilter = () => {
  const [params, setSearchParams] = useQueryParams();
  const { rating: ratingParam } = params;

  const [dataList, setDataList] = useState([
    {
      id: 1,
      value: 3,
      text: "3",
    },
    {
      id: 2,
      value: 3.5,
      text: "3+",
    },
    {
      id: 3,
      value: 4,
      text: "4",
    },
    {
      id: 4,
      value: 4.5,
      text: "4+",
    },
  ]);
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
    <>
      {dataList?.length > 0 &&
        dataList.map((item) => (
          <div key={item.value}>
            <div className="form-checkbox d-flex items-center">
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
              <div className="text-15 ml-10">
                {/* <span className="fw-600 mr-10">{item.value} +</span> */}
                {/* {item.text} */}
                <RatingComponent
                  stop={item?.value}
                  initialRating={item?.value}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default memo(RatingsFilter);
