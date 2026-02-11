import { getNewsRelated } from "@/api/news.api";
import { useFetchData } from "@/hooks/useFetchData";
import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedPosts = () => {
  const navigate = useNavigate();
  const [newsData, isLoading, totalPage] = useFetchData(getNewsRelated, {});
  return (
    <div className="md:px-16">
      {newsData?.length > 0 &&
        newsData.map((item, idx) => (
          <div
            key={idx}
            className="pointer border-bottom-light pb-14 mb-14 w-100"
            onClick={() => {
              navigate(`/news/${item?.slug}`);
            }}
          >
            <div className="row w-100">
              <div className="col-3 col-md-5 pr-0">
                <img
                  src={item?.thumbnailImageURL}
                  alt="OKdimall news"
                  className="rounded-8 object-cover w-100"
                  style={{
                    width: 96,
                    height: 71,
                  }}
                />
              </div>

              <div className="col-9 col-md-7  pr-0">
                <h4 className="text-12 fw-500 text-neutral-800 text-truncate">
                  {item?.blogName}
                </h4>
                <p className="text-12 fw-400 text-neutral-300 text-truncate-2">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RelatedPosts;
