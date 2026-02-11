import { t } from "i18next";
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email(() => t("COMMON.EMAIL_ERROR"))
    .required(() => t("COMMON.EMAIL_REQUIRED")),
  password: yup
    .string()
    .required(() => t("COMMON.PASSWORD_REQUIRED"))
    .min(6, () => t("COMMON.PASSWORD_AT_LEAST_6_CHARACTERS")),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
