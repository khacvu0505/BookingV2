import React from "react";

const RecommentIcon5 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={isActive ? 56 : 42}
      height={isActive ? 56 : 42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 7L38.5 18.375V38.5H3.5L3.5 18.375L21 7Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 38.5V20.125L10.5 24.5L10.5 38.5"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 38.5V20.125L31.5 24.5L31.5 38.5"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.875 38.5H7"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RecommentIcon5;
