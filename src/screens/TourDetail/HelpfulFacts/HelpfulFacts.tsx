import { useTranslation } from "react-i18next";
import "../TourDetail.styles.scss";

const HelpfulFacts = ({ tour }) => {
  const { t } = useTranslation();
  if (!tour) {
    return;
  }
  return (
    <div className="helpfulFacts mt-20">
      <div className="row px-16 py-16">
        <div className="col-12 col-md-6 ">
          <div className="text-15 lg:text-14 mb-10">
            <i className="icon-clock text-primary-500 text-14 mr-10" />
            {t("COMMON.STARTING_FROM")}:{" "}
            <span className="fw-600 text-14 lg:text-13">{tour?.checkIn}</span>
          </div>

          <div className="text-15 lg:text-14 mb-10">
            <i className="icon-clock text-primary-500 text-14 mr-10" />
            {t("COMMON.END_AFTER")}:{" "}
            <span className="fw-600 text-14 lg:text-13">{tour?.checkOut}</span>
          </div>
        </div>

        <div className="col-12 col-md-6 ">
          <div className="text-15 lg:text-14 mb-10">
            <i className="icon-calendar-2 text-primary-500 text-14 mr-10" />
            {t("COMMON.TIME")}:{" "}
            <span className="fw-600 text-14 lg:text-13">{tour?.duration}</span>
          </div>

          <div className="text-15 lg:text-14 mb-10">
            <i className="icon-calendar-2 text-primary-500 text-14 mr-10" />
            {t("COMMON.CATEGORY")}:{" "}
            <span className="fw-600 text-14 lg:text-13">
              {tour?.categoryName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpfulFacts;
