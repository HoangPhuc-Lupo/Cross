import * as yup from "yup";

/** search comics */
export const searchComicSchema = yup.object({
  params: yup.object({
    query: yup.string().required(),
  }),
});

export type SearchComicParams = yup.InferType<
  Required<typeof searchComicSchema>
>["params"];

/** create comic */
export const createComicSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    poster: yup.string().required(),
    status: yup.mixed().oneOf(["process", "end"]).required(),
    genre: yup.number().required(),
  }),
});

export type CreateComicBody = yup.InferType<
  Required<typeof createComicSchema>
>["body"];

/** update comic */
export const updateComicSchema = yup.object().shape({
  params: yup.object({
    id: yup.string().required(),
  }),
  body: yup.object().shape({
    title: yup.string().notRequired(),
    description: yup.string().notRequired(),
    poster: yup.string().notRequired(),
    status: yup.mixed().oneOf(["process", "end"]).notRequired(),
    genre: yup.number().notRequired(),
  }),
});

export type UpdateComicBody = yup.InferType<
  Required<typeof updateComicSchema>
>["body"];

export type UpdateComicParams = yup.InferType<
  Required<typeof updateComicSchema>
>["params"];

/** delete comic */
export const deleteComicSchema = yup.object().shape({
  params: yup.object({
    id: yup.string().required(),
  }),
});

export type DeleteComicParams = yup.InferType<
  Required<typeof deleteComicSchema>
>["params"];

export const getComicsChartSchema = yup.object({
  query: yup.object({
    filter: yup.mixed().oneOf(["day", "month", "week"]).required(),
  }),
});

export type GetComicsChartQuery = yup.InferType<
  typeof getComicsChartSchema
>["query"];

export const getComicsSchema = yup.object({
  query: yup.object({
    sort: yup.mixed().oneOf(["desc", "asc"]).notRequired(),
    search: yup.string().notRequired(),
  }),
});

export type GetComicsQuery = yup.InferType<typeof getComicsSchema>["query"];
