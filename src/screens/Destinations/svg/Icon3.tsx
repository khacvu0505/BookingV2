import React from "react";

const Icon3 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_338_28439)">
        <path
          d="M15.3567 14.0234L20.6666 8.71351M15.3567 14.0234C15.3567 14.0234 14.8757 8.45757 17.9999 5.33338C21.1241 2.20919 26.6705 2.6901 26.6705 2.6901C26.6705 2.6901 27.1241 8.20917 23.9999 11.3334C20.8757 14.4576 15.3567 14.0234 15.3567 14.0234Z"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.3142 21.3144L10.6668 16.667M15.3142 21.3144C15.3142 21.3144 15.8995 16.5626 13.3335 14.0003C10.7674 11.438 6.02159 12.0196 6.02159 12.0196C6.02159 12.0196 5.43404 16.7714 8.00013 19.3336C10.5662 21.8959 15.3142 21.3144 15.3142 21.3144Z"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.3333 2.66663V29.3333"
          stroke={isActive ? "#f52549" : "#3A3E4D"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_338_28439">
          <rect width={32} height={32} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon3;
