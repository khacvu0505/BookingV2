import { t } from "i18next";
import * as yup from "yup";

export const signUpSchema = yup.object({
  firstName: yup
    .string()
    .required(() => t("AUTH.SIGNUP/ENTER_NAME"))
    .min(2, () => t("AUTH.SIGNUP/NAME_TOO_SHORT"))
    .max(50, () => t("AUTH.SIGNUP/NAME_TOO_LONG"))
    .matches(/^[a-zA-Z]+$/, () => t("AUTH.SIGNUP/NAME_ONLY_LETTER")),
  // lastName: yup
  //   .string()
  //   .required("Last name is required")
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .matches(/^[a-zA-Z]+$/, "Last name must contain only letters"),
  email: yup
    .string()
    .required(() => t("COMMON.EMAIL_REQUIRED"))
    .email(() => t("COMMON.EMAIL_ERROR")),
  password: yup
    .string()
    .required(() => t("COMMON.PASSWORD_REQUIRED"))
    .min(6, () => t("COMMON.PASSWORD_AT_LEAST_6_CHARACTERS")),
  confirmPassword: yup
    .string()
    .required(() => t("AUTH.SIGNUP/RE_ENTER_PASSWORD"))
    .oneOf([yup.ref("password"), null], () =>
      t("AUTH.SIGNUP/PASSWORD_NOT_MATCH")
    ),
});

export type SignUpFormData = yup.InferType<typeof signUpSchema>;
