import * as yup from "yup";

/** rating */
export const ratingSchema = yup.object({
  params: yup.object({
    comicId: yup.number().required(),
  }),
  body: yup.object({
    rating: yup.number().required(),
  }),
});

export type RatingParams = yup.InferType<
  Required<typeof ratingSchema>
>["params"];

export type RatingBody = yup.InferType<Required<typeof ratingSchema>>["body"];

/** delete rating */
export const deleteRatingSchema = yup.object().shape({
  params: yup.object({
    ratingId: yup.number().required(),
  }),
});

export type DeleteRatingParams = yup.InferType<
  Required<typeof deleteRatingSchema>
>["params"];

/** get user rating by comic */

export const getUserRatingByComic = yup.object().shape({
  params: yup.object({
    comicId: yup.number().required(),
  }),
});

export type GetUserRatingByComicParams = yup.InferType<
  Required<typeof getUserRatingByComic>
>["params"];
