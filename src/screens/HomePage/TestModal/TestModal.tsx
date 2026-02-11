import React, { forwardRef, useImperativeHandle, useState } from "react";

const TestModal = (props, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleCloseModal = () => {
    setIsVisible(false);
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
            <p className="text-neutral-800 text-20 lg:text-18 md:text-16 text-center">
              Thông báo
            </p>
            <p className="text-neutral-800 text-14 text-center">
              Website đang hoạt động ở chế độ thử nghiệm, đang thực hiện đăng ký
              với Bộ Công Thương
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default forwardRef(TestModal);
