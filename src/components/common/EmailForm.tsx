import React, { useState } from "react";
import { checkEmailExist } from "@/api/auth.api";
import { STEPS } from "../authen/AuthenModal";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";

const EmailForm = ({ setStep, setEmailVerify }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleCheckEmailExisted = async () => {
    const isValid = validateEmail(email);
    if (!isValid) {
      setMessage(t("COMMON.INVALID_EMAIL"));
      return;
    }
    setIsSubmmitting(true);
    checkEmailExist(email)
      .then(() => {
        setEmailVerify(email);
        setIsSubmmitting(false);
        setStep(STEPS.VERIFY_EMAIL_OTP);
      })
      .catch((err) => {
        setMessage(err?.response?.data?.error || t("COMMON.ENTER_VALID_EMAIL"));
        setIsSubmmitting(false);
      });
  };

  return (
    <>
      <h1 className="text-20 text-md-22 fw-500 text-center mb-20">
        {t("COMMON.ENTER_YOUR_EMAIL")}
      </h1>

      <div className="col-12 mb-30">
        <Input
          required
          label={t("COMMON.EMAIL")}
          placeholder={t("COMMON.ENTER_YOUR_EMAIL")}
          name="firstName"
          value={email}
          error={{ message }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="col-12">
        <Button
          className="w-100"
          disabled={isSubmmitting || Boolean(!email)}
          onClick={handleCheckEmailExisted}
        >
          {isSubmmitting ? (
            <span className="loader mr-15"></span>
          ) : (
            t("COMMON.CONTINUE")
          )}
        </Button>
        {/* <button
          type="submit"
          onClick={handleCheckEmailExisted}
          className="button py-10 py-md-20 -dark-1 bg-blue-1 text-white w-100"
          disabled={isSubmmitting || Boolean(!email)}
        >
          {isSubmmitting && <span className="loader mr-15"></span>}
          Tiếp tục <div className="icon-arrow-top-right ml-15" />
        </button> */}
      </div>
    </>
  );
};

export default EmailForm;
