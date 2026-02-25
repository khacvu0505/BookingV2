import { handleRenderNoti } from "@/utils/handleRenderNoti";
import React from "react";
import { useTranslation } from "react-i18next";

const NumberControl = ({
  handleIncrement,
  handleDecrement,
  count,
  setCount,
  allowZero = true,
  maxQuantity = 0,
}: { handleIncrement?: any; handleDecrement?: any; count: any; setCount: any; allowZero?: boolean; maxQuantity?: number }) => {
  const { t } = useTranslation();
  const incrementCount = (e) => {
    e.stopPropagation();
    const nextQuantity = count + 1;
    if (maxQuantity && nextQuantity > maxQuantity) {
      handleRenderNoti(t("COMMON.MAX_PEOPLE", { max: maxQuantity }), "warning");
      return;
    }
    setCount(nextQuantity);
    handleIncrement && handleIncrement();
  };

  const decrementCount = (e) => {
    e.stopPropagation();
    if (allowZero) {
      if (count === 0) return;
    } else {
      if (count === 1) return;
    }
    const nextQuantity = count - 1;
    setCount(nextQuantity);
    handleDecrement && handleDecrement();
  };

  return (
    <div className="d-flex items-center js-counter mt-20">
      <button
        className="button -outline-blue-1 text-blue-1 size-20 rounded-4 js-down"
        onClick={(e) => decrementCount(e)}
      >
        <i className="icon-minus text-12" />
      </button>
      <div className="flex-center size-20  ml-15 mr-15">
        <div className="text-15 lg:text-14 js-count">{count}</div>
      </div>
      <button
        className="button -outline-blue-1 text-blue-1 size-20 rounded-4 js-up"
        onClick={(e) => incrementCount(e)}
      >
        <i className="icon-plus text-12" />
      </button>
    </div>
  );
};

export default NumberControl;
