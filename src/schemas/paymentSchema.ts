import isEmpty from "lodash/isEmpty";
import * as yup from "yup";

export const paymentSchema = yup.object({
  firstName: yup
    .string()
    .required("Thong tin bat buoc")
    .matches(
      /^[^\d!@#$%^&*()_+={[}\]|\\:;"'<,>.?/~`]+$/i,
      "Khong duoc chua ky tu dac biet hoac so"
    ),
  lastName: yup
    .string()
    .required("Thong tin bat buoc")
    .matches(
      /^[^\d!@#$%^&*()_+={[}\]|\\:;"'<,>.?/~`]+$/i,
      "Khong duoc chua ky tu dac biet hoac so"
    ),
  email: yup
    .string()
    .required("Vui long nhap email")
    .email("Email khong hop le"),
  mobileNo: yup.string().matches(/^\d{9,10}$/, "So dien thoai khong hop le"),
  customerName: yup.string().test({
    name: "customerName",
    message: "Ten khach hang khong hop le",
    test: function (value) {
      const { isVisitedCustomer } = this.parent;
      if (!isVisitedCustomer) {
        return true;
      }
      if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value ?? "") || (value ?? "").trim() === "") {
        return false;
      }
      return true;
    },
  }),
  customerMobileNo: yup.string().test({
    name: "customerMobileNo",
    message: "So dien thoai khong hop le",
    test: function (value) {
      const { isVisitedCustomer } = this.parent;
      if (!isVisitedCustomer) {
        return true;
      }
      if (/^0\d{9}$/.test(value ?? "")) {
        return true;
      }
      return false;
    },
  }),
  mobileCode: yup
    .mixed()
    .test("is-valid", "Vui long chon quoc gia", function (value) {
      if (typeof value === "string" || typeof value === "object") {
        return isEmpty(value) ? false : true;
      }
      return false;
    })
    .required("Vui long chon quoc gia"),
  countryFID: yup
    .mixed()
    .test("is-valid", "Vui long chon quoc gia", function (value) {
      if (typeof value === "string" || typeof value === "object") {
        return isEmpty(value) ? false : true;
      }
      return false;
    })
    .required("Vui long chon quoc gia"),
  companyName: yup.string().test({
    name: "companyName",
    message: "Ten cong ty khong hop le",
    test: function (value) {
      const { isInvoice } = this.parent;
      if (!isInvoice) {
        return true;
      }
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value ?? "") || (value ?? "").trim() === "") {
        return false;
      }
      return true;
    },
  }),
  taxCode: yup.string().test({
    name: "taxCode",
    message: "Ma so thue khong hop le",
    test: function (value) {
      const { isInvoice } = this.parent;
      if (!isInvoice) {
        return true;
      }
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value ?? "") || (value ?? "").trim() === "") {
        return false;
      }
      return true;
    },
  }),
  emailReceiveInvoice: yup.string().test({
    name: "emailReceiveInvoice",
    message: "Email nhan hoa don khong hop le",
    test: function (value) {
      const { isInvoice } = this.parent;
      if (!isInvoice) {
        return true;
      }
      if (!value || value.trim() === "" || !value.includes("@")) {
        return false;
      }
      return true;
    },
  }),
  companyAddress: yup.string().test({
    name: "companyAddress",
    message: "Dia chi cong ty khong hop le",
    test: function (value) {
      const { isInvoice } = this.parent;
      if (!isInvoice) {
        return true;
      }
      if (!value || value.trim() === "") {
        return false;
      }
      return true;
    },
  }),
  smokingRoom: yup.string().default("0"),
});

export type PaymentFormData = yup.InferType<typeof paymentSchema>;
