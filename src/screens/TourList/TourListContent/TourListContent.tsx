/* eslint-disable no-undef */
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import RegisterMember from "@/apps/RegisterMember";

const Pagination = lazy(() => import("@/apps/Pagination"));
const TourListContentHeader = lazy(() => import("./TourListContentHeader"));
const TourListData = lazy(() => import("./TourListData"));
const SkeletonHeader = lazy(() => import("@/apps/SkeletonHeader"));
const SkeletonCard = lazy(() => import("@/apps/SkeletonCard"));

const TourListContent = () => {
  const totalPage = useSelector((state) => state.tours.totalPages);
  const isLoading = useSelector((state) => state.tours.isLoadingTours);
  const { isAuthenticated } = useSelector((state) => state.app) || {};
  if (isLoading) {
    return (
      <div className="col-xl-9">
        <SkeletonHeader />
        <div className="row mt-16">
          {[...Array(9)].map((_, index) => (
            <div className="col-xl-4 mb-16" key={index}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="xxl:w-1/1 w-3/4 sm:px-12">
      <TourListContentHeader />
      {!isAuthenticated && <RegisterMember />}

      <TourListData />
      <Pagination
        totalPage={totalPage}
        onClick={() => {
          document
            .getElementById("tour_list_header")
            .scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default TourListContent;
