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
import { useMutation } from "@tanstack/react-query";

const VerifyOTPModal = ({ email, bookingID }, ref) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const verifyOTPMutation = useMutation({
    mutationFn: (otpValue: string) =>
      verifyOTP({ email, otp: otpValue, bookingID }),
    onSuccess: (res) => {
      const { success, data, error } = res;
      if (success) {
        if (data.includes("https")) {
          // eslint-disable-next-line no-undef
          window.open(data, "_self");
        } else {
          navigate(`/booking/${bookingID}`);
        }
      } else {
        switch (error) {
          case "wrongotp":
            handleRenderNoti("Mã OTP không chính xác", "error");
            break;
          case "expiredotp":
            resendOTP(email)
              .then((data) => {
                if (data.success) {
                  handleRenderNoti(
                    "Mã OTP đã hết hạn. Kiểm tra lại email của bạn ",
                    "error"
                  );
                } else {
                  handleRenderNoti(
                    "Có lỗi xảy ra. Vui lòng thử lại sau",
                    "error"
                  );
                }
              })
              .catch(() => {
                handleRenderNoti(
                  "Có lỗi xảy ra. Vui lòng thử lại sau",
                  "error"
                );
              });
            break;
          default:
            handleRenderNoti(
              "Có lỗi xảy ra. Vui lòng thử lại sau",
              "error"
            );
            setIsVisible(false);
            clearSessionStorage(info_booking);
            clearSessionStorage(tax_include);
            clearSessionStorage(create_invoice);
            break;
        }
        setOtp("");
      }
    },
    onError: () => {
      setOtp("");
      handleRenderNoti("Vui lòng thử lại sau", "error");
    },
  });

  const handleUnload = (event) => {
    if (otp.length === 6) {
      // eslint-disable-next-line no-undef
      window.removeEventListener("beforeunload", handleUnload);
    } else {
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
      verifyOTPMutation.mutate(otp);
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
            <p className="mt-10">Nhập mã xác thực OTP</p>
          </div>
        </div>

        <div className="row justify-content-center mt-30 mb-60">
          {verifyOTPMutation.isPending ? (
            <div className="text-center">
              <span className="loader"></span>
              <span className="ml-10">Đang xử lý...</span>
            </div>
          ) : (
            <>
              <p className="text-center text-blue-1 fst-italic text-decoration-underline text-18">
                {email}
              </p>
              <p className="text-center text-dark-1 mb-30">
                Vui lòng kiểm tra email để lấy mã xác thực <br /> (Hoặc bạn cũng
                có thể xác thực mã OTP trong profile)
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
