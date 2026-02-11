import React from "react";

const RecommentIcon1 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={isActive ? 56 : 42}
      height={isActive ? 56 : 42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_425_25141)">
        <path
          d="M31.325 11.375H28L18.375 28L8.575 11.375H5.25"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth="2.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.532 22.3965C27.4327 25.1532 33.6402 23.4151 36.3969 18.5144C39.1535 13.6137 37.4154 7.40619 32.5147 4.64955C27.614 1.8929 21.4065 3.631 18.6499 8.5317"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth="2.625"
          strokeLinecap="round"
        />
        <path
          d="M22.75 38.5H14"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth="2.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.375 38.5L18.375 28"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth="2.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 14C10.5 14 12.25 12.25 14.875 12.25C17.5 12.25 19.25 14.875 21.875 14.875C24.5 14.875 26.25 14 26.25 14"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth="2.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_425_25141">
          <rect
            width={isActive ? 56 : 42}
            height={isActive ? 56 : 42}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RecommentIcon1;
