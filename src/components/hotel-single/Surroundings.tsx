import groupBy from "lodash/groupBy";
import { useEffect, useState } from "react";

const Surroundings = ({ neighborhoods }) => {
  const [neighborhoodsByGroup, setNeighborhoodsByGroup] = useState([]);

  useEffect(() => {
    setNeighborhoodsByGroup(groupBy(neighborhoods, "group") as any);
  }, [neighborhoods]);

  return (
    <>
      {Object.keys(neighborhoodsByGroup).map((item) => (
        <div className="col-lg-4 col-md-6 " key={item}>
          <div>
            <div className="d-flex items-center mb-20">
              <i className="icon-location text-20 mr-10"></i>
              <div className="text-16 fw-500">{item}</div>
            </div>
            {neighborhoodsByGroup[item].slice(0, 5).map((neigh, index) => (
              <div className="row y-gap-20 x-gap-0 pt-10" key={index}>
                <div className="col-12 border-top-light">
                  <div className="row items-center justify-between">
                    <div className="col-auto">
                      <div className="text-15">{neigh.text}</div>
                    </div>
                    <div className="col-auto">
                      <div className="text-15 text-right">
                        {neigh.value1} km - {neigh.value} phút
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Surroundings;
