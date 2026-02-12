import React from "react";
import { useTranslation } from "react-i18next";
import { sanitizeHtml } from "@/utils/sanitize";

const Policy = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-20">
      <p className="text-neutral-800 fw-700 text-18 lg:text-17 md:text-16 mb-16">
        {t("COMMON.POLICY")}
      </p>
      <div
        className="d-flex align-items-center"
        style={{
          minHeight: "80px",
          backgroundColor: "#00B5070D",
        }}
      >
        <p
          className="d-sm-block"
          style={{
            backgroundColor: "#00B507",
            height: "100%",
            width: "8px",
            marginRight: "10px",
            minHeight: "80px",
          }}
        ></p>
        <div>
          <p className="text-action-success fw-600 texxt-16 lg:text-15 md:text-14">
            {item?.cancelPolicyName}
          </p>

          <div
            className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(item?.cancelPolicyDetail?.replaceAll("\n", "<br/>") || ""),
            }}
          />
        </div>
      </div>
      <div
        className="d-flex align-items-center"
        style={{
          minHeight: "80px",
          backgroundColor: "#F525490D",
        }}
      >
        <p
          className="d-sm-block"
          style={{
            backgroundColor: "#F52549",
            height: "100%",
            width: "8px",
            marginRight: "10px",
            minHeight: "80px",
          }}
        ></p>
        <div>
          <p className="text-primary-500 fw-600 text-16 lg:text-15 md:text-14">
            {item?.refundPolicyName}
          </p>
          <div
            className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-800"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(item?.refundPolicyDetail?.replaceAll("\n", "<br/>") || ""),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Policy;
