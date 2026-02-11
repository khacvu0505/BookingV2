import React from "react";

const Icon4 = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.9999 17.3333V9.33333C23.9999 8.59695 23.403 8 22.6666 8H6.66659C5.93021 8 5.33325 8.59695 5.33325 9.33333V25.3333C5.33325 26.0697 5.93021 26.6667 6.66659 26.6667H17.9999"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6667 8V26.6667"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6667 8V19.3333"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6667 7.99996V3.99996C18.6667 3.26358 18.0698 2.66663 17.3334 2.66663H12.0001C11.2637 2.66663 10.6667 3.26358 10.6667 3.99996V7.99996"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3333 29.3334C26.647 29.3334 29.3333 26.6471 29.3333 23.3334C29.3333 20.0197 26.647 17.3334 23.3333 17.3334C20.0195 17.3334 17.3333 20.0197 17.3333 23.3334C17.3333 26.6471 20.0195 29.3334 23.3333 29.3334Z"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
      />
      <path
        d="M22.6667 21.3334V24H25.3334"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66675 26.6666V29.3333"
        stroke={isActive ? "#f52549" : "#3A3E4D"}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Icon4;
