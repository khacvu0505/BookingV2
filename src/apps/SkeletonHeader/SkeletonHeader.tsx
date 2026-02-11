import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./SkeletonHeader.style.scss";

const SkeletonHeader = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#cfcbc4">
      <section className="d-flex justify-content-between items-center">
        <div className="d-flex">
          <Skeleton width={15} className="mr-10" />
          <Skeleton width={200} />
        </div>
        <Skeleton width={100} height={30} />
      </section>
    </SkeletonTheme>
  );
};

export default SkeletonHeader;
