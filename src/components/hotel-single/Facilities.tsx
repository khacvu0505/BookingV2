import { groupBy } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

import AmenitiesModal from "./AmenitiesModal";

const Facilities = ({ amenities }) => {
  const refAmenitiedModal = useRef(null);
  const [amenitiesByGroup, setAmenitiesByGroup] = useState([]);

  useEffect(() => {
    setAmenitiesByGroup(groupBy(amenities, "group") as any);
  }, [amenities]);
  if (!amenitiesByGroup) {
    return;
  }

  return (
    <>
      {Object.keys(amenitiesByGroup)?.map((item) => (
        <div className="col-xl-3" key={item}>
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
                {amenitiesByGroup[item]?.length > 5 && (
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      refAmenitiedModal.current?.setIsVisible(true);
                    }}
                  >
                    ...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <AmenitiesModal
        ref={refAmenitiedModal}
        data={{
          amenities: amenities,
          roomName: "",
        }}
      />
    </>
  );
};

export default Facilities;
