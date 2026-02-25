import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import LoginForm from "@/components/common/LoginForm";
import SignUpForm from "@/components/common/SignUpForm";
import EmailForm from "@/components/common/EmailForm";
import VerifyOTPRegister from "@/components/common/VerifyOTPRegister";
import ForgotPassword from "@/components/ForgotPassword";

export const STEPS = {
  LOGIN: 1,
  SIGNUP: 2,
  CHECK_EMAIL: 3,
  VERIFY_EMAIL_OTP: 4,
  FORGOT_PASSWORD: 5,
};

const AuthenModal = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(STEPS.LOGIN);
  const [emailVerify, setEmailVerify] = useState("");

  const handleCloseModal = () => {
    setIsVisible(false);
    setStep(STEPS.LOGIN);
  };

  useImperativeHandle(
    ref,
    () => ({
      isVisible,
      setIsVisible,
      setStep,
    }),
    [isVisible]
  );

  const handleRenderStep = () => {
    switch (step) {
      case STEPS.LOGIN:
        return (
          <LoginForm handleCloseModal={handleCloseModal} setStep={setStep} />
        );
      case STEPS.SIGNUP:
        return (
          <div>
            <SignUpForm
              setStep={setStep}
              emailVerify={emailVerify}
              handleCloseModal={handleCloseModal}
            />
          </div>
        );
      case STEPS.CHECK_EMAIL:
        return <EmailForm setStep={setStep} setEmailVerify={setEmailVerify} />;
      case STEPS.VERIFY_EMAIL_OTP:
        return <VerifyOTPRegister email={emailVerify} setStep={setStep} />;
      case STEPS.FORGOT_PASSWORD:
        return <ForgotPassword handleCloseModal={handleCloseModal} />;

      default:
        break;
    }
  };

  return (
    <div
      className={`currencyMenu js-currencyMenu   ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>

      <div className="currencyMenu__content bg-white rounded-4 authen_modal w-600">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>

        {/* End flex wrapper */}
        <section>
          <div className="bg-white shadow-4 rounded-4 px-20 pb-30">
            {/* <LoginForm handleCloseModal={handleCloseModal} setStep={setStep} /> */}
            {/* End .Login */}
            {handleRenderStep()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default forwardRef(AuthenModal);
