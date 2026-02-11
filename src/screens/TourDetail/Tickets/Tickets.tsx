import ShowPrice from "@/apps/ShowPrice";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TourPrices from "./TourPrices";
import ShowMoreModal from "./ShowMoreModal";
import Button from "@/apps/Button";
import ReturnPolicy from "@/apps/ReturnPolicy";
import NeedApproval from "@/apps/ReturnPolicy/NeedApproval";
import { isEmpty } from "lodash";
import RadomText from "./RadomText";
import classNames from "classnames";
import ShowQuantity from "@/apps/ShowQuantity";
import { useTranslation } from "react-i18next";

const Tickets = ({
  services,
  handleChooseService,
  tourPrices,
  tourPricesLoading,
}) => {
  const { t } = useTranslation();
  const showMoreModalRef = useRef();
  const [modalDetail, setModalDetail] = useState(undefined);
  const { tourBookingInfo } = useSelector((state) => state.tour);
  const previousTour = useRef(tourBookingInfo?.tourID);
  const [showMoreIds, setShowMoreIds] = useState([]);

  const renderServiceOffer = useCallback((item, index) => {
    return (
      <div key={index} className="d-flex align-items-top">
        <i className="icon-check text-green-2 text-12 ml-10 mt-5" />
        <span className="w-100 pl-10 text-14 lg:text-13 fw-400 text-neutral-700">
          {item}
        </span>
      </div>
    );
  }, []);

  const handleShowMoreService = (item) => {
    setShowMoreIds((prev) => [...prev, item?.tourID]);
  };

  if (services?.length === 0) return null;

  return (
    <div id="tourServices">
      {services?.map((item) => (
        <div
          key={item.tourID}
          className={classNames("border-light rounded-8 mt-20 ")}
        >
          <div className="row px-20 lg:px-12 py-20 lg:py-12 d-flex justify-content-between align-items-end">
            <div className="col-md-7 col-lg-8 lg:pr-0">
              <h3 className="text-24 xl:text-22 lg:text-20 fw-500 text-primary-500">
                {item.tourName}
              </h3>
              <ReturnPolicy
                align="vertical"
                paymentPolicy={item?.paymentPolicy}
                cancelPolicy={item?.cancelPolicy}
                isNeedApproval={item?.isNeedApproval}
                timeNeedApproval={item?.timeNeedApproval}
                displayNeedApproval={false}
              />
              <div
                className="p-2 rounded-end ml-10 mt-6"
                style={{
                  borderLeft: "1px solid var(--color-action-success)",
                  background:
                    "linear-gradient(90deg, rgba(236, 236, 236, 0.2) 0%, rgba(143, 143, 143, 0) 100%)",
                }}
              >
                <span className="text-dark fw-500 mr-10 lg:text-15">
                  {t("COMMON.INCLUDED_OFFERS")}
                </span>
                {!showMoreIds.includes(item?.tourID) &&
                  item?.includes?.length > 5 && (
                    <span
                      className="text-16 lg:text-14 fw-400 text-primary-500 italic cursor-pointer"
                      onClick={() => handleShowMoreService(item)}
                    >
                      {t("COMMON.VIEW_DETAIL")}
                    </span>
                  )}

                {!isEmpty(item?.includes) &&
                  item?.includes
                    ?.slice(0, 5)
                    ?.map((item, index) => renderServiceOffer(item, index))}
                {showMoreIds.includes(item?.tourID) &&
                  item?.includes
                    ?.slice(5)
                    ?.map((item, index) => renderServiceOffer(item, index))}
              </div>
            </div>
            <div className="col-md-5 col-lg-4 d-flex flex-column  items-end lg:pl-0">
              <div className="mb-5">
                <NeedApproval
                  isNeedApproval={item?.isNeedApproval}
                  timeNeedApproval={item?.timeNeedApproval}
                />
              </div>

              <ShowQuantity quantity={item?.quantity} type="tour" />
              <ShowPrice
                listedPrice={item?.listedPrice}
                promotionPrice={item?.promotionPrice}
                finalPrice={item?.finalPrice}
                memberPrice={item?.memberPrice}
                discountPrice={item?.discountPrice}
                hasTags={item?.hasTags}
              />
              <RadomText randomText={item?.randomText} />
              <div
                className="accordion__button text-right mt-5 md:w-1/1 md:pl-15"
                data-bs-toggle="collapse"
                data-bs-target={`#tour_${item?.tourID}`}
              >
                <Button
                  className="md:w-1/1"
                  onClick={() => {
                    item.tourID !== previousTour.current &&
                      handleChooseService(item);
                    previousTour.current = item?.tourID;
                  }}
                >
                  {t("TOUR.CHOOSE_TICKET")}
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`accordion-collapse collapse ${
              item.tourID === tourBookingInfo.tourID &&
              tourBookingInfo?.ServicePrices?.length > 0
                ? "show"
                : ""
            }`}
            id={`tour_${item?.tourID}`}
            data-bs-parent="#tourServices"
          >
            {tourPricesLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary-500" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <TourPrices
                tourPrices={
                  tourBookingInfo?.tourID === item?.tourID
                    ? tourBookingInfo?.ServicePrices
                    : tourPrices
                }
              />
            )}
          </div>
        </div>
      ))}
      <ShowMoreModal
        ref={showMoreModalRef}
        tourName={modalDetail?.tourName}
        description={modalDetail?.description || ""}
      />
    </div>
  );
};

export default Tickets;
