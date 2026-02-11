import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Condition = () => {
  const { t } = useTranslation();

  const condition = useMemo(
    () => [
      { name: t("HOME.FOOTER/ABOUT_US"), routerPath: "/" },
      { name: t("HOME.FOOTER/PRIVACY_POLICY"), routerPath: "/privacy-policies" },
      { name: t("HOME.FOOTER/PAYMENT_POLICY"), routerPath: "/dispute-resolution-mechanism" },
      { name: t("HOME.FOOTER/OPERATION"), routerPath:
        "https://extapi.okdimall.com/Media/Policies/RULES-OF-OPERATION.pdf",
      isNewTab: true, },
      {
        name: t("HOME.FOOTER/RECEIVING_FEEDBACK"),
        routerPath:
          "https://docs.google.com/forms/d/e/1FAIpQLSdF1Rfh_7EzlECdAyY_Hr1rwHJDCGPEamBHOJyC2WSfHNMLdA/viewform",
        isNewTab: true,
      },
      {
        name: t("HOME.FOOTER/LIST_OF_FEEDBACK"),
        routerPath: "/contact-us-form-submits",
        isNewTab: true,
      },
    ],
    [t]
  );

  return (
    <div>
      <p className="text-24 xl:text-20 fw-700 text-white lh-14 py-20 xl:pt-15 xl:pb-10">
        {t("HOME.FOOTER/TERM_AND_CONDITIONS")}
      </p>
      {condition.map((item) => (
        <div className="mt-10" key={item.name}>
          <a
            href={item.routerPath}
            className="text-15 xl:text-14 fw-500 text-white mt-5 xl:mt-10"
            target={item.isNewTab ? "_blank" : "_self"}
            rel={item.isNewTab ? "noopener noreferrer" : ""}
          >
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Condition;
