import React from "react";

import useQueryParams from "@/hooks/useQueryParams";
import CardItem from "@/apps/CardItem";
import { useNavigate } from "react-router-dom";

interface TourListDataProps {
  tours: any[];
}

const TourListData = ({ tours }: TourListDataProps) => {
  const navigate = useNavigate();
  const [params] = useQueryParams();
  const { location: regionIDParam = "NT" } = params || {};

  return (
    <div className="row mt-24">
      {tours.map((item, idx) => (
        <div
          className="col-lg-4 col-sm-6 md:mb-10 sm:mb-16"
          key={idx}
          data-aos="fade"
        >
          <CardItem
            key={idx}
            data={item}
            handleChooseItem={() => {
              navigate(`/tour/${item?.slug}`);
            }}
            isTour={true}
          />
        </div>
      ))}
    </div>
  );
};

export default TourListData;
