import { groupBy } from "@/utils/utils";
import { useEffect, useState } from "react";
import "./PropertyHighlights.style.scss";

interface PropertyHighlightsProps {
  amenities: any[];
}

const PropertyHighlights = ({ amenities }: PropertyHighlightsProps) => {
  const [amenitiesByGroup, setAmenitiesByGroup] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (amenities) {
      setAmenitiesByGroup(groupBy(amenities, "group"));
    }
  }, [amenities]);

  if (!amenities) {
    return;
  }
  return (
    <div className="property-highlights-masonry">
      {amenitiesByGroup &&
        Object.keys(amenitiesByGroup)?.map((item: string) => (
          <div className="property-highlights-masonry__item" key={item}>
            <div className="d-flex items-center text-18 lg:text-16 fw-500">
              {/* <i
                className={`${amenitiesByGroup[item][0]?.icon} text-20 mr-10 text-primary-500`}
              /> */}
              {item}
            </div>
            <ul className="text-15 lg:text-14">
              {amenitiesByGroup[item].map((amen: any, index: number) => (
                <li className="d-flex items-end ml-10" key={index}>
                  <i className={`${amen.icon} mr-5`} />
                  {amen.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default PropertyHighlights;
