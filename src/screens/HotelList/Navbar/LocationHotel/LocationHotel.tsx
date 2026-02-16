import React, { useEffect, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import classNames from "classnames";
import "./LocationHotel.style.scss";
import Checkbox from "@/components/Form/Checkbox";
import { useTranslation } from "react-i18next";

const LocationHotel = () => {
  const { t } = useTranslation();
  const amenities = [
    { name: t("COMMON.INSIDE_CITY_CENTER"), count: 0 },
    { name: t("COMMON.LESS_THAN_2KM"), count: 2 },
    { name: t("COMMON.FROM_2_TO_5KM"), count: 5 },
    { name: t("COMMON.FROM_5_TO_10KM"), count: 10 },
  ];
  const [params, setSearchParams] = useQueryParams();
  const [selected, setSelected] = useState("");

  const { position = "" } = params;

  const handleChoosePosition = (value) => {
    if (selected !== "" && Number(selected) === value) {
      setSearchParams(
        cleanedObject({
          ...params,
          position: "",
        })
      );
      setSelected("");
      return;
    }

    setSearchParams({
      ...params,
      position: value,
    });

    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setSelected(position || "");
  }, [position]);
  return (
    <div className="location_hotel mb-32 lg:mb-20 md:mb-16 mt-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("HOTELS.NAVIGATION/POSITION")}
      </p>
      <div className="location_hotel_content">
        {amenities.map((amenity, index) => (
          <div
            className={classNames(
              "row y-gap-10 items-center justify-between location_hotel_content_item mb-16 lg:mb-10 md:mb-6",
              {
                "location_hotel_content_last-item":
                  index === amenities.length - 1,
              }
            )}
            key={index}
          >
            <div className="col-auto">
              <div className="form-checkbox d-flex items-center">
                <Checkbox
                  name="position"
                  value={amenity.name}
                  checked={
                    selected ? Number(selected) === amenity.count : false
                  }
                  onClick={() => handleChoosePosition(amenity.count)}
                  onChange={() => {}}
                />
                <div className="text-16 lg:text-15 md:text-14 ml-10">
                  {amenity.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationHotel;
