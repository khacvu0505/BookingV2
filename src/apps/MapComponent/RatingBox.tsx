import { useTranslation } from "react-i18next";
import RatingInCard from "../RatingInCard";

interface RatingBoxProps {
  hotel: any;
}

const RatingBox = ({ hotel }: RatingBoxProps) => {
  const { t } = useTranslation();
  return (
    <div className="px-15 lg:px-10 py-15 lg:py-10 bg-white rounded-8 ">
      <div className="d-flex mb-10 lg:mb-5">
        <RatingInCard
          voteStatus={hotel?.voteStatus}
          totalReview={hotel?.totalReview}
          votePoint={hotel?.votePoint}
        />
      </div>

      <div className="text-14 lg:text-13 fw-500 text-primary-500">
        {t("HOTEL.HIGH_RATE")} – <strong>{hotel?.votePercent}%</strong>{" "}
        {t("HOTEL.WANT_BACK")}
      </div>
    </div>
  );
};

export default RatingBox;
