import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./TopDestination.styles.scss";

const TopDestinations = ({ initialRegions }: { initialRegions?: any[] }) => {
  const { regions: reduxRegions } = useSelector((state) => state.hotels);
  const regions = reduxRegions?.length > 0 ? reduxRegions : (initialRegions || []);

  return (
    <>
      {regions?.length > 0 &&
        regions?.slice(0, 6)?.map((item) => (
          <div
            className="col-12 col-sm-6 xl:px-10 xl:py-10 col-xl-4 topDestinationCard"
            key={item?.id}
            data-aos="fade"
            data-aos-delay={100}
          >
            <Link to={`/destinations?region=${item.id}`} className="">
              <div className="rounded-16 cardItem">
                <div className=" cardImage">
                  <img
                    className="col-12 js-lazy image"
                    src={item?.thumbnailURL}
                    alt="image"
                    width={100}
                  />
                </div>
                <div className="cardContent">
                  <h4 className="text-24 fw-200 text-white text-capitalize">
                    {item?.name}
                  </h4>
                  <div className="text-18  fw-400 text-white">
                    {item?.address}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default TopDestinations;
