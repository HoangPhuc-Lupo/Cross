import * as yup from "yup";

/** create chapter */
export const createChapterSchema = yup.object({
  params: yup.object({
    comicId: yup.number().required(),
  }),
  body: yup.object({
    title: yup.string().required(),
    image: yup.string().required(),
  }),
});

export type CreateChapterBody = yup.InferType<
  Required<typeof createChapterSchema>
>["body"];

export type CreateChapterParams = yup.InferType<
  Required<typeof createChapterSchema>
>["params"];

/** update chapter */
export const updateChapterSchema = yup.object().shape({
  params: yup.object({
    chapterId: yup.string().required(),
  }),
  body: yup.object().shape({
    title: yup.string().notRequired(),
    image: yup.string().notRequired(),
  }),
});

export type UpdateChapterBody = yup.InferType<
  Required<typeof updateChapterSchema>
>["body"];

export type UpdateChapterParams = yup.InferType<
  Required<typeof updateChapterSchema>
>["params"];

/** delete chapter */
export const deleteChapterSchema = yup.object().shape({
  params: yup.object({
    chapterId: yup.string().required(),
  }),
});

export type DeleteChapterParams = yup.InferType<
  Required<typeof deleteChapterSchema>
>["params"];

/** get chapter by comic */
export const getChaptersByComicSchema = yup.object().shape({
  params: yup.object({
    comicId: yup.string().required(),
  }),
});

export type GetChaptersByComicParams = yup.InferType<
  Required<typeof getChaptersByComicSchema>
>["params"];
