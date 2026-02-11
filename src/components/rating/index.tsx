import Rating from "react-rating";
import "./Rating.style.scss";

const SVG = ({ isActive }: { isActive?: any }) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99952 1.66699L5.96186 5.82621L1.33331 6.49734L4.68627 9.77535L3.88477 14.3337L7.99952 12.1401L12.1151 14.3337L11.3195 9.77535L14.6666 6.49734L10.0637 5.82621L7.99952 1.66699Z"
        fill={isActive ? "#FFC414" : "white"}
        stroke="#FFC414"
        strokeWidth="1.33333"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const RatingComponent = ({ stop = 6, initialRating = 0 }) => {
  return (
    <div>
      {/* @ts-ignore */}
      <Rating
        className="rating-component"
        stop={Math.ceil(stop)}
        readonly
        initialRating={initialRating}
        // emptySymbol={<i className="icon-star text-15 text-light-2 mr-2"></i>}
        // fullSymbol={<i className="icon-star text-15 text-yellow-star mr-2"></i>}
        fullSymbol={<SVG isActive={true} />}
        emptySymbol={<SVG />}
      />
    </div>
  );
};

export default RatingComponent;
