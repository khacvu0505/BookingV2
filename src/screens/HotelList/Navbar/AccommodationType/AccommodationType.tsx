import React, { useEffect, useState } from "react";
import "./AccommodationType.style.scss";
import useQueryParams from "@/hooks/useQueryParams";
import { getAccomordationType } from "@/api/hotel.api";
import { cleanedObject } from "@/utils/utils";
import classNames from "classnames";
import Checkbox from "@/apps/Checkbox";
import { useTranslation } from "react-i18next";

const AccommodationType = () => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();
  const { accommodationType: AccommodationTypeParams } = params;
  const [benefitList, setBenefitList] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleChooseBenefit = (id) => {
    const isExisted = selected.includes(id);

    const data = isExisted
      ? [...selected].filter((item) => item !== id)
      : [...selected, id];
    setSelected(data);

    if (data?.length > 0) {
      setSearchParams({
        ...params,
        accommodationType: data.join("-"),
      });
    } else {
      setSearchParams(
        cleanedObject({
          ...params,
          accommodationType: "",
        })
      );
    }
  };

  useEffect(() => {
    if (AccommodationTypeParams) {
      setSelected(AccommodationTypeParams.split("-"));
    } else {
      setSelected([]);
    }
  }, [AccommodationTypeParams]);

  useEffect(() => {
    getAccomordationType()
      .then((res) => {
        setBenefitList(res.data);
      })
      .catch(() => {
        setBenefitList([]);
      });
  }, []);

  return (
    <div className="accommodation_type mb-32 lg:mb-20 md:mb-16 mt-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-18 md:mb-10">
        {t("HOTELS.NAVIGATION/ACCOMMODATION")}
      </p>
      <div className="accommodation_list">
        {benefitList?.length > 0 &&
          benefitList.map((benefit, idx) => (
            <div
              key={idx}
              className={classNames(
                "accommodation_list-item mb-16 lg:mb-10 md:mb-6",
                {
                  "accommodation_list-last-item":
                    benefitList.length - 1 === idx,
                }
              )}
            >
              <div className="form-checkbox d-flex items-center">
                {/* <input
                  type="checkbox"
                  value={benefit.valueString}
                  checked={selected.includes(benefit.valueString)}
                  onChange={() => handleChooseBenefit(benefit.valueString)}
                />
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div> */}
                <Checkbox
                  type="checkbox"
                  value={benefit.valueString}
                  checked={selected.includes(benefit.valueString)}
                  onChange={() => handleChooseBenefit(benefit.valueString)}
                />
                <div className="text-16 lg:text-15 md:text-14 ml-10">
                  {benefit.text}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AccommodationType;
