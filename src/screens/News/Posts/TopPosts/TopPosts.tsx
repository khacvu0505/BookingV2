import { getNewsByRegion } from "@/api/news.api";
import Pagination from "@/components/Pagination";
import useQueryParams from "@/hooks/useQueryParams";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newsKeys } from "@/lib/query-keys";

const TopPosts = ({ selected }) => {
  const navigate = useNavigate();
  const [params, setSearchParams] = useQueryParams();
  const pageParam = Number(params.page) || 1;

  const { data: queryData } = useQuery({
    queryKey: newsKeys.topPosts(selected?.id || "NT", pageParam),
    queryFn: async () => {
      const res = await getNewsByRegion({
        Page: pageParam,
        PageSize: 10,
        Entity: {
          RegionFID: selected?.id || "NT",
          CateID: "",
          Keyword: "",
          SupplierType: "",
        },
      });
      if (res?.success) {
        return { list: res.data, totalPage: res.totalPage ?? 1 };
      }
      return { list: null, totalPage: 1 };
    },
  });

  const newsData = queryData?.list;
  const totalPage = queryData?.totalPage ?? 1;
  const topPosts = newsData?.[0] ?? null;
  // onClick={() => {
  //   navigate(`/news/${item?.slug}`);
  // }}
  return (
    <>
      {topPosts && (
        <div
          className="mb-27 xl:mb-20 lg:mb-15 pointer"
          onClick={() => {
            navigate(`/news/${topPosts?.slug}`);
          }}
        >
          <img
            src={topPosts?.thumbnailURL}
            alt="OKdimall news"
            className="rounded-8 mb-16"
          />
          <h2 className="fw-500 text-24 xl:text-20 lg:text-18 md:text-16 text-neutral-800 mb-8">
            {topPosts?.blogName}
          </h2>
          <p className="text-18 xl:text-16 lg:text-14 fw-400 text-neutral-500 text-truncate-2">
            {topPosts?.description}
          </p>
        </div>
      )}
      <div className="row">
        {newsData?.length > 1 &&
          newsData.slice(1).map((item) => (
            <div
              key={item.id}
              className="col-md-6 pointer mb-24"
              onClick={() => {
                navigate(`/news/${item?.slug}`);
              }}
            >
              <img
                src={item.thumbnailURL}
                alt="OKdimall news"
                className="rounded-8 mb-16 object-fit-cover w-100"
                style={{ height: "187px" }}
              />
              <h3 className="text-18 xl:text-16 lg:text-15 fw-500 text-neutral-800 mb-8">
                {item.blogName}
              </h3>
              <p className="text-truncate-2 text-16 xl:text-14 lg:text-13 fw-400 text-neutral-500">
                {item.description}
              </p>
            </div>
          ))}
      </div>
      <Pagination totalPage={totalPage} />
    </>
  );
};

export default TopPosts;
