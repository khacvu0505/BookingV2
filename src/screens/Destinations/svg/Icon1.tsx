import React from "react";

const Icon1 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={33}
      height={32}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83325 8C5.83325 6.89543 6.72868 6 7.83325 6H25.1666C26.2712 6 27.1666 6.89543 27.1666 8V15.3333H5.83325V8Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 23.3334V26"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.5 23.3334V26"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8333 12H9.83325C8.72868 12 7.83325 12.8954 7.83325 14V15.3333H15.8333V14C15.8333 12.8954 14.9378 12 13.8333 12Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.1667 12H19.1667C18.0622 12 17.1667 12.8954 17.1667 14V15.3333H25.1667V14C25.1667 12.8954 24.2713 12 23.1667 12Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.16675 17.3334C3.16675 16.2288 4.06218 15.3334 5.16675 15.3334H27.8334C28.938 15.3334 29.8334 16.2288 29.8334 17.3334V23.3334H3.16675V17.3334Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon1;
