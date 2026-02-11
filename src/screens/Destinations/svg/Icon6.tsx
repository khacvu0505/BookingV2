import React from "react";

const Icon6 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={33}
      height={32}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1667 20H7.83341L13.1667 14"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5001 20C26.5001 11.3387 19.8292 2.66663 13.1667 2.66663V20H26.5001Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.2675 27.7176L28.5 24L4.5 24L5.83333 28L21.2429 28C21.6037 28 21.9577 27.9024 22.2675 27.7176Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1667 20V24"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8333 14L27.8333 14"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Icon6;
