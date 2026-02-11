import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

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
  confirmButtonText = "Đóng",
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
