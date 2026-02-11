import React from "react";

import { useSelector } from "react-redux";
import useQueryParams from "@/hooks/useQueryParams";
import CardItem from "@/apps/CardItem";
import { useNavigate } from "react-router-dom";

const TourListData = () => {
  const navigate = useNavigate();

  const tourList = useSelector((state) => state.tours.tours);
  const [params, setSearchParams] = useQueryParams();
  const { location: regionIDParam = "NT" } = params || {};

  // const handleClickFavourite = (hotel) => {
  //   // eslint-disable-next-line no-undef
  //   const selectionFired = new CustomEvent("setWishlistTourInfo", {
  //     detail: {
  //       supplierCode: hotel?.supplierCode,
  //       listedPrice: hotel?.listedPrice,
  //       finalPrice: hotel?.finalPrice,
  //       wishListID: hotel?.wishListID,
  //     },
  //   });
  //   console.log("selectionFired", selectionFired);

  //   // eslint-disable-next-line no-undef
  //   document.dispatchEvent(selectionFired);
  // };

  return (
    <div className="row mt-24">
      {tourList.map((item, idx) => (
        <div
          className="col-lg-4 col-sm-6 md:mb-10 sm:mb-16"
          key={idx}
          data-aos="fade"
          // data-aos-delay={item?.delayAnimation}
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
