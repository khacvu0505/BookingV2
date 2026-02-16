import React from "react";
import { useTranslation } from "react-i18next";

const ContactInfo = () => {
  const { t } = useTranslation();
  const contactContent = [
    {
      id: 1,
      icon: <i className="ri-map-pin-2-fill text-white text-16 mr-10" />,
      text: t("COMMON.COMPANY_ADDRESS"),
    },
    {
      id: 2,
      icon: <i className="ri-time-fill text-white text-16 mr-10" />,
      text: `${t("HOME.FOOTER/WORKING_TIME")}: ${t(
        "HOME.FOOTER/WORKING_TIME_DETAIL"
      )}`,
    },
    {
      id: 3,
      icon: <i className="ri-phone-fill text-white text-16 mr-10" />,
      action: "tel:0886479456",
      text: "+84 886 479 456",
    },
    {
      id: 4,
      icon: <i className="ri-mail-fill text-white text-16 mr-10" />,
      action: "mailto:info@okdimall.com",
      text: "info@okdimall.com",
    },
    {
      id: 5,
      text: t("COMMON.TAX_CODE_INFO"),
    },
    {
      id: 6,
      text: t("COMMON.LEGAL_REP_INFO"),
    },
    {
      id: 7,
      text: t("COMMON.AUTHORIZED_CONTACT_INFO"),
    },
    {
      id: 8,
      icon: <i className="ri-phone-fill text-white text-16 mr-10" />,
      action: "tel:0938479456",
      text: "+84 938 479 456",
    },
    {
      id: 9,
      icon: <i className="ri-mail-fill text-white text-16 mr-10" />,
      action: "mailto:info@okdimall.com",
      text: "ca@okdimall.com",
    },
  ];
  return (
    <>
      <p className="text-24 xl:text-20 fw-700 text-white lh-14 py-20 xl:pt-15 xl:pb-10">
        {t("HOME.FOOTER/TITLE")}
      </p>
      {contactContent.map((item) => (
        <div className="mt-10" key={item.id}>
          {item.icon}
          <a
            href={item?.action}
            className="text-15 xl:text-14 fw-500 text-white mt-5 xl:mt-10"
          >
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
