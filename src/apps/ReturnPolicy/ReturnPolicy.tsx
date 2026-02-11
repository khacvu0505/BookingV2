import classNames from "classnames";
import React from "react";
import NeedApproval from "./NeedApproval";

const ReturnPolicy = ({
  paymentPolicy,
  cancelPolicy,
  align = "vertical",
  isNeedApproval,
  timeNeedApproval,
  displayNeedApproval = true,
  isOutline,
}: { paymentPolicy: any; cancelPolicy: any; align?: string; isNeedApproval: any; timeNeedApproval: any; displayNeedApproval?: boolean; isOutline?: any }) => {
  return (
    <div
      className={classNames("", {
        "d-flex mb-16": align === "horizontal",
        "d-block": align === "vertical",
      })}
    >
      {" "}
      {paymentPolicy?.trim() && (
        <div>
          <svg width="16" height="16" fill="none" className="ml-10">
            <path
              d="M13.444 6.111H5.667c-.86 0-1.556.696-1.556 1.556v4.666c0 .86.697 1.556 1.556 1.556h7.777c.86 0 1.556-.697 1.556-1.556V7.667c0-.86-.697-1.556-1.556-1.556z"
              stroke="var(--color-action-success)"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M9.556 11.555a1.556 1.556 0 100-3.11 1.556 1.556 0 000 3.11zM11.889 6.111V4.556A1.556 1.556 0 0010.333 3H2.556A1.556 1.556 0 001 4.556v4.666a1.555 1.555 0 001.556 1.556H4.11"
              stroke="var(--color-action-success)"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="pl-10 text-truncate text-14 lg:text-13 text-action-success">
            {paymentPolicy}
          </span>
        </div>
      )}
      {cancelPolicy?.trim() && (
        <div>
          <svg
            width="16"
            height="16"
            fill="none"
            className="svgFillAll jss1301 ml-10"
          >
            <path
              d="M11.31 11.976l1.862 1.862M3.241 3.908l4.966 4.965M4.483 2.667L7.586 5.77 5.103 8.253 2 5.149M3.241 13.838l10.552-10.55a5.036 5.036 0 01-1.242 4.965c-2.194 2.194-3.724 2.482-3.724 2.482"
              stroke="var(--color-action-success)"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="pl-10 text-truncate text-action-success text-14 lg:text-13">
            {cancelPolicy}
          </span>
        </div>
      )}
      {displayNeedApproval && (
        <NeedApproval
          isNeedApproval={isNeedApproval}
          timeNeedApproval={timeNeedApproval}
          isOutline={isOutline}
        />
      )}
    </div>
  );
};

export default ReturnPolicy;
