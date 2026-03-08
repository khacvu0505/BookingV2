import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotelDetailSkeleton = () => {
  return (
    <div style={{ padding: "16px 0" }}>
      {/* Breadcrumb */}
      <Skeleton width={250} height={16} style={{ marginBottom: "16px" }} />

      {/* Title + rating */}
      <Skeleton width="50%" height={28} />
      <div style={{ display: "flex", alignItems: "center", marginTop: "8px", gap: "8px" }}>
        <Skeleton width={120} height={20} />
        <Skeleton width="30%" height={18} />
      </div>

      {/* Gallery */}
      <Skeleton
        width="100%"
        height={400}
        style={{ borderRadius: "8px", marginTop: "20px" }}
      />
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            width="23%"
            height={100}
            style={{ borderRadius: "8px" }}
          />
        ))}
      </div>

      {/* Property highlights */}
      <div style={{ marginTop: "30px" }}>
        <Skeleton width={200} height={24} />
        <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width={100} height={32} style={{ borderRadius: "16px" }} />
          ))}
        </div>
      </div>

      {/* Search bar placeholder */}
      <Skeleton
        width="100%"
        height={60}
        style={{ borderRadius: "12px", marginTop: "30px" }}
      />

      {/* Room list */}
      <div style={{ marginTop: "30px" }}>
        <Skeleton width={200} height={28} style={{ marginBottom: "16px" }} />
        <div className="row">
          <div className="col-xl-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "12px",
                  background: "#f9f9f9",
                }}
              >
                <div style={{ display: "flex", gap: "16px" }}>
                  <Skeleton width={120} height={90} style={{ borderRadius: "8px" }} />
                  <div style={{ flex: 1 }}>
                    <Skeleton width="70%" height={20} />
                    <Skeleton width="40%" height={16} style={{ marginTop: "8px" }} />
                    <Skeleton width="50%" height={16} style={{ marginTop: "8px" }} />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={80} height={32} style={{ marginTop: "8px", borderRadius: "20px" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div style={{ marginTop: "40px" }}>
        <Skeleton width={150} height={24} />
        <Skeleton count={4} height={16} style={{ marginTop: "8px" }} />
      </div>

      {/* Reviews */}
      <div style={{ marginTop: "40px" }}>
        <Skeleton width={150} height={24} />
        <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
          <Skeleton width={80} height={80} style={{ borderRadius: "8px" }} />
          <div style={{ flex: 1 }}>
            <Skeleton width="60%" height={16} />
            <Skeleton width="80%" height={16} style={{ marginTop: "8px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailSkeleton;
