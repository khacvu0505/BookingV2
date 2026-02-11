export const paymentInfo = [
  {
    id: 1,
    title: "Thẻ/tài khoản ngân hàng (ATM nội địa/quốc tế)",
    img: [
      "/img/payments/techcombank.svg",
      "/img/payments/vietcombank.svg",
      "/img/payments/vietinbank.svg",
      "/img/payments/msb.svg",
    ],
    isAuthorization: false,
    code: "DOMESTIC",
  },
  {
    id: 2,
    title: "Thẻ tín dụng/ghi nợ quốc tế (Visa/Master/JCB)",
    img: [
      "/img/payments/visa.svg",
      "/img/payments/mc.svg",
      "/img/payments/UnionPay.svg",
      "/img/payments/american-express.svg",
    ],
    isAuthorization: false,
    code: "INTERNATIONAL",
  },
  {
    id: 3,
    title: "Thanh toán bằng mã QR",
    img: [
      "/img/payments/qr-code.svg",
      "/img/payments/ACB.svg",
      "/img/payments/TPBank.svg",
      "/img/payments/VPBank.svg",
    ],
    isAuthorization: false,
    code: "QR",
  },
  {
    id: 4,
    title: "Thanh toán bằng ví điện tử",
    img: ["/img/payments/MoMo.svg"],
    isAuthorization: false,
    code: "MOMO",
  },
  {
    id: 5,
    title: "Điểm thành viên",
    img: [],
    isAuthorization: true,
    code: "POINT",
  },
];
