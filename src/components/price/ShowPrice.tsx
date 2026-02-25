import { DEFAULT_CURRENCY } from "@/utils/constants";
import { formatCurrency } from "@/utils/utils";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ShowPrice = ({
  discountPrice = 0,
  listedPrice = 0,
  promotionPrice = 0,
  unit = "",
  hasTags = [],
  finalPrice = 0,
}) => {
  const { t } = useTranslation();
  const displayUnit = unit || t("COMMON.NIGHT");
  const { currentCurrency = DEFAULT_CURRENCY } =
    useSelector((state) => state.app) || {};
  return (
    <>
      <div>
        <div className="mt-5">
          {hasTags?.length > 0 &&
            hasTags?.map((tag, idx) => (
              <div key={idx}>
                <p
                  style={{
                    color: "#fff",
                    backgroundColor: tag.code,
                    display: "inline-block",
                    borderRadius: 4,
                    fontSize: 13,
                    padding: "0px 2px",
                  }}
                >
                  {tag.name}
                </p>
              </div>
            ))}
        </div>
        {listedPrice > 0 && (
          <p
            className={classNames("text-14 fw-500 order-1", {
              "text-18 text-danger fw-500": listedPrice === finalPrice,
              "line-through": listedPrice !== finalPrice,
            })}
          >
            {formatCurrency(listedPrice)} {currentCurrency}
            {listedPrice === finalPrice && (
              <span className="text-12 text-danger"> / {displayUnit}</span>
            )}
          </p>
        )}
        {promotionPrice > 0 && (
          <p
            className={classNames("text-14 fw-500 order-1 ml-md-5", {
              "text-18 text-danger fw-500": promotionPrice === finalPrice,
              "line-through": promotionPrice !== finalPrice,
            })}
          >
            {formatCurrency(promotionPrice)} {currentCurrency}
            {promotionPrice === finalPrice && (
              <span className="text-12 text-danger"> / {displayUnit}</span>
            )}
          </p>
        )}
      </div>
    </>
  );
};

export default ShowPrice;
