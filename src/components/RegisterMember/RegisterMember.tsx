import React, { useRef } from "react";
import { getProfile } from "@/utils/auth";

import "./RegisterMember.style.scss";
import AuthenModal from "@/components/authen/AuthenModal";
import { useTranslation } from "react-i18next";

const RegisterMember = () => {
  const { t } = useTranslation();
  const profile = getProfile();
  const refSignInModal = useRef(null);

  const handleClickRegister = () => {
    if (!profile) {
      refSignInModal.current?.setIsVisible(true);
    }
  };

  return (
    <>
      <div className="register_member md:flex-column">
        <div className="d-flex items-center">
          <img
            src="/images/HotelList/icon-celebrate.png"
            alt="hotel detail okdimall"
            className="register_member-img"
          />
          <p className="register_member-title md:text-14 sm:text-13 sm:mr-0">
            {t("HOTELS.REGISTER_BANNER")} !!!
          </p>
        </div>
        <p
          className="register_member-text md:text-14 sm:text-13"
          onClick={handleClickRegister}
        >
          {t("HOTELS.REGISTER_NOW")}
        </p>
      </div>
      <AuthenModal ref={refSignInModal} />
    </>
  );
};

export default RegisterMember;
