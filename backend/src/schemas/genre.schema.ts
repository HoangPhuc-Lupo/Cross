import * as yup from "yup";

/** create genre */
export const createGenreSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
  }),
});

export type CreateGenreBody = yup.InferType<
  Required<typeof createGenreSchema>
>["body"];

/** update genre */
export const updateGenreSchema = yup.object().shape({
  params: yup.object({
    genreId: yup.number().required(),
  }),
  body: yup.object().shape({
    title: yup.string().notRequired(),
  }),
});

export type UpdateGenreBody = yup.InferType<
  Required<typeof updateGenreSchema>
>["body"];

export type UpdateGenreParams = yup.InferType<
  Required<typeof updateGenreSchema>
>["params"];

/** delete genre */
export const deleteGenreSchema = yup.object().shape({
  params: yup.object({
    genreId: yup.number().required(),
  }),
});

export type DeleteGenreParams = yup.InferType<
  Required<typeof deleteGenreSchema>
>["params"];
