import { useTranslation } from "react-i18next";

const ShowQuantity = ({ quantity }) => {
  const { t } = useTranslation();
  return (
    <span className="bg-pink-light text-blue-1 rounded-4 ">
      <svg
        width="13"
        height="13"
        viewBox="0 0 20 20"
        fill="none"
        className="svgFillAll jss1361 ml-5"
      >
        <path
          d="M10 17.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM10 6.667h.008"
          stroke="var(--color-blue-1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M9.167 10H10v3.333h.833"
          stroke="var(--color-blue-1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <span className="px-5 text-truncate text-13 ">
        {quantity > 5
          ? t("HOTELS.ROOM/FEW")
          : quantity <= 5 && quantity > 1
          ? ` ${t("HOTELS.JUST_ONLY")} ${quantity} ${t("HOTELS.ROOM/EMPTY")}`
          : t("HOTELS.ROOM/LAST")}
      </span>
    </span>
  );
};

export default ShowQuantity;
