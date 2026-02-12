import React from "react";

interface TagProps {
  children: React.ReactNode;
  type?: string;
  className?: string;
  [key: string]: any;
}

const Tag = ({ children, type = "secondary", className, ...props }: TagProps) => {
  return (
    <>
      {type === "secondary" && (
        <div
          className={` border-neutral-500 text-14 text-neutral-500 rounded-4  px-1 w-fit ${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Tag;
