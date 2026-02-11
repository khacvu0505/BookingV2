import * as yup from "yup";

export const profileFormSchema = yup.object({
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
  mobileNo: yup.string().required("Thong tin bat buoc"),
});

export type ProfileFormData = yup.InferType<typeof profileFormSchema>;
