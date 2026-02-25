import React from "react";

interface TagComponentProps {
  type: string;
  text: string;
}

const TagComponent = ({ type, text }: TagComponentProps) => {
  const handleRenderTag = () => {
    // Xử lý logic với switch-case
    switch (type) {
      case "primary":
        return (
          <div className="bg-primary-30 text-primary-500 rounded-4 px-2 w-fit text-16 lg:text-15 md:text-14">
            {text}
          </div>
        );
      case "info":
        return (
          <div className="bg-info-3 text-secondary-500 rounded-4 px-2 w-fit text-16 lg:text-15 md:text-14">
            {text}
          </div>
        );

      default:
        return null;
    }
  };

  return handleRenderTag();
};

export default TagComponent;
