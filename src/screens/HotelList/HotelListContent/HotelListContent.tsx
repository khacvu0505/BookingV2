/* eslint-disable no-undef */
import React, { lazy } from "react";
import "./HotelListContent.style.scss";
import { useSelector } from "react-redux";
import RegisterMember from "@/apps/RegisterMember";
const HotelListContentHeader = lazy(() => import("./HotelListContentHeader"));
const HotelListData = lazy(() => import("./HotelListData"));
const Pagination = lazy(() => import("@/apps/Pagination"));
const SkeletonList = lazy(() => import("@/apps/SkeletonList"));
const SkeletonHeader = lazy(() => import("@/apps/SkeletonHeader"));

const HotelListContent = () => {
  const totalPage = useSelector((state) => state.hotels.totalPages) || 1;
  const isLoadingHotels =
    useSelector((state) => state.hotels.isLoadingHotels) || false;
  const { isAuthenticated } = useSelector((state) => state.app) || {};

  if (isLoadingHotels) {
    return (
      <div className="w-3/4 xxl:w-1/1 hotel_list_content">
        <SkeletonHeader />
        <SkeletonList count={7} />
      </div>
    );
  }

  return (
    <div className="xxl:w-1/1 w-3/4 hotel_list_content sm:px-12">
      <HotelListContentHeader />

      {!isAuthenticated && <RegisterMember />}

      <HotelListData />
      <Pagination
        totalPage={totalPage}
        onClick={() => {
          document
            .getElementById("hotel_list_header")
            .scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default HotelListContent;
