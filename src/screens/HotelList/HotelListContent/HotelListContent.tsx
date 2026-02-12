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

interface HotelListContentProps {
  hotels: any[];
  total: number;
  totalPages: number;
  isLoadingHotels: boolean;
}

const HotelListContent = ({ hotels, total, totalPages, isLoadingHotels }: HotelListContentProps) => {
  const { isAuthenticated } = useSelector((state: any) => state.app) || {};

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
      <HotelListContentHeader total={total} />

      {!isAuthenticated && <RegisterMember />}

      <HotelListData hotels={hotels} />
      <Pagination
        totalPage={totalPages}
        onClick={() => {
          document
            .getElementById("hotel_list_header")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default HotelListContent;
