import * as yup from "yup";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../utils";

/** SignUp */
export const signupSchema = yup.object({
  body: yup.object({
    username: yup.string().required(),
    fullname: yup.string().required(),
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .required(),
    email: yup.string().email().required(),
  }),
});

export type SignUpBody = yup.InferType<typeof signupSchema>["body"];

/** Login */
export const loginSchema = yup.object({
  body: yup.object({
    username: yup.string().required(),
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .required(),
  }),
});

export type LoginBody = yup.InferType<typeof loginSchema>["body"];

/** Update User */
export const updateUserSchema = yup.object({
  body: yup.object({
    username: yup.string(),
    photoURL: yup.string(),
    fullname: yup.string(),
  }),
});

export type UpdateUserBody = yup.InferType<typeof updateUserSchema>["body"];
