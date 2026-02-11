import { useSelector } from "react-redux";
import ReviewProgress from "../guest-reviews/ReviewProgress";
import DetailsReview from "../guest-reviews/DetailsReview";

const Reviews = () => {
  const { hotelInfo } = useSelector((state) => state.hotel);
  if (!hotelInfo) {
    return;
  }
  return (
    <div id="reviews">
      <div className="container">
        <ReviewProgress hotel={hotelInfo} />

        <div className="pt-40">
          <DetailsReview hotel={hotelInfo} />
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
