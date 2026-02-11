import { sendOTP } from "@/api/booking.api";
import Button from "@/apps/Button";
import {
  booking_id,
  create_invoice,
  info_booking,
  tax_include,
} from "@/utils/constants";
import { clearSessionStorage } from "@/utils/utils";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const BookingOverviewTour = ({ email, refOTPModal }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleClickContinue = async () => {
    setIsSubmitting(true);
    const res = await sendOTP(email);
    const { success } = res;

    if (success) {
      refOTPModal.current.setIsVisible(true);
      setIsVisible(false);
      clearSessionStorage(info_booking);
      clearSessionStorage(booking_id);
      clearSessionStorage(tax_include);
      clearSessionStorage(create_invoice);
    }
    setIsSubmitting(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      isVisible,
      setIsVisible,
    }),
    [isVisible]
  );
  return (
    <div
      className={`currencyMenu js-currencyMenu  ${
        isVisible ? "" : "is-hidden"
      }`}
      style={{ paddingTop: 20 }}
    >
      <div className="currencyMenu__bg"></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size4 p-2">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>

        <>
          <div>
            <p className="text-16 fw-700 text-neutral-800 text-center">
              Tất cả thông tin đặt chỗ của bạn đều đã chính xác?
            </p>
            <p className="text-14 fw-400 text-neutral-500 text-center">
              Bạn sẽ không thể thay đổi thông tin đặt chỗ sau khi tiến hành{" "}
              <br />
              thanh toán.Bạn có muốn tiếp tục?
            </p>
          </div>
          <div className="d-flex justify-content-center py-24">
            {/* <button
              className="mainSearch__submit button py-20 px-40 col-12 rounded-4  text-dark mb-2"
              style={{
                backgroundColor: "#f4f4f4",
              }}
              onClick={handleCloseModal}
            >
              Kiểm tra lại
            </button> */}
            <Button onClick={handleCloseModal} isOutline className="mr-24">
              Kiểm tra lại
            </Button>
            <Button onClick={handleClickContinue}>
              {isSubmitting ? (
                <>
                  <span className="loader"></span>
                  <span className="ml-10">Đang xử lý...</span>
                </>
              ) : (
                <span>Tiếp tục</span>
              )}
            </Button>
            {/* <button
                className="button -dark-1 py-20 px-40 col-12 rounded-4 bg-blue-1 text-white"
                onClick={handleClickContinue}
              >
                {isSubmitting ? (
                  <>
                    <span className="loader"></span>
                    <span className="ml-10">Đang xử lý...</span>
                  </>
                ) : (
                  <span>Tiếp tục</span>
                )}
              </button> */}
          </div>
        </>
      </div>
    </div>
  );
};

export default forwardRef(BookingOverviewTour);
