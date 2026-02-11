import * as yup from "yup";

export const ratingSchema = yup.object({
  title: yup.string().required("Thong tin bat buoc"),
  comment: yup.string().notRequired(),
});

export type RatingFormData = yup.InferType<typeof ratingSchema>;
