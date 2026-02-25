import { forwardRef, useImperativeHandle, useState } from "react";

const WechatModal = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      setIsVisible,
    }),
    []
  );

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`currencyMenu js-currencyMenu ${isVisible ? "" : "is-hidden"}`}
    >
      <div className="currencyMenu__bg  " onClick={handleCloseModal}></div>
      <div
        className="currencyMenu__content rounded-4 modal-custom-size3 h-600 px-10 pt-10"
        style={{ background: "#FBEAC9" }}
      >
        <div className="w-100 text-right">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>

        <div
          className="h-500 overflow-y-hidden mt-5 text-center"
          style={{ background: "#FBEAC9" }}
        >
          <img
            src="/img/social-network/wechat-QR.jpg"
            alt="wechat-qr"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(WechatModal);
