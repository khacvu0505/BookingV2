import React from "react";
import "./ContactUs.styles.scss";
import Button from "@/apps/Button";
import InputEmail from "./InputEmail";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="row contactContainer">
      <div className="col-12 col-lg-6 contactInfo px-48 py-48 xl:px-30 xl:py-30">
        <div className="d-flex flex-column gap-5 contactInfoContent">
          <div>
            <Button>{t("HOME.CONTACT_US")}</Button>
          </div>
          <p className="text-32 xl:text-24 fw-700 text-neutral-800 lh-15">
            {t("HOME.CONTACT_US_DESC")}
          </p>
          <InputEmail />
        </div>
        <p className="text-14 fw-400 mt-15">
          {t("HOME.THANK_YOU")} <b>OKdimall</b>!
        </p>
      </div>
      <div className="col-12 col-lg-6 contactImage px-0">
        <LazyLoadImage
          alt="contact-us"
          src="https://cdn.prod.website-files.com/660682f5dce59d61df5bdd6b/6650618fa8b7a053627f99e8_Soneva%20Jani%20-%20Aerial_Aksham%20Abdul%20Ghadir2.webp"
          className="w-100 h-full object-cover h-100 contactImage_img"
        />
      </div>
    </div>
  );
};

export default ContactUs;
