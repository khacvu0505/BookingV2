import React from "react";

const Icon7 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.33325"
        y={28}
        width="17.3333"
        height="25.3333"
        rx="1.33333"
        transform="rotate(-90 3.33325 28)"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinejoin="bevel"
      />
      <path
        d="M6.00001 10.6667L21.3333 3.3334L24.6667 10.6667"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.66658" cy="15.3333" r="1.33333" fill="#3A3E4D" />
      <circle cx="8.66658" cy="19.3333" r="1.33333" fill="#3A3E4D" />
      <circle cx="8.66658" cy="23.3333" r="1.33333" fill="#3A3E4D" />
      <path
        d="M14 23.3334H16.6667L24 15.3334"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 19.3334H20"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon7;
