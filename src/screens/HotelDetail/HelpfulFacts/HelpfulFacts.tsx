import { useTranslation } from "react-i18next";
import "../HotelDetail.styles.scss";
const HelpfulFacts = ({ hotel }) => {
  const { t } = useTranslation();
  if (!hotel) {
    return;
  }
  return (
    <div className="helpfulFacts mt-20">
      <div className=" row  px-16 py-16">
        <div className="col-12 col-md-6 col-xl-3 ">
          <div className="text-15  lg:text-14 mb-10">
            <i className="icon-clock text-primary-500 text-14 mr-10" />
            {t("HOTEL.CHECK_IN_FROM")}:{" "}
            <span className="fw-600 text-14 lg:text-13">{hotel?.checkIn}</span>
          </div>

          <div className=" text-15 lg:text-14 mb-10">
            <i className="icon-clock text-primary-500 text-14 mr-10" />
            {t("HOTEL.CHECK_OUT_FROM")}:{" "}
            <span className="fw-600 text-14 lg:text-13">{hotel?.checkOut}</span>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3 ">
          <div className=" text-15 lg:text-14 mb-10">
            <i className=" icon-calendar-2 text-primary-500 text-14 mr-10" />
            {t("HOTEL.BUILD_YEAR")}:{" "}
            <span className="fw-600 text-14 lg:text-13">
              {hotel?.builtYear}
            </span>
          </div>

          <div className=" text-15 lg:text-14 mb-10">
            <i className=" icon-calendar-2 text-primary-500 text-14 mr-10 " />
            {t("HOTEL.UPGRADE_YEAR")}:{" "}
            <span className="fw-600 text-14 lg:text-13">
              {hotel?.upgradedYear}
            </span>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3 ">
          <div className="col-12">
            <div className=" text-15 lg:text-14 mb-10">
              <i className="icon-bed text-primary-500 text-14 mr-10"></i>{" "}
              {t("HOTEL.FLOOR_NUMBER")}:{" "}
              <span className="fw-600 text-14 lg:text-13">{hotel?.floor}</span>
            </div>
          </div>

          <div className="col-12">
            <div className=" text-15 lg:text-14 mb-10">
              <i className="icon-bed text-primary-500 text-14 mr-10"></i>
              {t("HOTEL.ROOM_NUMBER")}:{" "}
              <span className="fw-600 text-14 lg:text-13">{hotel?.rooms}</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3 ">
          <div className="col-12">
            <div className=" text-15 lg:text-14 mb-10">
              <i className="icon-bed  text-primary-500 text-14 mr-10"></i>{" "}
              {t("HOTEL.RESTAURANT_NUMBER")}:{" "}
              <span className="fw-600 text-14 lg:text-13">
                {hotel?.restaurant}
              </span>
            </div>
          </div>

          <div className="col-12">
            <div className=" text-15 lg:text-14">
              <i className="icon-bed text-primary-500 text-14 mr-10"></i>Bar{" "}
              {t("COMMON.AND")} lounge:{" "}
              <span className="fw-600  text-14 lg:text-13">
                {hotel?.barOrLounges}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpfulFacts;
