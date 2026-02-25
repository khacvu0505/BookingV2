import MetaComponent from "@/components/MetaComponent";
import { useTranslation } from "react-i18next";
import { sanitizeHtml } from "@/utils/sanitize";
import "@/styles/legal-content.scss";

const PrivacyPolicies = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-50">
      <MetaComponent
        meta={{
          title: "Operating Regulations",
          description: "OKdimall - Travel & Tour",
        }}
      />
      <section className="mt-100 md:mt-80">
        <div className="container">
          <h1 className="text-neutral-800 text-24 lg:text-20 font-bold mb-4">
            {t("LEGAL.PRIVACY_POLICIES_TITLE")}
          </h1>
          <div
            className="legal-content"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(t("LEGAL.PRIVACY_POLICIES_CONTENT")),
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicies;
