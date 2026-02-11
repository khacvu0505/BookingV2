import Tag from "@/apps/Tag";
import React from "react";

interface AttactiveItemProps {
  data: any;
  handleOptionClick: (item: any) => void;
}

export const AttactiveItem = ({ data, handleOptionClick }: AttactiveItemProps) => {
  return (
    <div
      className="col-auto px-10 mb-10 lg:mb-5 lg:px-5 text-center pointer"
      onClick={() => {
        const convertedLocation = {
          parentName: data?.address,
          thumbnail: data?.thumbnailURL,
          locationCode: data?.id,
          parentCode: data?.code,
          type: 1,
          locationName: data?.name,
        };
        handleOptionClick(convertedLocation || {});
      }}
    >
      <div className="mb-8 d-block lg:d-none">
        <img
          src={data?.thumbnailURL}
          className="h-108 object-cover rounded-24"
          alt="destination-famous "
          width={100}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            (e.target as HTMLImageElement).src =
              "https://api.okdimall.com/Media/Root_Region/phu-quoc.jpg";
          }}
        />
      </div>
      <p className="text-16 lg:text-15  d-block lg:d-none fw-500 text-neutral-800">
        {data?.name}
      </p>
      <Tag data-bs-dismiss="offcanvas" className="d-none lg:d-block lg:text-13">
        {data?.name}
      </Tag>
    </div>
  );
};
