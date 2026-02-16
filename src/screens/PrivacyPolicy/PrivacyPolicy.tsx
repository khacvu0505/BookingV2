import MetaComponent from "@/components/MetaComponent";
import { useTranslation } from "react-i18next";
import { sanitizeHtml } from "@/utils/sanitize";
import "@/styles/legal-content.scss";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-60">
      <MetaComponent
        meta={{
          title: "Privacy Policy",
          description: "Privacy Policy Description",
        }}
      />
      <div className="container mt-120 mb-60">
        <h1 className="text-30 lg:text-28 md:text-26 text-neutral-800 text-center mb-30">
          {t("LEGAL.PRIVACY_POLICY_TITLE")}
        </h1>
        <div
          className="legal-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(t("LEGAL.PRIVACY_POLICY_CONTENT")),
          }}
        />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
