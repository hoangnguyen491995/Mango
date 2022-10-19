import { AxiosError } from "axios";

export type ErrorResponse = {
  headers: any;
  message: string;
  status: number;
};

export function catchAxiosError(err: AxiosError) {
  const error = {
    headers: null,
    message:
      "Something happened in setting up the request that triggered an Error",
    status: null,
  } as unknown as ErrorResponse;

  if (err && err.response) {
    error.headers = err.response.headers;
    error.message = err.message;
    error.status = err.response.status;
    console.error(error);
  } else if (err && err.request) {
    error.headers = err.request.headers;
    error.message = "The request was made, but no response was received";
    console.error(err.request);
  }

  return { error };
}
