import React, { useMemo } from "react";
import "./BottomSheet.styles.scss";
import TotalPrice from "../SidebarRightTour/TotalPrice";
import { useLocation } from "react-router-dom";
import OffCanvasSidebarRightTour from "./OffCanvasSidebarRightTour";
import BookNowButton from "../SidebarRightTour/BookNowButton";

const allowPaths = ["/booking-tour", "/addon-services-tour"];

const BottomSheetTour = () => {
  const { pathname } = useLocation();

  const isShow = useMemo(() => {
    return allowPaths.includes(pathname) ? "d-none xl:d-block" : "d-none";
  }, [pathname]);

  const attributesActive = {
    "data-bs-toggle": "offcanvas",
    "aria-controls": "offcanvas-sibebar-right-tour-cart",
    "data-bs-target": "#offcanvas-sibebar-right-tour-cart",
  };

  return (
    <>
      <div className={`bottomSheetContainer ${isShow} `}>
        <div className="w-100 text-center" {...attributesActive}>
          <i className="ri-arrow-up-s-line text-20 cursor-pointer"></i>
        </div>
        <TotalPrice />
        <BookNowButton isOffcanvas={true} />
      </div>
      <OffCanvasSidebarRightTour />
    </>
  );
};

export default BottomSheetTour;
