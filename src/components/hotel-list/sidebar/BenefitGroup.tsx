import { getBenefitGroup } from "@/api/hotel.api";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import React, { useEffect, useState, memo } from "react";

const BenefitGroup = () => {
  const [params, setSearchParams] = useQueryParams();
  const { benefit: benefitParam } = params;

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
        benefit: data.join("-"),
      });
    } else {
      setSearchParams(
        cleanedObject({
          ...params,
          benefit: "",
        })
      );
    }
  };

  // useEffect(() => {
  //   if (selected.length > 0) {
  //     setSearchParams({
  //       ...params,
  //       benefit: selected.join("-"),
  //     });
  //   } else {
  //     setSearchParams(
  //       cleanedObject({
  //         ...params,
  //         benefit: "",
  //       })
  //     );
  //   }
  // }, [selected]);

  useEffect(() => {
    if (benefitParam) {
      setSelected(benefitParam.split("-"));
    } else {
      setSelected([]);
    }
  }, [benefitParam]);

  useEffect(() => {
    getBenefitGroup()
      .then((res) => {
        setBenefitList(res.data);
      })
      .catch(() => {
        setBenefitList([]);
      });
  }, []);

  return (
    <>
      {benefitList?.length > 0 &&
        benefitList.map((benefit) => (
          <div key={benefit.value}>
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                value={benefit.id}
                checked={selected.includes(benefit.value)}
                onChange={() => handleChooseBenefit(benefit.value)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{benefit.text}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default memo(BenefitGroup);
