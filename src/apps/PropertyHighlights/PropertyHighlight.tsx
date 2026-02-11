import React, { useMemo } from "react";
import Hightlights from "./Highlights";
import MapComponent from "@/apps/MapComponent";
import { useTranslation } from "react-i18next";

interface PropertyHighlightsProps {
  hotel: any;
  type?: string;
}

const PropertyHighlights = ({ hotel, type = "hotel" }: PropertyHighlightsProps) => {
  const { t } = useTranslation();
  const renderTitle = useMemo(
    () => (
      <>
        <h3 className="text-40 xl:text-32 lg:text-24 fw-700 text-neutral-800">
          {type === "hotel"
            ? t("HOTEL.HOTEL_PROPERTIES_HIGHLIGHT")
            : t("HOTEL.TOUR_PROPERTIES_HIGHLIGHT")}
        </h3>
        <p className="text-14 lg:text-13 fw-400 text-neutral-800">
          {type === "hotel"
            ? t("HOTEL.HOTEL_DETAIL_DESC")
            : t("HOTEL.TOUR_DETAIL_DESC")}
        </p>
      </>
    ),
    []
  );
  return (
    <div className="row align-items-center">
      <div className="col-12 d-none lg:d-block text-center py-20  lg:py-10 md:py-0">
        {renderTitle}
      </div>
      <div className="col-md-6 pt-20 lg:pt-10">
        <div className="d-block lg:d-none">{renderTitle}</div>
        <Hightlights propertyHighlights={hotel?.propertyHighlights} />
      </div>
      <div className="col-md-6 lg:mt-10 ">
        <MapComponent mapIFrame={hotel?.mapIFrame} hotel={hotel} />
      </div>
    </div>
  );
};

export default PropertyHighlights;
