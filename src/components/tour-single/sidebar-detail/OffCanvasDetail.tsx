import Reviews from "./Reviews";
import Policies from "./Policies";
import PropertyHighlights from "./PropertyHighlights";
import ImageLibrary from "./ImageLibrary";
import { useTabTitleHeader } from "@/utils/constants";
import { forwardRef, useImperativeHandle, useState } from "react";
import classNames from "classnames";
import useWindowSize from "@/utils/useWindowSize";
import { useFetchData } from "@/hooks/useFetchData";
import { getTourPoliciesBySlug } from "@/api/tours.api";
import { useParams } from "react-router-dom";

const OffCanvasDetail = (_, ref) => {
  const tabTitleHeader = useTabTitleHeader();

  const { slug } = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useWindowSize().width < 768;
  const [policiesTour] = useFetchData(getTourPoliciesBySlug, { Slug: slug });

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useImperativeHandle(ref, () => ({
    setActiveTab,
  }));
  return (
    <div>
      <div
        className={classNames("offcanvas offcanvas-end ", {
          "w-100vw": isMobile,
          "offcanvas-horizontal-width": !isMobile,
        })}
        tabIndex={-1}
        id="offcanvasDetail"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <div className="tabs -underline-2 js-tabs">
            <div className="tabs__controls row x-gap-20 y-gap-10 lg:x-gap-20 js-tabs-controls mt-10 ">
              {tabTitleHeader?.map((item, index) => (
                <div className="col-auto" key={index}>
                  <button
                    className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                      activeTab === index ? "is-tab-el-active" : ""
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
            {/* End tabs */}
          </div>

          <button
            type="button"
            className="btn-close text-reset z-1"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="tabs__content  js-tabs-content">
            <div className="tabs__pane -tab-item-1 is-tab-el-active px-0 px-lg-20">
              <div>
                {activeTab === 0 && <Reviews />}
                {activeTab === 1 && (
                  <Policies policies={policiesTour?.policies} />
                )}
                {activeTab === 2 && (
                  <PropertyHighlights amenities={policiesTour?.amenities} />
                )}
                {activeTab === 3 && <ImageLibrary />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(OffCanvasDetail);
