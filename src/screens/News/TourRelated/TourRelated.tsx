import { getToursRecommend } from "@/api/news.api";
import CardItem from "@/components/CardItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newsKeys } from "@/lib/query-keys";

const TourRelated = () => {
  const navigate = useNavigate();

  const { data: tourRelated = [] } = useQuery({
    queryKey: newsKeys.toursRecommend(),
    queryFn: async () => {
      const res = await getToursRecommend();
      return res?.success ? res.data : [];
    },
  });

  return (
    <div
      className="shadow-6 rounded-8"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <div className="d-flex items-center border-bottom-light">
        <img
          src="/images/News/tour-related.png"
          alt="Okdimall tours related"
          className="mr-10 lg:mr-8 object-cover px-16 xl:px-12 lg:px-10 pt-14 xl:pt-12 lg:pt-10"
        />
        <p className="text-18 xl:text-16 lg:text-15 fw-500 text-neutral-800 pt-16">
          Tour giờ chót
        </p>
      </div>
      <div className="row px-10 py-24 xl:py-20 lg:py-15">
        {tourRelated?.length > 0 &&
          tourRelated?.map((item, idx) => (
            <div key={idx} className="col-sm-6 col-lg-4 col-xl-12">
              <CardItem
                key={item.id}
                data={item}
                handleChooseItem={() => {
                  navigate(`/tour/${item?.slug}`);
                }}
                isTour
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TourRelated;
