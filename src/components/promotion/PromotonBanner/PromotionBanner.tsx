import { useTranslation } from "react-i18next";

const PromotionBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="col-12 " data-aos="fade">
      <div className="relative d-flex promotion_banner">
        <img
          src="https://cdn0.agoda.net/images/blt2/dealshub/mainbanner.png"
          alt="image"
          className="col-12 rounded-4 promotion_banner_img"
        />
        <div className="blogBanner__content"></div>
        <div
          className=" absolute z-2 px-50 top-35"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 className="text-50 fw-600 text-white lg:text-40 md:text-30">
            {t("COMMON.OFFERS_FOR_TODAY")}
          </h1>
          <p className="text-white fw-bold">
            {t("COMMON.OFFERS_FOR_TODAY_DESC")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
