import React, { lazy } from "react";
import { getProfile } from "@/utils/auth";
import { useTranslation } from "react-i18next";

const UploadAvatar = lazy(() => import("./UploadAvatar"));
const ProfileForm = lazy(() => import("./ProfileForm"));

const Profile = () => {
  const { t } = useTranslation();
  const dataUser = getProfile();

  return (
    <div>
      <div className="row justify-between items-end lg:pb-40 md:pb-10 mb-24">
        <div className="col-12">
          <h1 className="text-24 lg:text-22 md:text-20 fw-600 text-neutral-800 mb-8">
            {t("COMMON.PERSONAL_INFORMATION")}
          </h1>
          <p className="fw-400 text-14 text-neutra-500">
            {t("PROFILE.PROFILE_DESCRIPTION")}
          </p>
        </div>
      </div>
      <div>
        <div className="mb-40">
          <UploadAvatar dataUser={dataUser} />
        </div>
        <ProfileForm dataUser={dataUser} />
      </div>
    </div>
  );
};

export default Profile;
