import { formatCurrency } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RatingComponent from "@/apps/Rating";
import { useTranslation } from "react-i18next";

const WishlistItem = ({ favourites, handleRemoveFavourite }) => {
  const { t } = useTranslation();
  const { currentCurrency } = useSelector((state) => state.app);

  const navigate = useNavigate();

  const handleClickWishlistItem = (item) => {
    navigate(`/hotels/${item?.slug}?location=${item?.regionID || "NT"}`);
  };
  return (
    <>
      {favourites.map((item, idx) => (
        <div className="col-12 rounded-8 mb-20 py-15 border-light" key={idx}>
          <div className="row bg-white">
            <div className="col-12 col-sm-5 col-md-3 pr-0 md:pr-10">
              <div
                className="cardImage w-200 md:w-1/1 md:h-fit-content pointer"
                onClick={() => handleClickWishlistItem(item)}
              >
                <img
                  className="rounded-8 col-12 js-lazy object-cover h-160 md:h-220"
                  src={item?.thumb?.length > 0 && item?.thumb[0]}
                  alt="image"
                  width={264}
                />
              </div>
            </div>
            {/* End col */}

            <div className="col-12 col-sm-7 col-md-9 cursor-pointer">
              <div
                className="d-flex align-items-center jus"
                onClick={() => handleClickWishlistItem(item)}
              >
                <div className="d-flex justify-content-between items-center md:flex-column md:items-start w-100">
                  <div className="d-flex flex-wrap items-center md:flex-column md:items-start w-50 md:w-1/1 sm:mt-20">
                    <h3 className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mr-10">
                      {item?.supplierName}
                    </h3>
                    {item.class ? (
                      <RatingComponent
                        stop={item?.class}
                        initialRating={item?.class}
                      />
                    ) : null}
                  </div>
                  <p>
                    {t("COMMON.PRICE_FROM")}:{" "}
                    <span className="text-primary-500 fw-600 text-24 lg:text-20 md:text-18 sm:text-16">
                      {formatCurrency(item?.finalPrice)} {currentCurrency}
                    </span>
                  </p>
                </div>
              </div>
              <div className="row md:flex-column md:items-start">
                <div className="col-12 col-md-6">
                  <div className="d-flex items-center">
                    <img
                      src="/images/Profile/icon-location.png"
                      alt="icon-location"
                    />
                    <p className="text-14 fw-400 text-neutral-500 ml-4">
                      {item?.address}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div
                    className="d-flex align-items-center justify-content-end text-center w-100 cursor-pointer"
                    onClick={() => handleRemoveFavourite(item?.wishListID)}
                  >
                    <div className="cusor-pointer text-primary-500">
                      <i className="ri-delete-bin-7-line mr-10"></i>
                      {t("COMMON.DELETE")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WishlistItem;
