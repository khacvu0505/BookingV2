import { Link } from "react-router-dom";
import { destinations5 } from "../../data/desinations";
import { useSelector } from "react-redux";
import classNames from "classnames";

const TopDestinations = () => {
  const { regions } = useSelector((state) => state.hotels);
  return (
    <>
      {regions?.length > 0 &&
        regions?.slice(0, 6)?.map((item, index) => (
          <div
            className={classNames("col-xl-3 col-md-4 col-sm-6", {
              "col-xl-6": (index + 1) % 2 === 0 && index + 1 !== 6,
            })}
            key={item?.id}
            data-aos="fade"
            data-aos-delay={100}
          >
            <Link
              to="#"
              className="citiesCard -type-3 d-block h-250 rounded-22 -no-overlay"
            >
              <div className="citiesCard__image ratio ratio-1:1">
                <img
                  className="col-12 js-lazy"
                  src={item?.thumbnailURL}
                  alt="image"
                />
              </div>
              <div className="citiesCard__content px-30 py-30">
                <h4 className="text-26 fw-600 text-white text-capitalize">
                  {item?.name}
                </h4>
                <div className="text-15 text-white">{item?.address}</div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default TopDestinations;
