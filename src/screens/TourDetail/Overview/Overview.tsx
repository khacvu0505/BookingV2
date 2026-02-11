import { useTranslation } from "react-i18next";

const Overview = ({ content }) => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-32 xl:text-26 lg:text-24 lg:text-center fw-700 pb-24 xl:pb-20 lg:pb-15">
        {t("COMMON.OVERVIEW")}
      </h3>
      <div className="text-16 xl:text-15 lg:text-14">{content}</div>
    </>
  );
};

export default Overview;
