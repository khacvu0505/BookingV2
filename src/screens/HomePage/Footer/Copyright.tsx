import { useTranslation } from "react-i18next";

const Copyright = () => {
  const { t } = useTranslation();

  return (
    <div className="row justify-between items-center y-gap-10 w-100">
      <div className="col-auto w-100">
        <div className="d-flex items-center flex-wrap text-15 xl:text-14 lg:text-13 md:text-12">
          ©2024 by
          <a
            href="https://okdimall.com"
            className="mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            OKdimall Travel Co., Ltd -
          </a>
          {t("COMMON.COPYRIGHT_INFO")}
        </div>
      </div>
    </div>
  );
};

export default Copyright;
