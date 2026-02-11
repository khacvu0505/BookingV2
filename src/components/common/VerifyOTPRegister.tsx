import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { verifyRegisterOTP } from "@/api/auth.api";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { STEPS } from "../authen/AuthenModal";

const VerifyOTPRegister = ({ email, setStep }) => {
  const [otp, setOtp] = useState("");
  const [isSubmmitting, setIsSubmmitting] = useState(false);

  useEffect(() => {
    if (otp.length === 6) {
      setIsSubmmitting(true);
      verifyRegisterOTP({ email, otp })
        .then((res) => {
          const { success } = res;
          if (success) {
            setIsSubmmitting(false);
            setStep(STEPS.SIGNUP);
          } else {
            // switch (error) {
            //   case "wrongotp":
            //     handleRenderNoti("Mã OTP không chính xác", "error");
            //     break;
            //   case "expiredotp":
            //     resendOTP(email)
            //       .then((data) => {
            //         if (data.success) {
            //           handleRenderNoti(
            //             "Mã OTP đã hết hạn. Kiểm tra lại email của bạn ",
            //             "error"
            //           );
            //         } else {
            //           handleRenderNoti(
            //             "Có lỗi xảy ra. Vui lòng thử lại sau",
            //             "error"
            //           );
            //         }
            //       })
            //       .catch(() => {
            //         handleRenderNoti(
            //           "Có lỗi xảy ra. Vui lòng thử lại sau",
            //           "error"
            //         );
            //       });
            //     break;
            //   default:
            //     handleRenderNoti(
            //       "Có lỗi xảy ra. Vui lòng thử lại sau",
            //       "error"
            //     );
            //     setIsVisible(false);
            //     clearSessiionStorage(info_booking);
            //     break;
            // }
            setIsSubmmitting(false);
            setOtp("");
            handleRenderNoti("Mã OTP không chính xác", "error");
          }
        })
        .catch(() => {
          setIsSubmmitting(false);
          setOtp("");
          handleRenderNoti("Vui lòng thử lại sau", "error");
        });
    }
  }, [otp]);

  return (
    <div>
      <div className="d-flex items-center justify-between px-30 pb-20 sm:px-15 border-bottom-light mt-20">
        <div className="text-20 fw-500 lh-15 w-100 text-center">
          <img src="/img/general/logo-okdimall.svg" alt="logo" width={100} />
          <p className="mt-10">Nhập mã xác thực OTP</p>
        </div>
      </div>

      <div className="row justify-content-center mt-30 mb-60">
        {isSubmmitting ? (
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
              Vui lòng kiểm tra email để lấy mã xác thực
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
  );
};

export default VerifyOTPRegister;
