import * as yup from "yup";

/** get comment by comic */
export const getCommentByComicSchema = yup.object({
  params: yup.object({
    comicId: yup.number().required(),
  }),
});

export type GetCommentByComicParams = yup.InferType<
  Required<typeof getCommentByComicSchema>
>["params"];

/** create comment */
export const createCommentSchema = yup.object({
  params: yup.object({
    comicId: yup.number().required(),
  }),
  body: yup.object({
    text: yup.string().required(),
  }),
});

export type CreateCommentParams = yup.InferType<
  Required<typeof createCommentSchema>
>["params"];

export type CreateCommentBody = yup.InferType<
  Required<typeof createCommentSchema>
>["body"];

/** update comment */
export const updateCommentSchema = yup.object().shape({
  params: yup.object({
    commentId: yup.number().required(),
  }),
  body: yup.object().shape({
    text: yup.string().notRequired(),
  }),
});

export type UpdateCommentParams = yup.InferType<
  Required<typeof updateCommentSchema>
>["params"];

export type UpdateCommentBody = yup.InferType<
  Required<typeof updateCommentSchema>
>["body"];

/** delete comment */
export const deleteCommentSchema = yup.object().shape({
  params: yup.object({
    commentId: yup.number().required(),
  }),
});

export type DeleteCommentParams = yup.InferType<
  Required<typeof deleteCommentSchema>
>["params"];
