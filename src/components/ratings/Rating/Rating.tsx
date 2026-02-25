import Rating from "react-rating";
import "./Rating.style.scss";

interface RatingComponentProps {
  stop?: number;
  initialRating?: number;
}

const RatingComponent = ({ stop = 6, initialRating = 0 }: RatingComponentProps) => {
  return (
    <div>
      {/* @ts-ignore - react-rating types */}
      <Rating
        className="rating-component"
        stop={Math.ceil(stop)}
        readonly
        initialRating={initialRating}
        emptySymbol={
          <i className="icon-star text-15 lg:text-14 text-light-2 mr-2"></i>
        }
        fullSymbol={
          <i className="icon-star text-15 lg:text-14 text-yellow-star mr-2"></i>
        }
      />
    </div>
  );
};

export default RatingComponent;
