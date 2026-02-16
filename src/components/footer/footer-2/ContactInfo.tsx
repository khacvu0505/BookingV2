import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const ContactInfo = () => {
  const { t } = useTranslation();
  const contactContent = useMemo(() => [
    {
      id: 1,
      title: "Hotline",
      action: "tel:0886479456",
      text: "+84 886 479 456",
    },
    {
      id: 2,
      title: "Email",
      action: "mailto:info@okdimall.com",
      text: "info@okdimall.com",
    },
    {
      id: 3,
      title: t("COMMON.COMPANY_NAME_LABEL"),
      text: "OKdimall Travel Co., Ltd",
    },
    {
      id: 4,
      title: t("COMMON.ADDRESS_LABEL"),
      text: t("COMMON.COMPANY_ADDRESS"),
    },
  ], [t]);
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-10" key={item.id}>
          <div className={"text-16 mt-10"}>{item.title}</div>
          <a href={item?.action} className="text-15 fw-500 text-white mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
