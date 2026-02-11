import React from "react";

const Icon5 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={isActive ? 32 : 32}
      height={isActive ? 32 : 32}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 7L21 3.5L24.5 7V38.5H17.5V7Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 17.5L17.5 10.5V38.5H10.5V17.5Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 30.625L10.5 24.5V38.5H3.5V30.625Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 10.5L31.5 17.5V38.5H24.5V10.5Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 24.5L38.5 30.1875V38.5H31.5V24.5Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon5;
