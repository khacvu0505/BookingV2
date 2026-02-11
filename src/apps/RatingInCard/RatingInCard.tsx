import React from "react";
import { useTranslation } from "react-i18next";

interface RatingInCardProps {
  voteStatus: string;
  totalReview?: number;
  votePoint: number;
}

const RatingInCard = ({ voteStatus, totalReview = 0, votePoint }: RatingInCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="hotel_status">
      <div className="d-flex items-center justify-end md:justify-start ">
        {votePoint > 0 && (
          <div className="d-flex items-center bg-primary-50 pl-3 pr-3 pt-3 lg:pt-2 lg:pl-2 lg:pr-2 lg:pb-2 pb-3 rounded-3  lg:justify-start">
            <img
              src="/images/HotelList/icon-celebrate-color.png"
              alt="hotel list okdimall"
            />
            <p className="text-14 lg:text-13 fw-400 text-primary-500 ml-4 lg:ml-3">
              {votePoint}
            </p>
          </div>
        )}
        <div className="d-flex items-center">
          <p className="text-14 lg:text-13 fw-400 text-primary-500 ml-4 mr-4 lg:mr-3 lg:ml-3">
            {voteStatus}
          </p>
          {totalReview > 0 && (
            <p className="text-12 fw-400 text-neutral-300">
              ({totalReview} {t("COMMON.RATING")})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingInCard;
