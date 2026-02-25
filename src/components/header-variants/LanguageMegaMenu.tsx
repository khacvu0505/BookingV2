import { setChangeCurrency } from "@/features/app/appSlice";
import { current_language, LANGUAGES } from "@/utils/constants";
import {
  formatCurrencyFromLanguage,
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/utils";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const languageContent = [
  {
    id: 1,
    language: "Tiếng Việt",
    country: "Việt Nam",
    code: LANGUAGES[0],
  },
  {
    id: 2,
    language: "English",
    country: "United States",
    code: LANGUAGES[1],
  },
];

const LanguageMegaMenu = ({ textClass }) => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const handleCurrency = () => setClick((prevState) => !prevState);

  const currentLanguage = getFromLocalStorage(current_language) || language;

  const defaultLanguageContent = useMemo(() => {
    return languageContent.find((item) => item.code === currentLanguage);
  }, [currentLanguage]);

  const [selectedCurrency, setSelectedCurrency] = useState(
    defaultLanguageContent
  );

  const handleItemClick = (item) => {
    changeLanguage(item.code);
    dispatch(setChangeCurrency(formatCurrencyFromLanguage(item.code)));
    setToLocalStorage(current_language, item.code);
    setSelectedCurrency(item);
    setClick(false);
  };

  return (
    <>
      {/* Start language currency Selector */}
      <div className="col-auto">
        <button
          className={`d-flex items-center text-14 ${textClass}`}
          onClick={handleCurrency}
        >
          <img
            src={`https://flagicons.lipis.dev/flags/4x3/${selectedCurrency.code}.svg`}
            alt="image"
            // className="rounded-full"
          />

          {/* <span className="js-language-mainTitle">
            {" "}
            {selectedCurrency.country}
          </span> */}
          <i className="icon-chevron-sm-down text-7 ml-10" />
        </button>
      </div>
      {/* End language currency Selector */}

      <div className={`langMenu js-langMenu ${click ? "" : "is-hidden"}`}>
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div className="langMenu__content bg-white rounded-4">
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">{t("COMMON.CHOOSE_LANGUAGE")}</div>
            {/* End title */}
            <button className="pointer" onClick={handleCurrency}>
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* Emd flex-wrapper */}
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {languageContent.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  selectedCurrency.country === item.country ? "active" : ""
                }`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-500 text-dark-1">
                    {item.language}
                  </div>
                  <div className="text-14 lh-15 mt-5 js-title">
                    {item.country}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* End langMenu */}
      </div>
    </>
  );
};

export default LanguageMegaMenu;
