import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SkeletonCard.style.scss";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      {/* Header Section */}
      <div className="skeleton-card__header">
        <Skeleton height={200} />
        <Skeleton
          circle
          width={50}
          height={50}
          className="skeleton-card__icon"
        />
        <div className="skeleton-card__dots">
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              circle
              width={10}
              height={10}
              className="dot"
            />
          ))}
        </div>
        {/* Thanh ngang dưới dots */}
        <div className="skeleton-card__box">
          <Skeleton height={17} width="100%" />
        </div>
      </div>

      {/* Content Section */}
      <div className="skeleton-card__content">
        {/* <div className="skeleton-card__button">
          <Skeleton height={35} />
        </div> */}
        <Skeleton height={15} width="50%" className="mt-20" />
        <Skeleton height={25} width="90%" />
        <div className="d-flex">
          <Skeleton width={25} height={25} className="mr-5" />
          <Skeleton height={25} width={200} />
        </div>
        <div className="mt-20 text-right">
          <Skeleton width={150} height={15} />
          <Skeleton height={15} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
