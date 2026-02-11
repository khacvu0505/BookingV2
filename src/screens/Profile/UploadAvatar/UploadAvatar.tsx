import { updateUserInfo } from "@/api/user.api";
import { updateProfile } from "@/features/app/appSlice";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const UploadAvatar = ({ dataUser }) => {
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState(dataUser?.thumb || "");

  const inputRef = useRef(null);
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
        (alert as any)(
          "File format not supported",
          "Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed.",
          "warning"
        );
        return;
      }
      try {
        // eslint-disable-next-line no-undef
        const formData = new FormData();
        formData.append("avatar", event.target.files[0]);
        formData.append("userID", dataUser.userID);
        formData.append("firstName", dataUser.firstName);
        formData.append("lastName", dataUser.lastName);
        // formData.append("mobileNo", data.mobileNo);
        // formData.append("email", data.email);
        await updateUserInfo(formData);
        dispatch(
          updateProfile({
            // eslint-disable-next-line no-undef
            thumb: URL.createObjectURL(event.target.files[0]),
          })
        );
      } catch (error) {
        console.error(error);
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

  const getImageUrl = (url) => {
    if (!url) {
      return "/img/profile/no-avatar.png";
    }
    if (url && url.includes("blob:")) {
      return url;
    }
    return `${url}`;
  };

  return (
    <div className="relative d-inline-block">
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
            className="user-avatar-img size-160 lg:size-140 md:size-120"
            loading="eager"
            src={getImageUrl(avatarUrl)}
            onError={(e) => {
              (e.target as any).src = "/images/Profile/no-avatar.png";
            }}
          />
        </div>
        <div className="absolute top-0 right-0">
          <img
            className="icon-img"
            loading="eager"
            src="/images/Profile/icon-pencil.png"
          />
        </div>
      </button>
    </div>
  );
};

export default UploadAvatar;
