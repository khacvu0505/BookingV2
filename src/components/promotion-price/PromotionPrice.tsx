import React from "react";
import "./PromotionPrice.style.scss";
import { formatCurrency } from "@/utils/utils";
import classNames from "classnames";
import { useSelector } from "react-redux";

const PromotionPrice = ({ promotion, memberPrice = 0, isTour = false }) => {
  const { currentCurrency } = useSelector((state) => state.app);
  return (
    <>
      {promotion?.discountPrice > 0 && (
        <div
          className={classNames({
            "promotion-price": Boolean(!isTour),
          })}
        >
          {Boolean(!isTour) && (
            <div className="d-flex items-center justify-content-end flex-wrap">
              <p className="text-dark mr-5">Nhập mã: </p>
              <p className="fw-600 text-info mr-5">{promotion?.voucherCode}</p>
              <p className="promotion-price-tag">{`-${promotion?.voucherPercent} %`}</p>
            </div>
          )}
          <p className="text-20 text-danger fw-500">
            {formatCurrency(promotion?.discountPrice)} {currentCurrency}
          </p>
        </div>
      )}
      {memberPrice > 0 && (
        <p className="text-dark text-14">
          Giá thành viên: {formatCurrency(memberPrice)} {currentCurrency}
        </p>
      )}
    </>
  );
};

export default PromotionPrice;
