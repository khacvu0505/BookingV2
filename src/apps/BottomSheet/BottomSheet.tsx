import React, { useMemo } from "react";
import "./BottomSheet.styles.scss";
import BookNowButton from "../SidebarRight/BookNowButton";
import TotalPrice from "../SidebarRight/TotalPrice";
import { useLocation } from "react-router-dom";
import { info_booking } from "@/utils/constants";
import useStorageListener from "@/hooks/useStorageListener";
import OffCanvasSidebarRight from "./OffCanvasSidebarRight";
import type { BookingInfo } from "@/types";

const allowPaths = ["/booking", "/addon-services"];

const BottomSheet = () => {
  const { pathname } = useLocation();
  // Check if the pathname matches `hotels:slug`
  const isActive = /^\/hotels\/[^/]+$/.test(pathname);
  const infoBookingFromSession = useStorageListener<BookingInfo>(info_booking);

  const isHasRoom = useMemo(
    () =>
      Boolean(
        infoBookingFromSession?.services?.length > 0 &&
          infoBookingFromSession?.services[0]?.roomID
      ),
    [infoBookingFromSession]
  );

  const isShow = useMemo(() => {
    return (isActive || allowPaths.includes(pathname)) && isHasRoom
      ? "d-none xl:d-block"
      : "d-none";
  }, [isActive, isHasRoom, pathname]);

  const attributesActive = {
    "data-bs-toggle": "offcanvas",
    "aria-controls": "offcanvas-sibebar-right-cart",
    "data-bs-target": "#offcanvas-sibebar-right-cart",
  };

  return (
    <>
      <div className={`bottomSheetContainer ${isShow} `}>
        <div className="w-100 text-center" {...attributesActive}>
          <i className="ri-arrow-up-s-line text-20 cursor-pointer"></i>
        </div>

        <TotalPrice />
        <BookNowButton />
      </div>
      <OffCanvasSidebarRight />
    </>
  );
};

export default BottomSheet;
