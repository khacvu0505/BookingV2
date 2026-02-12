import { groupBy } from "@/utils/utils";
import { useEffect, useState } from "react";

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
    <div>
      <div className="row">
        {amenitiesByGroup &&
          Object.keys(amenitiesByGroup)?.map((item: string) => (
            <div className="col-xl-4 mb-30" key={item}>
              <div className="row y-gap-30">
                <div className="col-12">
                  <div>
                    <div className="d-flex items-center text-16 lg:text-15 fw-500">
                      <i
                        className={`${amenitiesByGroup[item][0]?.icon} text-20 mr-10 text-primary-500`}
                      />
                      {item}
                    </div>
                    <ul className="text-15 lg:text-14 pt-10">
                      {amenitiesByGroup[item].map((amen: any, index: number) => (
                        <li className="d-flex items-center" key={index}>
                          <i className={`${amen.icon} mr-5`} />
                          {amen.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertyHighlights;
