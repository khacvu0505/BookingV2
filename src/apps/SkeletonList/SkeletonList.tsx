import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./SkeletonList.style.scss";
import SkeletonItem from "../SkeletonItem";

interface SkeletonListProps {
  count: number;
}

const SkeletonList = ({ count }: SkeletonListProps) => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#cfcbc4">
      <section className="skeleton_list">
        {[...Array(count)].map((_, idx) => (
          <SkeletonItem key={idx} />
        ))}
      </section>
    </SkeletonTheme>
  );
};

export default SkeletonList;
