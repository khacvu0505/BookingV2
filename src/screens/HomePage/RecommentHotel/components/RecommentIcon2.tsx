import React from "react";

const RecommentIcon2 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={isActive ? 56 : 42}
      height={isActive ? 56 : 42}
      viewBox="0 0 42 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 32C28.2487 32 34.125 26.1237 34.125 18.875C34.125 11.6263 28.2487 5.75 21 5.75C13.7513 5.75 7.875 11.6263 7.875 18.875C7.875 26.1237 13.7513 32 21 32Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5002 6.62517C19.0793 7.5074 20.5627 8.81267 20.4383 10.5149C20.3389 11.8752 19.1756 12.1787 18.9323 13.1623C18.6891 14.1461 20.0965 15.2192 17.7156 16.8067C16.1284 17.865 11.3496 19.8768 7.875 18.0002"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
      />
      <path
        d="M8.31259 18.4376C5.68759 20.0899 1.80971 24.581 3.50049 27.6251C5.6875 31.5626 14.0003 28.2294 23.6251 20.6251C33.2499 13.0208 36.9505 1.90572 36.9505 1.90572L32.3754 3.1251"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.7505 32.0001C22.7505 32.0001 23.1878 27.6251 26.25 25.0001C29.3122 22.3751 33.2507 22.3751 33.2507 22.3751"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth="2.625"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RecommentIcon2;
