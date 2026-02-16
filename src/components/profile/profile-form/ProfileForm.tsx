import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ChangePassword from "./change-password/ChangePassword";
import ForgotPassword from "./forgot-password/ForgotPassword";
import { getProfile } from "@/utils/auth";

const ProfileForm = () => {
  const { t } = useTranslation();
  const dataUser = getProfile() as any;
  const [profileForm, setProfileForm] = useState({
    name: dataUser?.fullName || "",
    email: dataUser?.email || "",
    phoneNumber: dataUser?.mobileNo || "",
  });

  const refForgotPasswordModal = useRef(null);
  const refChangePasswordModal = useRef(null);

  const [avatarUrl, setAvatarUrl] = useState(dataUser?.thumb || "");

  const inputRef = useRef(null);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const getImageUrl = (url) => {
    if (!url) {
      return "/img/profile/no-avatar.png";
    }
    if (url && url.includes("blob:")) {
      return url;
    }
    return `${url}`;
  };

  const handleGetFile = async (event) => {
    if (event.target.files[0]) {
      if (
        [
          "image/png",
          "image/jpeg",
          "image/apng",
          "image/webp",
          "image/avif",
          "image/gif",
        ].indexOf(event.target.files[0].type) === -1
      ) {
        // eslint-disable-next-line no-undef
        alert(
          "File format not supported. Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed."
        );
        return;
      }
      // get file from computer
      // eslint-disable-next-line no-undef
      const url = URL.createObjectURL(event.target.files[0]);

      // set url state for resize
      setAvatarUrl(url);
    }
  };

  const handleClickInput = () => {
    if (inputRef) {
      inputRef.current.click();
    }
  };

  return (
    <div className="row">
      <div className="col-xl-7 ">
        <div className="row y-gap-20 py-20">
          {/* End .col */}

          {/* Begin Avatar */}
          <div className="upload-avatar-container">
            <input
              id="avatar"
              name="avatar"
              type="file"
              hidden
              ref={inputRef}
              onChange={handleGetFile}
            />

            <button onClick={handleClickInput} className="upload-button">
              <div className="user-avatar-container">
                <img
                  className="user-avatar-img"
                  loading="eager"
                  src={getImageUrl(avatarUrl)}
                  onError={(e) => {
                    (e.target as any).src = "/img/profile/no-avatar.png";
                  }}
                />
              </div>
              <div className="icon-container">
                <img
                  className="icon-img"
                  loading="eager"
                  src="/img/profile/pencil.svg"
                />
              </div>
            </button>
          </div>
          {/* End Avatar */}

          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                required
                name="name"
                value={profileForm.name}
                onChange={handleChangeForm}
                disabled
              />
              <label className="lh-1 text-14 text-light-1">{t("COMMON.LABEL_FIRST_NAME")}</label>
            </div>
          </div>

          <div className="col-12">
            <div className="form-input">
              <label className="lh-1 text-14 text-light-1">Email</label>

              <input
                type="text"
                required
                readOnly
                name="email"
                value={profileForm.email}
                disabled
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-input">
              <label className="lh-1 text-14 text-light-1">{t("COMMON.LABEL_PHONE")}</label>

              <input
                type="text"
                required
                readOnly
                name="phoneNumber"
                value={profileForm.phoneNumber}
                disabled
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-6">
            <div
              className="button -outline-blue-1 px-30 h-50 btn-change-password w-100 cursor-pointer mt-0"
              onClick={() => refChangePasswordModal.current.setIsVisible(true)}
            >
              <img src="/img/profile/lock.svg" alt="lock" className="mr-4" />
              {t("COMMON.UPDATE_PASSWORD_TITLE")}
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="button -outline-blue-1 px-30 h-50 btn-forgot-password w-100 cursor-pointer mt-0"
              onClick={() => refForgotPasswordModal.current.setIsVisible(true)}
            >
              <img src="/img/profile/lock.svg" alt="lock" className="mr-4" />
              {t("COMMON.FORGOT_PASSWORD")}
            </div>
          </div>
          {/* End .col */}

          <div className="col-12">
            <button
              // type="submit"
              // href="#"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
            >
              {t("COMMON.UPDATE_INFO")} <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
          {/* End .col */}
        </div>
      </div>
      {/* Modal */}
      <ChangePassword ref={refChangePasswordModal} email={profileForm?.email} />
      <ForgotPassword ref={refForgotPasswordModal} />
    </div>
  );
};

export default ProfileForm;
