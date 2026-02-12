import React from "react";
import { useTranslation } from "react-i18next";

const InputSearch = ({
  searchValue,
  handleChangeInputSearch,
  handleClickInputSearch,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <input
      autoComplete="off"
      type="search"
      placeholder={t("HOME.WHERE_WANT_TO_GO")}
      className="js-search js-dd-focus text-18 xl:text-16 lg:text-14  text-neutral-800 fw-700"
      value={searchValue}
      onChange={handleChangeInputSearch}
      onClick={handleClickInputSearch}
      readOnly={disabled}
    />
  );
};

export default InputSearch;
