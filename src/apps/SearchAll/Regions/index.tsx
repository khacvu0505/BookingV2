import { getSearchLocation } from "@/api/hotel.api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchKeys } from "@/lib/query-keys";

const Regions = () => {
  const isDesktop = false;
  const { data: regionList = [] } = useQuery({
    queryKey: searchKeys.regions(),
    queryFn: async () => {
      const res = await getSearchLocation({ keyword: "" });
      return res?.success ? res.data : [];
    },
  });
  const navigate = useNavigate();

  return (
    <div>
      <p className="text-neutral-800 fw-800 pb-5">Địa điểm hấp dẫn </p>
      <div className="d-flex align-items-center flex-wrap mb-2">
        {(regionList as any[])?.length > 0 &&
          (regionList as any[]).map((item: any, idx: number) => (
            <div key={idx} className="cursor-pointer mr-10 mb-10">
              {isDesktop ? (
                <div
                  onClick={() => {
                    navigate(`/destinations?region=${item.locationCode}`);
                  }}
                >
                  <img
                    alt="OKdimall region"
                    src={item.thumbnail}
                    style={{ width: 100, height: 100 }}
                    className="rounded-8 object-cover"
                  />
                  <p className="text-neutral-800 fw-400 text-16 md:text-14 text-center">
                    {item.locationName}
                  </p>
                </div>
              ) : (
                <p
                  className="border-neutral-500 text-13 text-neutral-500 rounded-4  px-1 w-fit"
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                    navigate(`/destinations?region=${item.locationCode}`);
                  }}
                >
                  {item.locationName}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Regions;
