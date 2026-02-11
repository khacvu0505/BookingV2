import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Breadcrumb.style.scss";
import useWindowSize from "@/utils/useWindowSize";

interface BreadcrumbItem {
  title: string;
  link?: string;
  isGoBack?: boolean;
}

interface BreadcrumbProps {
  data?: BreadcrumbItem[];
}

const Breadcrumb = ({ data = [] }: BreadcrumbProps) => {
  const isMobile = useWindowSize().width < 768;
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAll(true);
  };

  return (
    <div
      className={`d-flex items-center flex-wrap breadcrum_list ${
        showAll ? "show-all" : ""
      }`}
    >
      {data.length > 0 && (
        <>
          {data.map((item: BreadcrumbItem, index: number) => {
            if (
              !isMobile ||
              showAll ||
              index === 0 ||
              index === data.length - 1
            ) {
              return (
                <div
                  key={index}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    item.isGoBack && navigate(-1);
                  }}
                >
                  {item?.link ? (
                    <Link to={item.link} className="d-flex items-center">
                      <span className="breadcrum_list_item-title">
                        {item.title}
                      </span>
                      {data.length - 1 !== index && (
                        <i className="ri-arrow-right-s-line text-22 xl:text-18"></i>
                      )}
                    </Link>
                  ) : (
                    <div className="d-flex items-center ">
                      <span className="breadcrum_list_item-title">
                        {item.title}
                      </span>
                      {data.length - 1 !== index && (
                        <i className="ri-arrow-right-s-line text-22 xl:text-18"></i>
                      )}
                    </div>
                  )}
                </div>
              );
            } else if (index === 1 && !showAll && isMobile) {
              return (
                <div
                  key="ellipsis"
                  onClick={handleToggle}
                  className="breadcrumb-ellipsis"
                >
                  ...{" "}
                  <i className="ri-arrow-right-s-line text-22 xl:text-18"></i>
                </div>
              );
            }
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
