import React, { useMemo } from "react";
import ReasonItem from "./ReasonItem";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

const ReasonChoose = () => {
  const { t } = useTranslation();
  const blockContent = useMemo(
    () => [
      {
        id: 1,
        icon: "/images/home/reason-light.png",
        title: t("HOME.DIFFERENT"),
        text: t("HOME.DIFFERENT_DESC"),
        delayAnim: "100",
      },
      {
        id: 2,
        icon: "/images/home/reason-money.png",
        title: t("HOME.REASONABLE_PRICE"),
        text: t("HOME.REASONABLE_PRICE_DESC"),
        delayAnim: "200",
      },
      {
        id: 3,
        icon: "/images/home/reason-cup.png",
        title: t("HOME.SERVICE_QUALITY"),
        text: t("HOME.SERVICE_QUALITY_DESC"),
        delayAnim: "300",
      },
      {
        id: 4,
        icon: "/images/home/reason-gift.png",
        title: t("HOME.TRUST"),
        text: t("HOME.TRUST_DESC"),
        delayAnim: "300",
      },
    ],
    [t]
  );

  return (
    <div className="row w-100 xl:items-center lg:items-start items-start ">
      <div className="col-12 col-lg-6 col-xl-4 lg:d-block xl:d-none d-block">
        {blockContent.slice(0, 2).map((item) => (
          <ReasonItem item={item} key={item.id} />
        ))}
      </div>
      <div className="col-12 col-lg-6 col-xl-4 d-none xl:d-block lg:d-none">
        {blockContent.slice(0, 4).map((item) => (
          <ReasonItem item={item} key={item.id} />
        ))}
      </div>
      <div className="col-12 col-lg-6 col-xl-4  px-0">
        <LazyLoadImage
          src="/images/home/reason-choose.png"
          alt="reason-image"
          className="object-cover"
        />
      </div>

      <div className="col-12 col-lg-6 col-xl-4 lg:d-block xl:d-none d-block lg:pt-40">
        {blockContent.slice(2, 4).map((item) => (
          <ReasonItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ReasonChoose;
