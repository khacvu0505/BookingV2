import React from "react";
import OffCanvasComponent from "../OffCanvasComponent";
import { useTranslation } from "react-i18next";

interface OffCanvasHotelDetailMobileProps {
  header: React.ReactNode;
  body: React.ReactNode;
  hotel: any;
}

const OffCanvasHotelDetailMobile = ({ header, body, hotel }: OffCanvasHotelDetailMobileProps) => {
  const { t } = useTranslation();
  return (
    <OffCanvasComponent
      id="offcanvas-hotel-detail"
      header={header}
      classNameBody="px-0"
    >
      <p className="text-15 fw-500 text-neutral-800 py-16">
        {t("COMMON.MORE_INFO_HOTEL", { hotelName: hotel?.hotelName })}
      </p>
      {body}
    </OffCanvasComponent>
  );
};

export default OffCanvasHotelDetailMobile;
