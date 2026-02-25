import React from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ open, title = "", children, onClose }: ModalProps) => {
  return (
    <div
      className={`currencyMenu js-currencyMenu pt-50 ${
        open ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={onClose}></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size4 max-h-600 px-20">
        {/* title's popup */}
        {title ? (
          <div className="row mx-20 mt-20 pb-10 border-bottom-light justify-content-between">
            <div className=" col-auto text-20 fw-500">{title}</div>
            <div className="col-auto">
              <button className="pointer" onClick={onClose}>
                <i className="icon-close" />
              </button>
            </div>
          </div>
        ) : (
          <div className=" text-end mt-10">
            <button className="pointer" onClick={onClose}>
              <i className="icon-close" />
            </button>
          </div>
        )}

        {/* content's popup */}

        <div className="h-fix-content max-h-500 overflow-y-scroll mt-5 pb-30">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
