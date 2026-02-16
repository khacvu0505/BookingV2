import { requestContact } from "@/api/user.api";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const InputEmail = () => {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(regex.test(e.target.value));
  };

  const handleSubmit = async () => {
    setIsSubmit(true);
    if (!isValid) return;
    try {
      await requestContact(value as any);
      setValue("");
      Swal.fire({
        title: t("HOME.SUCCESS"),
        // text: "You clicked the button!",
        icon: "success",
        confirmButtonText: t("COMMON.CLOSE"),
        confirmButtonColor: "#f52549",
        allowEscapeKey: false,
        allowEnterKey: true,
        allowOutsideClick: false,
        position: "top",
        customClass: {
          popup: "mt-60", // Thêm class để tùy chỉnh khoảng cách
        },
      });
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="inputEmail">
        <input
          type="email"
          placeholder={t("HOME.INPUT_EMAIL")}
          onChange={handleChange}
        />
        <button type="submit" className="button text-18">
          {t("HOME.SUBSCRIBE")}
        </button>
      </div>
      {!isValid && isSubmit && (
        <p className="text-14 text-primary-500 ml-10">
          {t("HOME.EMAIL_INVALID")}
        </p>
      )}
    </form>
  );
};

export default InputEmail;
