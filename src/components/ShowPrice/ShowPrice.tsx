import React from "react";
import { formatCurrency } from "@/utils/utils";
import "./ShowPrice.style.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface ShowBestPriceProps {
  price: number;
  unit?: string;
  currentCurrency?: string;
}

const ShowBestPrice = ({ price, unit, currentCurrency = "đ" }: ShowBestPriceProps) => {
  const { t } = useTranslation();
  return (
    price > 0 && (
      <div className="listed_price">
        <div className="d-flex items-center">
          <img
            src="/images/HotelList/icon-best-price.png"
            alt="okdimall hotel list"
          />
          <p className="text-15 lg:text-14 fw-400 text-primary-500 mr-10 italic">
            {t("HOTELS.ROOM/BEST_PRICE")}
          </p>
        </div>

        <p
          // className={classNames("listed_price-text", {
          //   highlight: true,
          // })}
          className="text-20 lg:text-18 md:text-16 fw-500 text-primary-500"
        >
          {formatCurrency(price)} {currentCurrency}
        </p>
        {unit && <span className="text-12 text-danger"> / {unit}</span>}
      </div>
    )
  );
};

interface ShowPromotionPriceProps {
  price: number;
  currentCurrency?: string;
}

const ShowPromotionPrice = ({ price, currentCurrency = "đ" }: ShowPromotionPriceProps) => {
  return (
    price > 0 && (
      <p className="text-16 fw-400 text-action-secondary text-end">
        {formatCurrency(price)} {currentCurrency}
      </p>
    )
  );
};

interface ShowDraftPriceProps {
  price: number;
  currentCurrency?: string;
}

const ShowDraftPrice = ({ price, currentCurrency = "đ" }: ShowDraftPriceProps) => {
  return (
    price > 0 && (
      <div className="text-end">
        <p className="text-16 lg:text-15 fw-400 draft_price text-end">
          {formatCurrency(price)} {currentCurrency}
        </p>
      </div>
    )
  );
};

interface ShowMemberPriceProps {
  price: number;
  currentCurrency?: string;
}

const ShowMemberPrice = ({ price, currentCurrency = "đ" }: ShowMemberPriceProps) => {
  return (
    price > 0 && (
      <div className="d-flex items-center mt-16">
        <p className="italic fw-400 text-14">Giá thành viên</p>
        <p className="text-16 lg:text-15 fw-500 text-action-link">
          {formatCurrency(price)} {currentCurrency}
        </p>
      </div>
    )
  );
};

export interface ShowPriceProps {
  listedPrice?: number;
  finalPrice?: number;
  promotionPrice?: number;
  memberPrice?: number;
  discountPrice?: number;
  unit?: string;
  isSpecialPrice?: boolean;
  [key: string]: any;
}

const ShowPrice = ({
  listedPrice = 0,
  finalPrice = 0,
  promotionPrice = 0,
  memberPrice = 0,
  discountPrice = 0,
  unit = "",
  // promotion,
  isSpecialPrice = false,
}: ShowPriceProps) => {
  const { currentCurrency } = useSelector((state) => state.app);

  return isSpecialPrice ? (
    <div className="show_price">
      <ShowDraftPrice price={listedPrice} currentCurrency={currentCurrency} />
      <ShowBestPrice price={finalPrice} currentCurrency={currentCurrency} />
    </div>
  ) : (
    <div className="show_price">
      {finalPrice === listedPrice && listedPrice > 0 && (
        <ShowBestPrice
          unit={unit}
          price={finalPrice}
          currentCurrency={currentCurrency}
        />
      )}
      {finalPrice === promotionPrice && promotionPrice > 0 && (
        <>
          <ShowDraftPrice
            price={listedPrice}
            currentCurrency={currentCurrency}
          />
          <ShowBestPrice
            unit={unit}
            price={finalPrice}
            currentCurrency={currentCurrency}
          />
        </>
      )}

      {finalPrice === discountPrice && discountPrice > 0 && (
        <>
          <ShowDraftPrice
            price={listedPrice}
            currentCurrency={currentCurrency}
          />
          <ShowPromotionPrice
            price={promotionPrice}
            currentCurrency={currentCurrency}
          />
          <ShowBestPrice
            price={finalPrice}
            unit={unit}
            currentCurrency={currentCurrency}
          />
        </>
      )}

      <ShowMemberPrice price={memberPrice} currentCurrency={currentCurrency} />
    </div>
  );
};

export default ShowPrice;
