import React from "react";

const RecommentIcon3 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={isActive ? 56 : 42}
      height={isActive ? 56 : 42}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3333 4.66675L16.3333 51.3334"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16.9167 7C16.9167 7 32.6667 15.1667 37.3334 25.6667C42 36.1667 38.5 51.3333 38.5 51.3333"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="3.5"
      />
      <path
        d="M4.66669 51.3333H51.3334"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 17.5H37.3334"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16.3333 25.6667H25.6666"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16.3333 33.8333H30.3333"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16.3333 42H31.5"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RecommentIcon3;
