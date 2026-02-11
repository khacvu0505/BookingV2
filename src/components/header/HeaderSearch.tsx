import { useTranslation } from "react-i18next";

const HeaderSearch = () => {
  const { t } = useTranslation();
  return (
    <div className="single-field -w-400 relative d-flex items-center xl:d-none mr-20">
      <input
        className="pl-50 border-dark-2 text-dark-1 h-50 rounded-8"
        type="text"
        required
        placeholder={t("HOME/HEADER_SEARCH")}
      />
      <button type="submit" className="absolute d-flex items-center h-full">
        <i className="icon-search text-20 px-15 text-dark-1" />
      </button>
    </div>
  );
};

export default HeaderSearch;
