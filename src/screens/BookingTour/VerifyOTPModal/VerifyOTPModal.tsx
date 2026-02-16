import { verifyOTP, resendOTP } from "@/api/booking.api";
import { create_invoice, info_booking, tax_include } from "@/utils/constants";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { clearSessionStorage } from "@/utils/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VerifyOTPModal = ({ email, bookingID }, ref) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmmitting, setIsSubmmitting] = useState(false);

  const handleUnload = (event) => {
    if (otp.length === 6) {
      // Remove event listener if otp length is 6
      // eslint-disable-next-line no-undef
      window.removeEventListener("beforeunload", handleUnload);
    } else {
      // setToSessionStorage(booking_id, bookingID);
      // Custom message for beforeunload event
      event.returnValue = "Are you sure you want to leave?";
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener("beforeunload", handleUnload);

    // eslint-disable-next-line no-undef
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [otp]);

  useEffect(() => {
    if (otp.length === 6) {
      setIsSubmmitting(true);
      verifyOTP({ email, otp, bookingID })
        .then((res) => {
          const { success, data, error } = res;
          if (success) {
            if (data.includes("https")) {
              // eslint-disable-next-line no-undef
              window.open(data, "_self");
            } else {
              // Payment with point

              navigate(`/booking/${bookingID}`);
            }

            setIsSubmmitting(false);
          } else {
            switch (error) {
              case "wrongotp":
                handleRenderNoti(t("COMMON.OTP_INCORRECT"), "error");
                break;
              case "expiredotp":
                resendOTP(email)
                  .then((data) => {
                    if (data.success) {
                      handleRenderNoti(
                        t("COMMON.OTP_EXPIRED_CHECK_EMAIL"),
                        "error"
                      );
                    } else {
                      handleRenderNoti(
                        t("COMMON.ERROR_TRY_AGAIN"),
                        "error"
                      );
                    }
                  })
                  .catch(() => {
                    handleRenderNoti(
                      t("COMMON.ERROR_TRY_AGAIN"),
                      "error"
                    );
                  });
                break;
              default:
                handleRenderNoti(
                  t("COMMON.ERROR_TRY_AGAIN"),
                  "error"
                );
                setIsVisible(false);
                clearSessionStorage(info_booking);
                clearSessionStorage(tax_include);
                clearSessionStorage(create_invoice);
                break;
            }
            setIsSubmmitting(false);
            setOtp("");
          }
        })
        .catch(() => {
          setIsSubmmitting(false);
          setOtp("");
          handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN"), "error");
        });
    }
  }, [otp]);

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
  }));

  return (
    <div
      className={`currencyMenu js-currencyMenu  ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg"></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size1">
        <div className="d-flex items-center justify-between px-30 pb-20 sm:px-15 border-bottom-light mt-20">
          <div className="text-20 fw-500 lh-15 w-100 text-center">
            <img src="/img/general/logo-okdimall.svg" alt="logo" width={100} />
            <p className="mt-10">{t("COMMON.ENTER_OTP")}</p>
          </div>
        </div>

        <div className="row justify-content-center mt-30 mb-60">
          {isSubmmitting ? (
            <div className="text-center">
              <span className="loader"></span>
              <span className="ml-10">{t("COMMON.PROCESSING_LOADING")}</span>
            </div>
          ) : (
            <>
              <p className="text-center text-blue-1 fst-italic text-decoration-underline text-18">
                {email}
              </p>
              <p className="text-center text-dark-1 mb-30">
                {t("COMMON.CHECK_EMAIL_FOR_OTP_OR_PROFILE")}
              </p>
            </>
          )}

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
            renderSeparator={<span className="renderSeparator">-</span>}
            renderInput={(props) => (
              <input
                className="input-otp"
                {...props}
                style={{
                  width: 45,
                  height: 45,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  textAlign: "center",
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(VerifyOTPModal);
