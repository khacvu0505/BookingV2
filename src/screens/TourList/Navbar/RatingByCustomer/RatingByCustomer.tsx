import React, { useEffect, useState } from "react";
import "./RatingByCustomer.style.scss";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import classNames from "classnames";
import Checkbox from "@/apps/Checkbox";
import { useTranslation } from "react-i18next";

const dataList = [
  {
    id: 1,
    value: 10,
    text: "Tuyệt hảo",
  },
  {
    id: 2,
    value: 9.5,
    text: "Tuyệt vời",
  },
  {
    id: 3,
    value: 8.7,
    text: "Rất tốt",
  },
  // {
  //   id: 4,
  //   value: 8,
  //   text: "Tốt",
  // },
  // {
  //   id: 5,
  //   value: 7,
  //   text: "Tệ",
  // },
];
const RatingByCustomer = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  const [params, setSearchParams] = useQueryParams();
  const { ratingByCustomer: ratingByCustomerParam } = params;

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
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (ratingByCustomerParam) {
      setSelected(+ratingByCustomerParam);
    } else {
      setSelected(0);
    }
  }, [ratingByCustomerParam]);
  return (
    <div className="rating_by_customer mb-32 lg:mb-20 md:mb-16 mt-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("COMMON.NAVIGATION/RATING_BY_CUSTOMERS")}
      </p>
      <div className="rating_by_customer-content">
        {dataList?.length > 0 &&
          dataList.map((item, index) => (
            <div
              key={item.value}
              className={classNames(
                "rating_by_customer_item mb-24 lg:mb-16 md:mb-10",
                {
                  "rating_by_customer_last-item": dataList?.length === index,
                }
              )}
            >
              <div className="form-checkbox d-flex items-center">
                {/* <input
                  type="radio"
                  name="ratingByCustomer"
                  value={item.value}
                  checked={selected === item.value}
                  onClick={() => handleChoose(item.value)}
                  onChange={() => {}}
                />
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div> */}
                <Checkbox
                  name="ratingByCustomer"
                  value={item.value}
                  checked={selected === item.value}
                  onChange={() => handleChoose(item.value)}
                />
                <div className="text-16 lg:text-15 md:text-14 ml-10">
                  {/* <span className="fw-600 mr-10">{item.value} +</span> */}
                  {item.text}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RatingByCustomer;
