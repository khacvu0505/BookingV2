import React from "react";

const Icon2 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.6666 18.9282V23.6044C24.6666 26.032 22.7256 28 20.3312 28C17.9369 28 15.9959 26.032 15.9959 23.6044L16.004 8.76192C16.004 6.13198 14.063 4 11.6686 4C9.27426 4 7.33325 6.13198 7.33325 8.76191V18.9282"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.6667 20.6666L24.6667 16.6666L20.6667 20.6666"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.6667 7.15156C28.6667 10.1213 24.6667 12.6667 24.6667 12.6667C24.6667 12.6667 20.6667 10.1213 20.6667 7.15156C20.6667 6.13891 21.0882 5.16774 21.8383 4.45169C22.5885 3.73565 23.6059 3.33337 24.6667 3.33337C25.7276 3.33337 26.745 3.73565 27.4952 4.45169C28.2453 5.16774 28.6667 6.13891 28.6667 7.15156Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 23.1516C11.3333 26.1213 7.33325 28.6667 7.33325 28.6667C7.33325 28.6667 3.33325 26.1213 3.33325 23.1516C3.33325 22.1389 3.75468 21.1677 4.50482 20.4517C5.25497 19.7356 6.27239 19.3334 7.33325 19.3334C8.39412 19.3334 9.41153 19.7356 10.1617 20.4517C10.9118 21.1677 11.3333 22.1389 11.3333 23.1516Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="24.6666"
        cy="7.33333"
        r="1.33333"
        fill={isActive ? "#f52549" : "#3A3E4D"}
      />
      <circle
        cx="7.33333"
        cy="23.3333"
        r="1.33333"
        fill={isActive ? "#f52549" : "#3A3E4D"}
      />
    </svg>
  );
};

export default Icon2;
