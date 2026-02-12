import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { sanitizeHtml } from "@/utils/sanitize";

const PromotionDetailModal = (props, ref) => {
  const { selected } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");

  useImperativeHandle(
    ref,
    () => ({
      isVisible,
      setIsVisible,
    }),
    [isVisible]
  );

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleClickGetCode = () => {
    setValue(selected.voucherCode);
    // eslint-disable-next-line no-undef
    navigator.clipboard.writeText(selected?.voucherCode);
  };

  if (!selected) return null;

  return (
    <div
      className={`overflow-auto currencyMenu js-currencyMenu  ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size1">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        <div className=" pb-20 sm:px-15 ">
          <div className="px-5 px-md-30">
            <div className="d-flex justify-content-center align-items-center flex-wrap flex-column ">
              <img src={selected.thumbnailURL} alt="promotion" />
              <div className=" ml-0 ml-md-30">
                <p className="text-dark text-left  text-md-center mt-20 fw-500">
                  {selected?.voucherName}
                </p>
                <p className="text-dark text-left text-md-center">
                  {selected?.description}
                </p>
              </div>
            </div>
            <div className="mt-30 w-75 w-md-50 mx-0 mx-md-auto">
              <p className="text-dark fw-500">Điều kiện áp dụng</p>
              <p
                className="text-dark"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(selected?.condition?.replaceAll("\n", "<br/>") || ""),
                }}
              />
            </div>

            <button
              className="w-25 mx-auto button py-10 px-2 -dark-1 bg-blue-1 text-white mt-20"
              onClick={handleClickGetCode}
            >
              {selected?.voucherCode === value ? "Đã sao chép" : "Lấy mã"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(PromotionDetailModal);
