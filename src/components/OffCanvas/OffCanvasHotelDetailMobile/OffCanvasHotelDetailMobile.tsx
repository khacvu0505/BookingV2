import React from "react";
import OffCanvasComponent from "../OffCanvasComponent";

interface OffCanvasHotelDetailMobileProps {
  header: React.ReactNode;
  body: React.ReactNode;
  hotel: any;
}

const OffCanvasHotelDetailMobile = ({ header, body, hotel }: OffCanvasHotelDetailMobileProps) => {
  return (
    <OffCanvasComponent
      id="offcanvas-hotel-detail"
      header={header}
      classNameBody="px-0"
    >
      <p className="text-15 fw-500 text-neutral-800 py-16">
        Thông tin thêm khách sạn {hotel?.hotelName}
      </p>
      {body}
    </OffCanvasComponent>
  );
};

export default OffCanvasHotelDetailMobile;
