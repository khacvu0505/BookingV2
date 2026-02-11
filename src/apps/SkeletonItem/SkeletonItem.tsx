import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonItem = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#cfcbc4">
      <section className="bg-light py-1 px-2 my-3">
        <section className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="mr-20">
              <Skeleton height={98} width={98} />
            </div>
            <div>
              <Skeleton width={378} height={24} />
              <Skeleton width={135} height={24} />
              <Skeleton width={135} height={24} />
            </div>
          </div>
          <div>
            <Skeleton width={135} height={24} />
            <Skeleton width={135} height={24} />
            <Skeleton width={135} height={24} />
          </div>
        </section>
      </section>
    </SkeletonTheme>
  );
};

export default SkeletonItem;
