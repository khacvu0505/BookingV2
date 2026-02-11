import * as yup from "yup";

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Khong duoc de trong"),
  newPassword: yup
    .string()
    .required("Khong duoc de trong")
    .test({
      name: "newPassword",
      message: "Mat khau phai co it nhat 6 ky tu",
      test: (value) => {
        return (value ?? "").length >= 6;
      },
    }),
  confirmNewPassword: yup
    .string()
    .required("Khong duoc de trong")
    .test({
      name: "confirmNewPassword",
      message: "Khong khop",
      test: (value, context) => {
        return value === context.parent.newPassword;
      },
    }),
});

export type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;
