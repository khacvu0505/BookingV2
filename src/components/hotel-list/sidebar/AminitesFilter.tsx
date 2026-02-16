import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const AmenitiesFilter = () => {
  const [params, setSearchParams] = useQueryParams();
  const [selected, setSelected] = useState("");
  const { t } = useTranslation();

  const amenities = useMemo(() => [
    { name: t("COMMON.INSIDE_CITY_CENTER"), count: 0 },
    { name: t("COMMON.LESS_THAN_2KM"), count: 2 },
    { name: t("COMMON.FROM_2_TO_5KM"), count: 5 },
    { name: t("COMMON.FROM_5_TO_10KM"), count: 10 },
  ], [t]);

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
    <>
      {amenities.map((amenity, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="radio"
                name="position"
                value={amenity.name}
                checked={selected ? Number(selected) === amenity.count : false}
                onClick={() => handleChoosePosition(amenity.count)}
                onChange={() => {}}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{amenity.name}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AmenitiesFilter;
