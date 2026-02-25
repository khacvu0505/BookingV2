import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import React, { useEffect, useMemo, useState, memo } from "react";
import { useTranslation } from "react-i18next";

const RatingByCustomer = () => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();
  const { ratingByCustomer: ratingByCustomerParam } = params;

  const dataList = useMemo(() => [
    { id: 1, value: 10, text: t("COMMON.RATING_EXCEPTIONAL") },
    { id: 2, value: 9.5, text: t("COMMON.RATING_WONDERFUL") },
    { id: 3, value: 8.7, text: t("COMMON.RATING_VERY_GOOD") },
    { id: 4, value: 8, text: t("COMMON.RATING_GOOD") },
    { id: 5, value: 7, text: t("COMMON.RATING_BAD") },
  ], [t]);
  const [selected, setSelected] = useState(0);

  const handleChoose = (id) => {
    setSelected(id);

    if (id) {
      setSearchParams(
        cleanedObject({
          ...params,
          ratingByCustomer: selected === id ? "" : id,
        })
      );
    } else {
      setSearchParams(
        cleanedObject(
          cleanedObject({
            ...params,
            ratingByCustomer: "",
          })
        )
      );
    }
  };

  useEffect(() => {
    if (ratingByCustomerParam) {
      setSelected(+ratingByCustomerParam);
    } else {
      setSelected(0);
    }
  }, [ratingByCustomerParam]);

  return (
    <>
      {dataList?.length > 0 &&
        dataList.map((item) => (
          <div key={item.value}>
            <div className="form-checkbox d-flex items-center">
              <input
                type="radio"
                name="ratingByCustomer"
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
                {item.text}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default memo(RatingByCustomer);
