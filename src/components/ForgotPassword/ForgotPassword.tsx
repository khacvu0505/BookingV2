import React, { useState } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { forgotPassword } from "@/api/user.api";
import { handleAlert } from "@/utils/handleAlert";
import { useTranslation } from "react-i18next";

interface ForgotPasswordProps {
  handleCloseModal: () => void;
}

const ForgotPassword = ({ handleCloseModal }: ForgotPasswordProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleCheckEmailExisted = async () => {
    const isValid = validateEmail(email);
    if (!isValid) {
      setMessage(t("COMMON.EMAIL_INVALID"));
      return;
    }
    try {
      setIsSubmmitting(true);
      const res = await forgotPassword(email);
      if (res.success) {
        handleCloseModal();
        handleAlert({
          type: "success",
          title: t("COMMON.SUCCESS"),
          html: t("COMMON.CHECK_EMAIL_FOR_PASSWORD"),
        });
        return;
      }
      setMessage((res as any)?.error);
    } catch (error) {
      setMessage(t("COMMON.PLEASE_TRY_AGAIN"));
    } finally {
      setIsSubmmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleCheckEmailExisted(); }}>
      <h1 className="text-20 text-md-22 fw-500 text-center mb-20">
        {t("COMMON.FORGOT_PASSWORD")}
      </h1>

      <div className="col-12 mb-30">
        <Input
          required
          label={"Email"}
          placeholder={t("COMMON.ENTER_EMAIL_PLACEHOLDER")}
          name="email"
          value={email}
          error={{ message }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="col-12">
        <Button
          className="w-100"
          htmlType="submit"
          disabled={isSubmmitting || Boolean(!email)}
        >
          {isSubmmitting ? <span className="loader mr-15"></span> : t("COMMON.CONTINUE")}
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
    </form>
  );
};

export default ForgotPassword;
