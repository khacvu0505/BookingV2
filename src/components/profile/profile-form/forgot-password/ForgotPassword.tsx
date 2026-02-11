import React, { forwardRef, useImperativeHandle, useState } from "react";

const ForgotPassword = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
  }));

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`currencyMenu js-currencyMenu ${isVisible ? "" : "is-hidden"}`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size1">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        <div className="d-flex items-center justify-between px-30 pb-20 sm:px-15 border-bottom-light">
          <div className="text-20 fw-500 lh-15 w-100 text-center">
            <img src="/img/general/logo-okdimall.svg" alt="logo" width={100} />
            <p className="mt-10">FORGOT PASSWORD?</p>
          </div>
          {/* End Title */}

          {/* <button className="pointer" onClick={handleCurrency}>
            <i className="icon-close" />
          </button> */}
          {/* End colse button */}
        </div>
        {/* End flex wrapper */}

        <div className="pl-10 pr-10 mt-10">
          <p className="text-dark-1 text-16 text-center mb-10">
            We ve sent a password reset email to your email address. Please
            check your inbox (including spam folder if necessary) <br /> If you
            encounter any issues or need assistance, feel free to contact us via
            email or our support phone number. <br /> Thank you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ForgotPassword);
