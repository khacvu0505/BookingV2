import ReviewProgress from "../Review/ReviewProgress";
import DetailsReview from "../Review/DetailsReview";

interface ReviewsProps {
  hotel: any;
}

const Reviews = ({ hotel }: ReviewsProps) => {
  if (!hotel) {
    return;
  }
  return (
    <div id="reviews">
      <div className="container">
        <ReviewProgress hotel={hotel} />

        <div className="pt-40">
          <DetailsReview hotel={hotel} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
