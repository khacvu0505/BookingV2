import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ReviewSkeletonProps {
  count?: number;
}

const ReviewSkeleton = ({ count = 3 }: ReviewSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            borderBottom: "1px solid #ddd",
            alignItems: "flex-start",
          }}
        >
          {/* Avatar */}
          <Skeleton circle={true} height={60} width={60} />

          <div style={{ flex: 1 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {/* Tên người dùng */}
                <Skeleton width={120} height={20} />
                {/* Ngày */}
                <Skeleton
                  width={100}
                  height={15}
                  style={{ marginTop: "4px" }}
                />
              </div>

              {/* Rating */}
              <Skeleton
                width={50}
                height={30}
                style={{
                  borderRadius: "4px",
                }}
              />
            </div>

            {/* Tiêu đề đánh giá */}
            <Skeleton width={250} height={20} style={{ margin: "12px 0" }} />

            {/* Nội dung đánh giá */}
            <Skeleton count={2} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewSkeleton;
