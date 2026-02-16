import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function MetaComponent({ meta }) {
  const { t } = useTranslation();
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${meta?.title} - OKdimall - ${t("COMMON.SLOGAN")}`}</title>
        <meta name="description" content={meta?.description} />
      </Helmet>
    </HelmetProvider>
  );
}
