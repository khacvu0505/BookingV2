import { useTranslation } from "react-i18next";
import giftIcon from "/images/home/gift-icon.png";

export const displayPhoneInfo = () => (
  <>
    <div>
      <i
        className="ri-phone-fill text-white text-14 bg-primary-500 size-26 flex-center rounded-full mr-4"
        aria-hidden="true"
      />
    </div>
    <span className="text-14 text-neutral-800 fw-400">
      <a href="tel:0886479456">0886 479 456</a> -
      <a href="tel:0889479456"> 0889 479 456</a>
    </span>
  </>
);

export const DisplayGiftInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <img src={giftIcon.src} alt="gift-icon" className="mr-4 mb-2" />
      </div>
      <p className="text-14 text-neutral-800 fw-400">
        {t("HOME.HEADER/PROMOTION_TITLE")}{" "}
        <span className="text-primary-500">40%</span>
      </p>
    </>
  );
};
