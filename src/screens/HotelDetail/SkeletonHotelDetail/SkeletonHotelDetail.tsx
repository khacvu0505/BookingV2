import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotelDetailSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          {/* Tiêu đề + đánh giá */}
          <div style={{ marginBottom: "12px" }}>
            <Skeleton width="60%" height={28} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              {/* Ngôi sao */}
              <Skeleton
                width={120}
                height={20}
                style={{ marginRight: "8px" }}
              />
              {/* Địa chỉ */}
              <Skeleton width="30%" height={18} />
            </div>
          </div>

          {/* Ảnh chính lớn */}
          <Skeleton
            width="100%"
            height={400}
            style={{ borderRadius: "8px", marginBottom: "16px" }}
          />

          {/* Bộ ảnh nhỏ */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                width="23%"
                height={100}
                style={{ borderRadius: "8px" }}
              />
            ))}
          </div>

          {/* Nút và giá */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton width="20%" height={28} />
            <Skeleton
              width="25%"
              height={40}
              style={{ borderRadius: "20px" }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelDetailSkeleton;
