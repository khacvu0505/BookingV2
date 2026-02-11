import { useTranslation } from "react-i18next";
import type { PaymentInfo } from "@/types";

export const usePaymentInfo = (): PaymentInfo[] => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      title: t("HOTEL_BOOKING.ATM"),
      img: [
        "/img/payments/techcombank.png",
        "/img/payments/msb.png",
        "/img/payments/vietinbank.png",
        "/img/payments/vietcombank.png",
      ],
      isAuthorization: false,
      code: "DOMESTIC",
    },
    {
      id: 2,
      title: t("HOTEL_BOOKING.CREDIT_CARD"),
      img: ["/img/payments/visa.png", "/img/payments/mc.png"],
      isAuthorization: false,
      code: "INTERNATIONAL",
    },
    {
      id: 3,
      title: t("HOTEL_BOOKING.QR_CODE"),
      img: [
        "/img/payments/qr-code.png",
        "/img/payments/ACB.png",
        "/img/payments/TPBank.png",
        "/img/payments/VPBank.png",
      ],
      isAuthorization: false,
      code: "QR",
    },
    {
      id: 4,
      title: t("HOTEL_BOOKING.E_WALLET"),
      img: ["/img/payments/momo.png"],
      isAuthorization: false,
      code: "MOMO",
    },
    // {
    //   id: 5,
    //   title: t("HOTEL_BOOKING.POINT_MEMBER"),
    //   img: ["/img/payments/point.png"],
    //   isAuthorization: true,
    //   code: "POINT",
    // },
  ];
};
