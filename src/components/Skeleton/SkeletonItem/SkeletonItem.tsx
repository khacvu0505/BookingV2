import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonItem = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <section className="bg-light py-1 px-2 my-3">
        <section className="d-flex justify-content-between md:flex-column">
          <div className="d-flex md:flex-column md:w-1/1">
            <div className="mr-20 md:mr-0 md:mb-10">
              <Skeleton height={98} width={98} className="md:w-1/1" style={{ maxWidth: "100%" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Skeleton height={24} style={{ maxWidth: 378 }} />
              <Skeleton width={135} height={24} />
              <Skeleton width={135} height={24} />
            </div>
          </div>
          <div className="md:mt-10">
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
