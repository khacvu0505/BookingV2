import { useTranslation } from "react-i18next";
import "./ShowQuantity.style.scss";
interface ShowQuantityProps {
  quantity: number;
  type?: string;
}

const ShowQuantity = ({ quantity, type = "hotel" }: ShowQuantityProps) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-4 show_quantity rounded-3 d-inline-flex items-center lg:justify-start">
      <img src="/images/HotelList/icon-warning.png" alt="hotel list okdimall" />
      <p className="text-14 lg:text-13 md:text-12 fw-400 ml-4 text-warning-more">
        {type === "hotel" &&
          (quantity > 5
            ? t("HOTELS.ROOM/FEW")
            : quantity <= 5 && quantity > 1
            ? ` ${t("HOTELS.JUST_ONLY")} ${quantity} ${t("HOTELS.ROOM/EMPTY")}`
            : `${t("HOTELS.ROOM/LAST")}`)}

        {type === "tour" &&
          `${t("HOTELS.JUST_ONLY")} ${quantity} ${t("COMMON.SLOT")}`}
      </p>
    </div>
  );
};

export default ShowQuantity;
