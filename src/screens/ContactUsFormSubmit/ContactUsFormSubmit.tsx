import React from "react";
import MetaComponent from "@/components/MetaComponent";
import { useTranslation } from "react-i18next";

const metadata = {
  title: "Contact",
  description: "OKdimall - Travel & Tour",
};

const ContactUsFormSubmit = () => {
  const { t } = useTranslation();
  <MetaComponent meta={metadata} />;

  return (
    <div className="mb-50">
      <section className="mt-100 md:mt-80">
        <div className="container">
          <p className="text-neutral-800 text-24 lg:text-20">
            {t("COMMON.FEEDBACK_LIST_TITLE")}
          </p>
          <p className="text-neutral-800 text-16  lg:text-14">
            {t("COMMON.FEEDBACK_LIST_DESC")}
          </p>
          <a
            href="https://docs.google.com/spreadsheets/d/1UR15WAqqNiV5QXUp-MXDmQ6gpOz0IVaI5HUe1f2eJhY/edit?gid=0#gid=0"
            className="text-neutral-800 underline italic text-16"
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            {t("COMMON.CLICK_TO_VIEW")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUsFormSubmit;
