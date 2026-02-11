import { useSelector } from "react-redux";
import DetailsReview from "../guest-reviews/DetailsReview";
import ReviewProgress from "../guest-reviews/ReviewProgress";

const Reviews = () => {
  const { tourBookingInfo } = useSelector((state) => state.tour);
  if (!tourBookingInfo) {
    return;
  }
  return (
    <div id="reviews">
      <div className="container">
        <ReviewProgress tour={tourBookingInfo} />

        <div className="pt-40">
          <DetailsReview tour={tourBookingInfo} />
        </div>

        {/* <div className="row pt-30">
          <div className="col-auto">
            <button className="button -md -outline-blue-1 text-blue-1">
              Hiển thị 116 đánh giá{" "}
              <div className="icon-arrow-top-right ml-15"></div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Reviews;
