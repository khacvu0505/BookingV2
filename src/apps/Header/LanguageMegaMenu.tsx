import {
  BREAKPOINT_XXL,
  current_currency,
  current_language,
} from "@/utils/constants";
import { getFromLocalStorage } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageMegaMenu.style.scss";
import LanguageContent, {
  defaultCurrency,
  listLanguage,
} from "./LanguageContent";
import useWindowSize from "@/utils/useWindowSize";
import OffCanvasLanguageCurrency from "./OffCanvasLanguageCurrency";

interface LanguageCurrencyPopoverProps {
  textClass?: string;
}

const LanguageCurrencyPopover = ({ textClass }: LanguageCurrencyPopoverProps) => {
  const isDesktop = useWindowSize().width > BREAKPOINT_XXL;
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  const currentCurrency =
    (getFromLocalStorage(current_currency) as any) || defaultCurrency;

  const currentLanguage =
    (getFromLocalStorage(current_language) as any) || listLanguage[0];

  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== "popoverButton"
      ) {
        setShowPopover(false);
      }
    };

    // eslint-disable-next-line no-undef
    document.addEventListener("click", handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    changeLanguage(currentLanguage?.value);
  }, []);

  const attributesActive = isDesktop
    ? {}
    : {
        "data-bs-toggle": "offcanvas",
        "aria-controls": "offcanvas-language-currency",
        "data-bs-target": "#offcanvas-language-currency",
      };

  return (
    <div className="position-relative">
      <button
        className={`d-flex items-center text-14  ${textClass}`}
        onClick={(e) => {
          e.stopPropagation();
          setShowPopover(!showPopover);
        }}
        {...attributesActive}
      >
        <img
          src={`https://flagicons.lipis.dev/flags/4x3/${
            currentLanguage?.value || "vn"
          }.svg`}
          alt="flag-country"
          width={24}
          className="rounded-circle object-cover mr-4 border-light"
          style={{ height: "24px" }}
        />
        {`${currentLanguage.value.toUpperCase()} | ${currentCurrency?.title} `}
        <i className="ri-arrow-down-s-line text-16 text-primary-500 ml-8" />
      </button>

      {showPopover && isDesktop && (
        <div
          ref={popoverRef}
          className="popover popover-custom absolute left--170p top-40 mt-2 bg-white border rounded"
        >
          <LanguageContent setShowPopover={setShowPopover} />
        </div>
      )}

      {!isDesktop && <OffCanvasLanguageCurrency />}
    </div>
  );
};

export default LanguageCurrencyPopover;
