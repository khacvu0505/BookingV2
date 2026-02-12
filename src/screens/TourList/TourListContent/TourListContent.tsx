/* eslint-disable no-undef */
import React from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import RegisterMember from "@/components/RegisterMember";

const Pagination = dynamic(() => import("@/components/Pagination"));
const TourListContentHeader = dynamic(() => import("./TourListContentHeader"));
const TourListData = dynamic(() => import("./TourListData"));
const SkeletonHeader = dynamic(() => import("@/components/Skeleton/SkeletonHeader"));
const SkeletonCard = dynamic(() => import("@/components/Skeleton/SkeletonCard"));

interface TourListContentProps {
  tours: any[];
  total: number;
  totalPages: number;
  isLoadingTours: boolean;
}

const TourListContent = ({ tours, total, totalPages, isLoadingTours }: TourListContentProps) => {
  const { isAuthenticated } = useSelector((state: any) => state.app) || {};

  if (isLoadingTours) {
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
      <TourListContentHeader total={total} />
      {!isAuthenticated && <RegisterMember />}

      <TourListData tours={tours} />
      <Pagination
        totalPage={totalPages}
        onClick={() => {
          document
            .getElementById("tour_list_header")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default TourListContent;
