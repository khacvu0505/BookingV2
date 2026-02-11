import { groupBy } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PropertyHighlights = ({ amenities }) => {
  const [amenitiesByGroup, setAmenitiesByGroup] = useState([]);

  useEffect(() => {
    if (amenities) {
      setAmenitiesByGroup(groupBy(amenities, "group") as any);
    }
  }, [amenities]);
  if (!amenities) {
    return;
  }
  return (
    <div>
      <div className="row">
        {Object.keys(amenitiesByGroup)?.map((item) => (
          <div className="col-xl-4 mb-30" key={item}>
            <div className="row y-gap-30">
              <div className="col-12">
                <div>
                  <div className="d-flex items-center text-16 fw-500">
                    <i className={`icon-city-2 text-20 mr-10`} />
                    {item}
                  </div>
                  <ul className="text-15 pt-10">
                    {amenitiesByGroup[item].slice(0, 5).map((amen, index) => (
                      <li className="d-flex items-center" key={index}>
                        <i className="icon-check text-10 mr-20" />
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
