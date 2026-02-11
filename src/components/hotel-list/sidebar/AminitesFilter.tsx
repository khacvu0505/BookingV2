import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useState } from "react";

const amenities = [
  { name: "Bên trong trung tâm thành phố", count: 0 },
  { name: "Cách trung tâm < 2 km", count: 2 },
  { name: "Cách trung tâm 2-5 km", count: 5 },
  { name: "Cách trung tâm 5-10 km", count: 10 },
];
const AmenitiesFilter = () => {
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
