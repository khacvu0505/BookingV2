import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import classNames from "classnames";

interface BookNowButtonProps {
  isOffcanvas?: boolean;
}

const BookNowButton = ({ isOffcanvas }: BookNowButtonProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAddonPage = pathname === "/addon-services-tour";

  return (
    <>
      {isAddonPage && (
        <Button
          data-bs-dismiss="offcanvas"
          onClick={() => navigate("/booking-tour")}
          className={classNames("w-100 mb-20", {
            "sticky-button-book-now": isOffcanvas,
          })}
        >
          Dat ngay
        </Button>
      )}
    </>
  );
};

export default BookNowButton;
