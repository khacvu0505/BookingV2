import groupBy from "lodash/groupBy";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Surrounding = ({ neighborhoods }) => {
  const { t } = useTranslation();
  const [neighborhoodsByGroup, setNeighborhoodsByGroup] = useState<any>([]);

  useEffect(() => {
    setNeighborhoodsByGroup(groupBy(neighborhoods, "group"));
  }, [neighborhoods]);

  return (
    <>
      {Object.keys(neighborhoodsByGroup).map((item) => (
        <div className="col-lg-4 col-md-6" key={item}>
          <div>
            <div className="d-flex items-center mb-15 lg:mb-10">
              <i className="icon-location text-20 text-primary-500 xl:text-18 lg:text-16 mr-10"></i>
              <div className="text-16 xl:text-15 lg:text-14 fw-500">{item}</div>
            </div>
            {neighborhoodsByGroup[item].slice(0, 5).map((neigh, index) => (
              <div className="row y-gap-25  x-gap-0" key={index}>
                <div className="col-12 border-top-light">
                  <div className="row items-center justify-between py-8">
                    <div className="col-auto">
                      <div className="text-14 lg:text-13">{neigh.text}</div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 lg:text-13 text-right">
                        {neigh.value1} km - {neigh.value} {t("COMMON.MINUTES")}
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

export default Surrounding;
