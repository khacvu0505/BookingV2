import React, { useState } from "react";
import classNames from "classnames";
import Button from "@/apps/Button";
import {
  formatCurrencyFromLanguage,
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/utils";
import { current_currency, current_language } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setChangeCurrency } from "@/features/app/appSlice";
import { useTranslation } from "react-i18next";

interface CurrencyItem {
  id: number;
  title: string;
  subTitle?: string;
  value: string;
}

interface LanguageItem {
  id: number;
  title: string;
  key?: string;
  value: string;
  image: string;
  currency: CurrencyItem[];
}

export const listLanguage: LanguageItem[] = [
  {
    id: 1,
    title: "Viet Nam",
    key: "vn",
    value: "vn",
    image: "https://flagicons.lipis.dev/flags/4x3/vn.svg",
    currency: [
      {
        id: 1,
        title: "VND (d)",
        subTitle: "Viet Nam Dong",
        value: "vn",
      },
      {
        id: 2,
        title: "USD ($)",
        subTitle: "Dollar",
        value: "gb",
      },
    ],
  },
  {
    id: 2,
    title: "South Korea",
    key: "kr",
    value: "kr",
    image: "https://flagicons.lipis.dev/flags/4x3/kr.svg",
    currency: [
      {
        id: 1,
        title: "KRW (Won)",
        subTitle: "Korea (South) Won",
        value: "kr",
      },
      {
        id: 2,
        title: "USD ($)",
        subTitle: "Dollar",
        value: "gb",
      },
    ],
  },
  {
    id: 3,
    title: "China",
    key: "cn",
    value: "cn",
    image: "https://flagicons.lipis.dev/flags/4x3/cn.svg",
    currency: [
      {
        id: 1,
        title: "CNY (Yuan)",
        subTitle: "China Yuan Renminbi",
        value: "cn",
      },
      {
        id: 2,
        title: "USD ($)",
        subTitle: "Dollar",
        value: "gb",
      },
    ],
  },
  {
    id: 4,
    title: "Global (English)",
    value: "gb",
    image: "/images/home/icon-globe.png",
    currency: [
      {
        id: 1,
        title: "EUR",
        subTitle: "Euro",
        value: "eur",
      },
      {
        id: 2,
        title: "USD ($)",
        subTitle: "Dollar",
        value: "gb",
      },
    ],
  },
];

export const defaultCurrency: CurrencyItem = {
  id: 1,
  title: "VND (d)",
  value: "vn",
};

interface LanguageContentProps {
  setShowPopover?: (show: boolean) => void;
  isOffcanvas?: boolean;
}

const LanguageContent = ({ setShowPopover, isOffcanvas = false }: LanguageContentProps) => {
  const dispatch = useDispatch();
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  const currentCurrency =
    (getFromLocalStorage(current_currency) as CurrencyItem | null) || defaultCurrency;
  const currentLanguage =
    (getFromLocalStorage(current_language) as LanguageItem | null) || listLanguage[0];

  const [selected, setSelected] = useState<LanguageItem>(currentLanguage);
  const [currency, setCurrency] = useState<CurrencyItem>(currentCurrency);

  const handleChange = () => {
    const item = listLanguage.find((item) => item.key === selected.key);
    if (!item) return;
    const itemCurrency = item.currency.find(
      (item) => item.value === currency.value
    );
    if (!itemCurrency) return;

    changeLanguage(item.value);

    setToLocalStorage(current_language, item);
    setToLocalStorage(current_currency, itemCurrency);

    dispatch(setChangeCurrency(formatCurrencyFromLanguage(itemCurrency.value)));
  };

  return (
    <div className="row g-0 px-16 flex-wrap">
      {/* Language Section */}
      <div
        className={classNames("py-12", {
          "col-6 border-end": !isOffcanvas,
          "col-12 border-bottom ": isOffcanvas,
        })}
      >
        <h6 className="text-16 fw-600 text-neutral-800 mb-12">
          {t("HOME.LANGUAGE")}
        </h6>
        <ul>
          {listLanguage.map((item) => (
            <li
              key={item.id}
              className="mb-10"
              onClick={() => {
                setSelected(item);
                setCurrency(item.currency[0]);
              }}
            >
              <div className="d-flex justify-content-between items-center">
                <div className="d-flex align-items-center pointer">
                  <img
                    src={item.image}
                    alt="flag-country"
                    width={24}
                    className="rounded-circle object-cover mr-4 border-light mr-10"
                    style={{ height: "24px" }}
                  />
                  <p className="text-14 fw-400 text-neutral-800">
                    {item.title}
                  </p>
                </div>
                <i
                  className={classNames(
                    "ri-check-line text-primary-500 text-20",
                    {
                      invisible: item.id !== selected.id,
                    }
                  )}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Currency Section */}
      <div
        className={classNames(
          "pt-12 d-flex flex-column justify-content-between",
          {
            "col-6": !isOffcanvas,
            "col-12": isOffcanvas,
          }
        )}
      >
        <div>
          <h6 className="text-16 fw-600 text-neutral-800 mb-12">
            {t("HOME.CURRENCY")}
          </h6>
          <ul>
            {selected.currency.map((item, idx) => (
              <li key={idx} onClick={() => setCurrency(item)}>
                <div className="d-flex items-center justify-content-between pointer mb-10">
                  <div className="d-flex items-center">
                    <p className="text-14 fw-500 text-neutral-800 mr-6">
                      {item.title}
                    </p>
                    <p className="text-14 fw-400 text-neutral-500">
                      {item?.subTitle}
                    </p>
                  </div>
                  <i
                    className={classNames(
                      "ri-check-line text-primary-500 text-20",
                      {
                        invisible: item.id !== currency.id,
                      }
                    )}
                  ></i>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex justify-content-end pb-16">
          <Button
            onClick={() => {
              handleChange();
              setShowPopover && setShowPopover(false);
              // eslint-disable-next-line no-undef
              window.location.reload();
            }}
            data-bs-dismiss={isOffcanvas ? "offcanvas" : ""}
          >
            Xong
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageContent;
