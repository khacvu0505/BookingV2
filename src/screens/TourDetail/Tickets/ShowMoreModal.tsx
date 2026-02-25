import React, { forwardRef, useImperativeHandle, useState } from "react";
import { sanitizeHtml } from "@/utils/sanitize";
import { useTranslation } from "react-i18next";

const ShowMoreModal = (props, ref) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const { tourName, description } = props;

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
  }));

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`currencyMenu js-currencyMenu pt-50 ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size1 h-600 px-20">
        <div className="row mx-20 mt-20 pb-10 border-bottom-light justify-content-between">
          <div className=" col-auto text-20 fw-500">
            {t("TOUR.TOUR_DETAIL_TITLE", { name: tourName })}
          </div>
          <div className="col-auto">
            <button className="pointer" onClick={handleCloseModal}>
              <i className="icon-close" />
            </button>
          </div>
        </div>

        {/* content's popup */}

        <div className="h-500 overflow-y-scroll mt-5">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(description?.replaceAll("\n", "<br/>") || ""),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ShowMoreModal);
