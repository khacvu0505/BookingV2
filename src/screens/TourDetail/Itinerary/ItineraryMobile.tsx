import { useState } from "react";
import { useTranslation } from "react-i18next";
import AccordionContent from "./ItineraryContent";
// import MapPropertyFinder from "./MapPropertyFinder";

const ItineraryMobile = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className=" y-gap-30">
      <div className="tabs -underline-2 js-tabs mb-30">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls ">
          {data?.map((_, index) => (
            <div className="col-auto " key={`tab-itinerary-${index}`}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {t("COMMON.DAY_X", { num: index + 1 })}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="border-test" />

        <div className="accordion -map row y-gap-20" id="itineraryContent">
          <AccordionContent data={data && data[activeTab]} />
        </div>
      </div>
      {/* End col-lg-4 */}

      {/* <div className="col-lg-8">
        <div className="map rounded-4 overflow-hidden">
          <MapPropertyFinder />
        </div>
      </div> */}
      {/* End col-lg-8 */}
    </div>
  );
};

export default ItineraryMobile;
