import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ReasonItem = ({ item }) => {
  return (
    <div
      className="mb-30 xl:mb-24"
      data-aos="fade"
      data-aos-delay={item.delayAnim}
    >
      <div className="d-flex justify-center gap-4">
        <LazyLoadImage
          src={item.icon}
          alt="reason-icon"
          className="js-lazy h-72"
          width={72}
        />
        <div className=" mx-auto">
          <h4 className="text-18 xl:text-16 fw-600 text-primary-500">
            {item.title}
          </h4>
          <p className="text-16 xl:text-14 fw-400 text-neutral-800">
            {item.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReasonItem;
