import classNames from "classnames";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

const NeedApproval = ({
  timeNeedApproval,
  isNeedApproval,
  isOutline = false,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className={classNames("", {
          " bg-action-success-light px-4 rounded-4": !isOutline,
        })}
        style={{ width: "fit-content" }}
      >
        {!isOutline && (
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.667 8.87062L5.04908 2.43729C4.6626 2.06159 4.04474 2.07033 3.66904 2.4568C3.65541 2.47083 3.6422 2.48527 3.62943 2.50009C3.24845 2.94233 3.27459 3.60395 3.68928 4.01475L7.03066 7.32474"
              stroke="#00B507"
              strokeLinecap="round"
            />
            <path
              d="M7.03064 7.32487L3.39276 3.71773C2.9615 3.29012 2.27369 3.26672 1.81437 3.66404C1.39217 4.02924 1.34597 4.66756 1.71118 5.08976C1.72503 5.10577 1.73938 5.12134 1.7542 5.13645L5.41875 8.87074"
              stroke="#00B507"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.41869 8.8709L3.33358 6.83301C2.9128 6.40309 2.22463 6.39114 1.78918 6.80619C1.35839 7.2168 1.34204 7.89889 1.75265 8.32968C1.75454 8.33167 1.75644 8.33364 1.75834 8.33561C4.83486 11.5144 6.43159 13.0158 7.03058 13.5175C8.00025 14.3296 9.91193 14.6663 10.9104 13.9997C11.9089 13.333 12.8114 12.3845 13.2397 11.4426C13.4947 10.8818 13.99 9.15284 14.7255 6.25562C14.8753 5.66586 14.5186 5.06638 13.9288 4.91664C13.9211 4.9147 13.9135 4.91284 13.9058 4.91107C13.2947 4.76981 12.6813 5.13685 12.5169 5.7421L11.6669 8.8709"
              stroke="#00B507"
              strokeLinecap="round"
            />
            <path
              d="M10.5723 4.22162C10.335 3.86715 10.0637 3.53733 9.76321 3.2368C9.46268 2.93627 9.13286 2.66503 8.77839 2.42773C8.60202 2.30966 8.41955 2.2 8.23155 2.0993C8.04465 1.9992 7.85229 1.90797 7.65503 1.82617"
              stroke="#00B507"
              strokeLinecap="round"
            />
            <path
              d="M1.73165 11.2579C1.95007 11.6243 2.20367 11.9679 2.48807 12.2837C2.77246 12.5996 3.08763 12.8877 3.42919 13.1432C3.59914 13.2703 3.77562 13.3894 3.95809 13.4998C4.1395 13.6096 4.32682 13.7107 4.51953 13.8027"
              stroke="#00B507"
              strokeLinecap="round"
            />
          </svg>
        )}

        {isOutline && (
          <svg
            width="16"
            height="16"
            fill="none"
            className="svgFillAll jss1309 ml-10"
          >
            <path
              d="M12.739 6.478L6.652 15l1.217-5.478H3L9.087 1 7.87 6.478h4.87z"
              stroke="var(--color-action-success)"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}

        <span className="pl-10  text-truncate text-action-success text-14 lg:text-13 md:text-12">
          {isNeedApproval
            ? ` ${t("COMMON.CONFIRM_DURING")} ${timeNeedApproval} ${t(
                "COMMON.MINUTES"
              )}`
            : `${t("COMMON.CONFIRM_NOW")}`}
        </span>

        {isNeedApproval && (
          <div className="tooltip">
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              className="svgFillAll jss1361 ml-5"
            >
              <path
                d="M10 17.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM10 6.667h.008"
                stroke="var(--color-action-success)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9.167 10H10v3.333h.833"
                stroke="var(--color-action-success)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            <span className="tooltiptext">
              <Trans
                i18nKey="COMMON.NEED_APPROVAL_WITH_VALUE"
                values={{
                  time: timeNeedApproval,
                }}
              />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default NeedApproval;
