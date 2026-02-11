import React, { useMemo } from "react";
import paymentImg from "/images/home/payment.png";
import { useTranslation } from "react-i18next";

const AppButton = () => {
  const { t } = useTranslation();
  const appContent = useMemo(
    () => [
      {
        id: 1,
        icon: "icon-apple",
        link: "https://www.apple.com/app-store/",
        text: "Download on the",
        market: "Apple Store",
        colClass: "",
      },
      {
        id: 2,
        icon: "icon-play-market",
        link: "https://play.google.com/store/apps/?hl=en&gl=US",
        text: "Get in on",
        market: "Google Play",
        colClass: "mt-20",
      },
    ],
    []
  );

  return (
    <>
      <p className="text-24 xl:text-20 fw-700 text-white lh-14 py-20 xl:pt-15 xl:pb-10">
        {t("HOME.FOOTER/PAYMENT_TITLE")}
      </p>
      <img
        src={paymentImg as any}
        alt="payment-method"
        className="object-fit mb-40 xl:mb-30"
      />
      {appContent.map((item) => (
        <div
          className={`d-flex items-center px-20 py-10 rounded-4 border-white  ${item.colClass}`}
          key={item.id}
        >
          <i className={`${item.icon} text-24`} />
          <a href={item.link} className="ml-20 d-block">
            <div className="text-14 xl:text-13 fw-500 text-white">
              {item.text}
            </div>
            <div className="text-15 xl:text-14 lh-1 fw-500">{item.market}</div>
          </a>
        </div>
      ))}
      <div className="mt-30 flex items-center gap-20">
        <a href='http://online.gov.vn/Website/chi-tiet-133384' target="_blank" rel="noopener noreferrer">
          <img 
            alt='Bộ Công Thương' 
            title='Bộ Công Thương' 
            src='https://ik.imagekit.io/tvlk/image/imageResource/2019/09/23/1569229181629-eeb038ad844874f951326d0a8534bf48.png?tr=q-75,w-100'
            className="h-40 object-contain"
            loading="lazy"
          />
        </a>
      </div>
    </>
  );
};

export default AppButton;
