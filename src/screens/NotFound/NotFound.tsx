import NotFound from "@/components/common/NotFound";

import MetaComponent from "@/components/common/MetaComponent";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const metadata = {
    title: `404 || ${t("COMMON.META_DESCRIPTION")}`,
    description: `OKdimall - ${t("COMMON.META_DESCRIPTION")}`,
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
