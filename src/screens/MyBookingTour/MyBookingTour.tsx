import React, { lazy, useState } from "react";
import { useTranslation } from "react-i18next";

const BookingHistoryTour = lazy(() => import("./BookingHistoryTour"));

const MybookingTour = () => {
  const { t } = useTranslation();
  const tabItems = [
    {
      id: 0,
      title: t("COMMON.READY"),
      value: "Ready",
    },
    {
      id: 1,
      title: t("COMMON.COMPLETED"),
      value: "Completed",
    },
    {
      id: 2,
      title: t("COMMON.CANCELLED"),
      value: "Cancel",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabItems[1]?.id);
  const [status, setStatus] = useState("Ready");

  const handleTabClick = (item) => {
    setActiveTab(item?.id);
    setStatus(item?.value);
  };

  const checkIsFinishTab = activeTab === tabItems.length - 2;

  return (
    <div>
      <div className="pb-80 sm:px-10 md:pb-0">
        <div className="row y-gap-20 justify-between items-end lg:pb-40 md:pb-20">
          <div className="col-12 px-0 mb-md-30">
            <h1 className="text-24 lg:text-22 md:text-20 text-neutral-800 fw-600 mb-8">
              {t("PROFILE.MY_TOUR")}
            </h1>
            <p className="text-14 fw-400 text-neutral-500 mb-24">
              {t("PROFILE.MY_TOUR_DESC")}
            </p>
          </div>
        </div>
        <div className="tabs -underline-2 js-tabs mb-10 border-bottom-light">
          <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
            {tabItems.map((item, index) => (
              <div className="col-auto " key={item.id}>
                <button
                  className={`tabs__button text-16 lg:text-15 md:text-14 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button  ${
                    activeTab === index ? "is-tab-el-active" : ""
                  }`}
                  onClick={() => handleTabClick(item)}
                >
                  {item.title}
                </button>
              </div>
            ))}
          </div>
          {/* End tabs */}
        </div>
        <div>
          <BookingHistoryTour isFinishTab={checkIsFinishTab} status={status} />
        </div>
      </div>
    </div>
  );
};

export default MybookingTour;
