import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import i18next from "i18next";

interface HandleAlertParams {
  type: SweetAlertIcon;
  title: string;
  html?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
}

export const handleAlert = ({
  type,
  title,
  html,
  confirmButtonText = i18next.t("COMMON.CLOSE"),
  confirmButtonColor = "var(--color-primary-500)",
}: HandleAlertParams): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    html,
    icon: type,
    confirmButtonText,
    confirmButtonColor,
    allowEscapeKey: false,
    allowEnterKey: true,
    allowOutsideClick: false,
    position: "top",
    customClass: {
      popup: "mt-60",
    },
  });
};
