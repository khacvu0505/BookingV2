import React, { forwardRef, useImperativeHandle, useState } from "react";

const DetailModal = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addonName, includes } = props;

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
  }));

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`currencyMenu js-currencyMenu pt-50 ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size1 h-600 px-20">
        <div className="row mx-20 mt-20 pb-10 border-bottom-light justify-content-between">
          <div className=" col-auto text-20 fw-500">
            Chi tiết dịch vụ mua thêm {addonName}
          </div>
          <div className="col-auto">
            <button className="pointer" onClick={handleCloseModal}>
              <i className="icon-close" />
            </button>
          </div>
        </div>

        {/* content's popup */}

        <div className="h-500 overflow-y-scroll mt-5">
          <ul className="text-15 pt-10">
            {includes?.length > 0 &&
              includes.map((item, index) => (
                <li className="d-flex items-center" key={index}>
                  <i className="icon-check text-10 mr-20 text-green-2" />
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(DetailModal);
