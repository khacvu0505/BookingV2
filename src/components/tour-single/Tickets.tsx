import React, { useRef, useState } from "react";
import ShowPrice from "../price/ShowPrice";
import ReturnPolicy from "../return-policy/ReturnPolicy";
import TourPrices from "./TourPrices";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import PromotionPrice from "../promotion-price";
import ShowMoreModal from "./ShowMoreModal";

const Tickets = ({
  services,
  handleChooseService,
  tourPrices,
  tourPricesLoading,
}: { services: any; handleChooseService: any; tourPrices: any; tourPricesLoading: any }) => {
  const showMoreModalRef = useRef<any>();
  const [modalDetail, setModalDetail] = useState(undefined);
  const { tourBookingInfo } = useSelector((state) => state.tour);
  if (services?.length === 0) return null;

  return (
    <div id="tourServices">
      {services?.map((item) => (
        <div key={item.tourID} className="border-light rounded-8 mt-20 mb-20">
          <div className="px-20 py-20 d-flex justify-content-between align-items-end">
            <div>
              <h3>{item.tourName}</h3>
              <div className="d-flex gap-1">
                <ReturnPolicy
                  paymentPolicy={item?.paymentPolicy}
                  cancelPolicy={item?.cancelPolicy}
                  isNeedApproval={item?.isNeedApproval}
                  timeNeedApproval={item?.timeNeedApproval}
                />
                <div
                  className="bg-blue-light p-2 rounded-end ml-10"
                  style={{ borderLeft: "2px solid var(--color-green-2)" }}
                >
                  <p className="text-dark fw-500">Ưu đãi bao gồm</p>
                  {item?.includes.map((item, index) => (
                    <div key={index} className="d-flex align-items-top">
                      <i className="icon-check text-green-2 text-12 ml-10 mt-5" />
                      <span className="w-100 pl-10 text-14">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="button -outline-blue-1 text-blue-1 px-2 py-1 mt-10"
                onClick={() => {
                  showMoreModalRef?.current?.setIsVisible(true);
                  setModalDetail({
                    tourName: item?.tourName || "",
                    description: item?.description || "",
                  });
                }}
              >
                Xem chi tiết
              </button>
            </div>
            <div>
              <ShowPrice
                discountPrice={item?.discountPrice}
                listedPrice={item?.listedPrice}
                promotionPrice={item?.promotionPrice}
                hasTags={item?.hasTags}
                finalPrice={item?.finalPrice}
                unit="vé"
              />
              <PromotionPrice
                promotion={item?.promotion || 0}
                memberPrice={item?.memberPrice || 0}
                isTour={true}
              />
              <div
                className="accordion__button"
                data-bs-toggle="collapse"
                data-bs-target={`#tour_${item?.tourID}`}
              >
                <button
                  className="button -sm -dark-1 bg-blue-1 text-white mt-10 px-40"
                  onClick={() => handleChooseService(item)}
                >
                  Chọn vé
                </button>
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
              <Skeleton count={5} />
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
