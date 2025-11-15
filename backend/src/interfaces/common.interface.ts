export enum Status {
  "success" = "success",
  "error" = "error",
}

export interface ResponseResult<T> {
  code: number;
  status: keyof typeof Status;
  message?: any | string;
  data?: T;
  accessToken?: string;
}
