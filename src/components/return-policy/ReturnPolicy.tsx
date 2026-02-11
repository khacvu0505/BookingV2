import React from "react";

const ReturnPolicy = ({
  paymentPolicy,
  cancelPolicy,
  isNeedApproval,
  timeNeedApproval,
}) => {
  return (
    <div>
      {" "}
      {paymentPolicy?.trim() && (
        <div>
          <svg width="16" height="16" fill="none" className="ml-10">
            <path
              d="M13.444 6.111H5.667c-.86 0-1.556.696-1.556 1.556v4.666c0 .86.697 1.556 1.556 1.556h7.777c.86 0 1.556-.697 1.556-1.556V7.667c0-.86-.697-1.556-1.556-1.556z"
              stroke="#4A5568"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M9.556 11.555a1.556 1.556 0 100-3.11 1.556 1.556 0 000 3.11zM11.889 6.111V4.556A1.556 1.556 0 0010.333 3H2.556A1.556 1.556 0 001 4.556v4.666a1.555 1.555 0 001.556 1.556H4.11"
              stroke="#4A5568"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="pl-10 text-truncate text-14">{paymentPolicy}</span>
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
              stroke="#008009"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="pl-10 text-truncate text-green-2 text-14">
            {cancelPolicy}
          </span>
        </div>
      )}
      <div>
        <svg
          width="16"
          height="16"
          fill="none"
          className="svgFillAll jss1309 ml-10"
        >
          <path
            d="M12.739 6.478L6.652 15l1.217-5.478H3L9.087 1 7.87 6.478h4.87z"
            stroke="#ffbc39"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span className="pl-10 text-truncate text-yellow-dark text-14">
          {isNeedApproval
            ? ` Xác nhận trong ${timeNeedApproval} phút`
            : "Xác nhận ngay"}
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
                  stroke="var(--color-yellow-dark)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9.167 10H10v3.333h.833"
                  stroke="var(--color-yellow-dark)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <span className="tooltiptext">
                Đặt phòng thường được khách sạn xác nhận trong vòng{" "}
                {timeNeedApproval} phút. Nếu yêu cầu đặt phòng của bạn không thể
                xác nhận, chúng tôi sẽ hoàn tiền đầy đủ.
              </span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default ReturnPolicy;
